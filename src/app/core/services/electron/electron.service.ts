import { Injectable } from "@angular/core";
import * as childProcess from "child_process";
// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, remote, webFrame } from "electron";
import * as fs from "fs";
import { ColorChangeConfig } from "../types/color-change-config";

@Injectable({
  providedIn: "root",
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;

  /**
   * Determine wheter the app is running as electron app or just locally in the browser.
   *
   * @readonly
   * @type {boolean}
   * @memberof ElectronService
   */
  get isElectron(): boolean {
    return !!window?.process?.type;
  }

  /**
   * Creates an instance of ElectronService.
   * @memberof ElectronService
   */
  constructor() {
    if (!this.isElectron) {
      return;
    }

    // Conditional imports
    this.ipcRenderer = window.require("electron").ipcRenderer;
    this.webFrame = window.require("electron").webFrame;
    this.remote = window.require("electron").remote;

    this.childProcess = window.require("child_process").exec;
    this.fs = window.require("fs");
  }

  /**
   * Creates and sends an event to change the color and mode of the cooler.
   *
   * @param {ColorChangeConfig} config the configuration object.
   * @memberof ElectronService
   */
  changeColor(config: ColorChangeConfig) {
    this.ipcRenderer.send("config:setColor", config);
  }
}
