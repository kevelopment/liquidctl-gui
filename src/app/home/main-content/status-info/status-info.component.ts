import { Component, OnInit } from "@angular/core";
import { DeviceService } from "@shared/services/device.service";
import { DeviceConfig } from "electron/types/device-config";

@Component({
  selector: "app-status-info",
  templateUrl: "./status-info.component.html",
  styleUrls: ["./status-info.component.scss"],
})
export class StatusInfoComponent implements OnInit {
  /**
   * The list of all available devices.
   *
   * @type {DeviceConfig[]}
   * @memberof StatusInfoComponent
   */
  devices: DeviceConfig[];

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.devices = this.deviceService.getAll();
  }
}
