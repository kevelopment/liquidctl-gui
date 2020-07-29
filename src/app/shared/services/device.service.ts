import { Injectable } from "@angular/core";
import { DeviceConfig } from "electron/types/device-config";
import { Observable, Observer, of, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DeviceService {
  private deviceData: Map<number, string>;
  private _devices: BehaviorSubject<DeviceConfig[]>;
  public readonly devices: Observable<DeviceConfig[]>;

  constructor() {
    this.deviceData = new Map();
    this._devices = new BehaviorSubject<DeviceConfig[]>(this.getAll());
    this.devices = this._devices.asObservable();
  }

  public get(id: number): string {
    return this.deviceData.get(id);
  }

  public getAll(): DeviceConfig[] {
    return this.asList(this.deviceData);
  }

  public asList(deviceData: Map<number, string>): DeviceConfig[] {
    return Array.from(deviceData.entries()).map(([id, name]) => {
      return { id, name } as DeviceConfig;
    });
  }

  public setAll(data: DeviceConfig[]): void {
    data.forEach((elem) => {
      this.set(elem.id, elem.name);
    });
  }

  public set(id: number, name: string): void {
    this.deviceData.set(id, name);
    this._devices.next(this.getAll());
  }
}
