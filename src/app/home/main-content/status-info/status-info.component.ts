import { Component, OnInit } from "@angular/core";
import { DeviceService } from "@shared/services/device.service";
import { DeviceConfig } from "electron/types/device-config";
import { ElectronService } from "@core/services";

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
  devices: DeviceConfig[] = [];

  isLoading = true;

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceService.devices.subscribe((devices) => {
      console.log('device subscription:', devices);
      this.devices = devices;
      this.isLoading = false;
    });
  }
}
