import * as ChildProcess from "child_process";
import { IpcMain, IpcMainEvent } from "electron";
import { LiquidCtlEvents } from "../constants/events";
import { ColorChangeConfig } from "../types/color-change-config";
import { DeviceConfig } from "../types/device-config";

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

  /**
   * Creates an instance of IpcEventService.
   * @param {IpcMain} ipcMain
   * @param {ChildProcess} childProcess
   * @memberof IpcEventService
   */
  constructor(ipcMain: IpcMain, childProcess: typeof ChildProcess) {
    this.ipcMain = ipcMain;
    this.childProcess = childProcess;
  }

  public initialize(): void {
    this.ipcMain.on(LiquidCtlEvents.SET_COLOR, (e, config) =>
      this.setColor(e, config)
    );
    this.ipcMain.on(LiquidCtlEvents.GET_STATUS, (e) => this.getStatus(e));
    this.ipcMain.on(LiquidCtlEvents.GET_LIST, (e) => this.getList(e));
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

    // TODO: create sth. like a command factory
    const commands: string[] = [];
    // set sync by default
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

    // execute the command(s)
    const execCommands = commands.join("; ");
    console.log(execCommands);
    this.childProcess.exec(execCommands, (error, stdoud, stderr) => {
      console.log("error: ", error);
      console.log("stdout: ", stdoud);
      console.log("stderr: ", stderr);
    });
  }

  /**
   * Fetches the coolers current status.
   *
   * @param {IpcMainEvent} event the event.
   * @memberof IpcEventService
   */
  getStatus(event: IpcMainEvent): void {
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

    const lines = stdout.split(/[^\r\n]+/g);
    const deviceConfig = lines.map((line) => {
      const [deviceId, name] = line.split(":");
      return {
        id: parseInt(deviceId[deviceId.length].trim()),
        name: name.trim(),
      } as DeviceConfig;
    });
    event.returnValue = deviceConfig;
  }
}
