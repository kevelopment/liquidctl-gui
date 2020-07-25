import { Component, OnInit } from "@angular/core";
import { MatSelectChange } from "@angular/material/select";
import { ElectronService } from "app/core/services";
import { ModeEntry, Modes } from "electron/constants/modes";

@Component({
  selector: "app-change-color-mode",
  templateUrl: "./change-color-mode.component.html",
  styleUrls: ["./change-color-mode.component.scss"],
})
export class ChangeColorModeComponent implements OnInit {
  circleColor = "#000000";
  textColor = "#000000";

  availableModes: ModeEntry[];
  selectedMode = Modes.FIXED;

  constructor(private electronService: ElectronService) {}

  ngOnInit(): void {
    this.availableModes = Modes.values();
    this.circleColor = "#000000";
    this.textColor = "#000000";
    this.selectedMode = Modes.FIXED;
  }

  submitColorChange(): void {
    if (!this.circleColor) {
      this.circleColor = this.textColor;
    }
    if (!this.textColor) {
      this.textColor = this.circleColor;
    }
    // send request to change the color
    this.electronService.changeColor({
      circleColor: this.circleColor,
      textColor: this.textColor,
      mode: Modes.FIXED,
    });
  }

  onModeChange(event: MatSelectChange): void {
    this.selectedMode = Modes.getByKey(event.value);
  }
}
