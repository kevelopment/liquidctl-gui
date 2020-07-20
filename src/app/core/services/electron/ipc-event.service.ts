const { exec } = require("child_process");
import { Injectable } from "@angular/core";
import { ipcMain } from "electron";
import { ColorChangeConfig } from "../types/color-change-config";

@Injectable({
  providedIn: "root",
})
export class IpcEventService {
  /**
   * A reference to the ipcMain object of electron.
   *
   * @type {typeof ipcMain}
   * @memberof IpcEventService
   */
  ipcMain: typeof ipcMain;

  /**
   * A reference to the exec object required to execute tasks via processes
   *
   * @type {typeof exec}
   * @memberof IpcEventService
   */
  exec: typeof exec;

  /**
   * Creates an instance of IpcEventService.
   * @memberof IpcEventService
   */
  constructor() {
    this.ipcMain = window.require("electron").ipcMain;
    this.exec = window.require("child_process").exec;

    ipcMain.on("config:setColor", this.setColor);
  }

  /**
   * Handles the setting of color
   *
   * @param {Event} e the ipc event.
   * @param {ColorChangeConfig} config the config provided by the event.
   * @memberof IpcEventService
   */
  public setColor(e: Event, config: ColorChangeConfig) {
    if (!config.mode || !config.color) {
      throw "mode and color must not be null!";
    }

    const color = config.color.slice(1);

    // execute the command
    this.exec(
      `sudo liquidctl set sync color ${config.mode.key} ${color}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
        }
      }
    );
  }
}
