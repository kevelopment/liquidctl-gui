import { IpcMain, IpcMainEvent } from "electron";
import { ColorChangeConfig } from "../types/color-change-config";
import { exec as Exec } from "child_process";
import { LiquidCtlEvents } from "../constants/events";

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
  exec: typeof Exec;

  /**
   * Creates an instance of IpcEventService.
   * @param {IpcMain} ipcMain
   * @param {ChildProcess} exec
   * @memberof IpcEventService
   */
  constructor(ipcMain: IpcMain, exec: any) {
    this.ipcMain = ipcMain;
    this.exec = exec;
  }

  public initialize(): void {
    this.ipcMain.on(LiquidCtlEvents.SET_COLOR, (e, config) => this.setColor(e, config));
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
      commands.push(`liquidctl set logo color ${config.mode.key} ${config.textColor.slice(1)}`);
      commands.push(`liquidctl set ring color ${config.mode.key} ${config.circleColor.slice(1)}`);
    }
    else {
      commands.push(`liquidctl set sync color ${config.mode.key} ${config.textColor.slice(1)}`);
    }
    
    // execute the command(s)
    const execCommands = commands.join('; ');
    console.log(execCommands);
    this.exec(execCommands, (error, stdoud, stderr) => {
      console.log('error: ', error);
      console.log('stdout: ', stdoud);
      console.log('stderr: ', stderr);
    });
  }
}
