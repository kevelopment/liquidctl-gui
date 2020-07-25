import { IpcMain, IpcMainEvent } from "electron";
import { ColorChangeConfig } from "../types/color-change-config";

// @Injectable({
//   providedIn: "root",
// })
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
  exec: Function;

  /**
   * Creates an instance of IpcEventService.
   * @param {IpcMain} ipcMain
   * @param {Function} exec
   * @memberof IpcEventService
   */
  constructor(ipcMain: IpcMain, exec: Function) {
    this.ipcMain = ipcMain;
    this.exec = exec;
  }

  public initialize(): void {
    this.ipcMain.on("config:setColor", this.setColor);
  }

  /**
   * Handles the setting of color
   *
   * @param {IpcMainEvent} e the event triggered by the ipcRenderer.
   * @param {ColorChangeConfig} config the config provided by the event.
   * @memberof IpcEventService
   */
  public setColor(e: IpcMainEvent, config: ColorChangeConfig): void {
    if (!config.mode || !config.textColor || !config.circleColor) {
      throw "mode and color must not be empty!";
    }

    // set sync by default
    let colorOptions = `sync color ${config.textColor.slice(1)}`;
    if (config.textColor !== config.circleColor) {
      const newTextColor = config.textColor.slice(1);
      const newCircleColor = config.circleColor.slice(1);
      colorOptions = `ring color ${config.mode.key} ${newCircleColor} logo color ${config.mode.key} ${newTextColor}`;
    }

    console.log(colorOptions);
    // execute the command
    this.exec(`sudo liquidctl set ${colorOptions}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`childProcess error: ${error}`);
      }
    });
  }
}
