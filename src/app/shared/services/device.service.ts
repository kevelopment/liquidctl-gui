import { Injectable } from "@angular/core";
import { DeviceConfig } from "electron/types/device-config";

@Injectable({
  providedIn: "root",
})
export class DeviceService {
  private devices: Map<number, string>;

  constructor() {
    this.devices = new Map();
  }

  public setAll(...data: DeviceConfig[]): void {
    data.forEach((elem) => {
      this.set(elem.id, elem.name);
    });
  }

  public getAll(): DeviceConfig[] {
    return Object.keys(this.devices).map((key) => {
      const id = parseInt(key);
      return { id, name: this.devices.get(id) } as DeviceConfig;
    });
  }

  public set(id: number, name: string): void {
    this.devices.set(id, name);
  }

  public get(id: number): string {
    return this.devices.get(id);
  }
}
