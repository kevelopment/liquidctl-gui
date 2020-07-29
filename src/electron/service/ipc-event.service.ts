import * as ChildProcess from "child_process";
import { IpcMain, IpcMainEvent } from "electron";
import { LiquidCtlEvents } from "../constants/events";
import { ColorChangeConfig } from "../types/color-change-config";
import { DeviceConfig } from "../types/device-config";
import * as sudo from "sudo-prompt";
import * as fs from "fs";
import * as path from "path";

export class IpcEventService {
  /**
   * A reference to the ipcMain object of electron.
   *
   * @type {IpcMain}
   * @memberof IpcEventService
   */
  ipcMain: IpcMain;

  /**
   * A reference to the exec object required to execute tasks via processes
   *
   * @type {ChildProcess}
   * @memberof IpcEventService
   */
  childProcess: typeof ChildProcess;

  sudoOptions: any;

  /**
   * Creates an instance of IpcEventService.
   * @param {IpcMain} ipcMain
   * @param {ChildProcess} childProcess
   * @memberof IpcEventService
   */
  constructor(ipcMain: IpcMain, childProcess: typeof ChildProcess) {
    this.ipcMain = ipcMain;
    this.childProcess = childProcess;
    this.sudoOptions = {
      name: "LiquidCtl UI",
    };
  }

  public initialize(): void {
    this.ipcMain.on(LiquidCtlEvents.SET_COLOR, (e, config) =>
      this.setColor(e, config)
    );
    this.ipcMain.on(LiquidCtlEvents.SAVE_COLOR, (e, config) => {
      this.saveColor(e, config);
    });
    this.ipcMain.on(LiquidCtlEvents.GET_STATUS, (e) => this.getStatus(e));
    this.ipcMain.on(LiquidCtlEvents.GET_LIST, (e) => this.getList(e));
  }

  /**
   * Saves given color configuration for autostart.
   *
   * @param e
   * @param config
   */
  saveColor(e: IpcMainEvent, config: any) {
    console.log("creating the shell script @ usr/Libary");
    const liquidCfgLocation = "/usr/local/share/LiquidCfg.sh";
    const liquidCfgTemplateLocation = path.join(
      __dirname,
      "../template-files/liquidcfg.sh"
    );
    const launchdLocation = "/Library/LaunchDaemons/liquidctl.plist";
    const launchdTemplateLocation = path.join(__dirname, "../template-files/liquidctl.plist");

    console.log("replacing the template file content");
    this.replaceTemplateContent(liquidCfgTemplateLocation, config);

    // if this is run for the first time
    // if (!fs.existsSync(liquidCfgLocation)) {
    
    // 1. Create settings file at /usr/local/share/LiquidCfg.sh
    console.log(
      `copying the file from ${liquidCfgTemplateLocation} to ${liquidCfgLocation}`
    );
    fs.copyFileSync(liquidCfgTemplateLocation, liquidCfgLocation);
    
    // 2. Make Settings file executable and editable.
    console.log(`executing chmod 777 on ${liquidCfgLocation}`);
    this.childProcess.execSync(`chmod 777 ${liquidCfgLocation}`);
    
    // 3. Create startup file at /Library/LaunchDaemons.
    console.log(`creating the launchd config @ ${launchdLocation}`);
    sudo.exec(`cp ${launchdTemplateLocation} ${launchdLocation}`, this.sudoOptions, function(e, s, a) {
      if (e) throw e;
      console.log("stdout: ", a);
    });

    // fs.copyFileSync(
    //   path.join(__dirname, "../template-files/liquidctl.plist"),
    //   launchdLocation
    // );
    // 4. Add to system startup.
    console.log(`adding ${launchdLocation} to startup`);
    this.childProcess.execSync(`launchctl load ${launchdLocation}`);
    
    
    console.log('added to startup.. should work now?');
    // } else {
    // console.log("the file already exists!");
    // otherwise we can simply overwrite the existing config file
    // fs.copyFileSync(liquidCfgTemplateLocation, liquidCfgLocation);
    // }
  }

  replaceTemplateContent(liquidCfgTemplateLocation: string, config: any): void {
    const data = fs.readFileSync(liquidCfgTemplateLocation).toString();
    const newData = data.replace(
      "{{ config }}",
      this.createCommandsFromConfig(config).join("\n\r")
    );

    console.log("new data: ", newData);

    fs.writeFileSync(liquidCfgTemplateLocation, newData);
  }

  /**
   * Handles the setting of color
   *
   * @param {IpcMainEvent} e the event triggered by the ipcRenderer.
   * @param {ColorChangeConfig} config the config provided by the event.
   * @memberof IpcEventService
   */
  setColor(e: IpcMainEvent, config: ColorChangeConfig): void {
    if (!config.mode || !config.textColor || !config.circleColor) {
      throw "mode and color must not be empty!";
    }

    const commands = this.createCommandsFromConfig(config);

    // execute the command(s)
    console.log(commands);
    this.childProcess.exec(commands.join(";"), (error, stdoud, stderr) => {
      console.log("error: ", error);
      console.log("stdout: ", stdoud);
      console.log("stderr: ", stderr);
    });
  }

  private createCommandsFromConfig(config: ColorChangeConfig): string[] {
    const commands = [];
    if (config.textColor !== config.circleColor) {
      commands.push(
        `liquidctl set logo color ${config.mode.key} ${config.textColor.slice(
          1
        )}`
      );
      commands.push(
        `liquidctl set ring color ${config.mode.key} ${config.circleColor.slice(
          1
        )}`
      );
    } else {
      commands.push(
        `liquidctl set sync color ${config.mode.key} ${config.textColor.slice(
          1
        )}`
      );
    }
    return commands;
  }

  /**
   * Fetches the coolers current status.
   *
   * @param {IpcMainEvent} event the event.
   * @memberof IpcEventService
   */
  getStatus(event: IpcMainEvent): void {
    console.log("getting status: ", event);
    const stdout = this.childProcess.execSync(`liquidctl status`);
    event.returnValue = stdout;
  }

  /**
   * Initializes all devices.
   *
   * @param {IpcMainEvent} event
   * @memberof IpcEventService
   */
  initializeAll(event: IpcMainEvent): void {
    console.log("initializing all: ", event);

    const stdout = this.childProcess.execSync("liquidctl initialize all");
    event.returnValue = stdout;
  }

  /**
   * Gets the list of available devices.
   * Response:
   * Device ID 0: NZXT Smart Device (V1)
   * Device ID 1: NZXT Kraken X (X42, X52, X62 or X72)
   *
   * @param {IpcMainEvent} event
   * @memberof IpcEventService
   */
  getList(event: IpcMainEvent): void {
    const stdout = this.childProcess.execSync("liquidctl list").toString();

    // parse the response into actual devices
    const lines = stdout.match(/[^\r\n]+/g);
    const devices = lines.map((line) => {
      const [deviceId, deviceName] = line.split(":");
      const id = deviceId.charAt(deviceId.length - 1).trim();
      return {
        id: parseInt(id),
        name: deviceName.trim(),
      } as DeviceConfig;
    });

    event.returnValue = devices;
  }
}
