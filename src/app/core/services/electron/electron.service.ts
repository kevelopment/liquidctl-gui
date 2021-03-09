import { Injectable } from "@angular/core";
import { DeviceService } from "@shared/services/device.service";
import * as childProcess from "child_process";
// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcMain, ipcRenderer, remote, webFrame } from "electron";
import { LiquidCtlEvents } from "electron/constants/events";
import { DeviceConfig } from "electron/types/device-config";
import * as fs from "fs";
import { ColorChangeConfig } from "../../../../electron/types/color-change-config";

@Injectable({
  providedIn: "root",
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  exec: any;
  childProcess: typeof childProcess;
  fs: typeof fs;
  ipcMain: typeof ipcMain;
  /**
   * Determine wheter the app is running as electron app or just locally in the browser.
   *
   * @readonly
   * @type {boolean}
   * @memberof ElectronService
   */
  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  /**
   * Creates an instance of ElectronService.
   * @memberof ElectronService
   */
  constructor(private deviceService: DeviceService) {
    if (!this.isElectron) {
      return;
    }

    // Conditional imports
    this.ipcRenderer = window.require("electron").ipcRenderer;
    this.ipcMain = window.require("electron").ipcMain;
    this.webFrame = window.require("electron").webFrame;
    this.remote = window.require("electron").remote;

    this.childProcess = window.require("child_process").exec;
    this.exec = window.require("child_process").exec;
    this.fs = window.require("fs");
  }

  /**
   * Creates and sends an event to change the color and mode of the cooler.
   *
   * @param {ColorChangeConfig} config the configuration object.
   * @memberof ElectronService
   */
  changeColor(config: ColorChangeConfig): void {
    this.ipcRenderer.send(LiquidCtlEvents.SET_COLOR, config);
  }

  saveColor(config: ColorChangeConfig): void {
    this.ipcRenderer.send(LiquidCtlEvents.SAVE_COLOR, config);
  }

  /**
   * Fetches the list of all available devices.
   *
   * @memberof ElectronService
   */
  getDeviceList(): DeviceConfig[] {
    const devices = this.ipcRenderer.sendSync(LiquidCtlEvents.GET_LIST);
    this.deviceService.setAll(devices);
    console.log(devices);
    return devices;
  }

  getStatus(): void {
    // const status = this.ipcRenderer.sendSync(LiquidCtlEvents.GET_STATUS);
    const status = this.ipcRenderer.sendSync(LiquidCtlEvents.GET_STATUS);
    console.log(status);
  }

  /**
   * Initializes the liquidctl.
   *
   * @memberof ElectronService
   */
  initialize(): void {
    // const response = this.ipcRenderer.sendSync(LiquidCtlEvents.INITIALIZE_ALL);
    // console.log("initialize:", response);
    this.getDeviceList();
  }
}
