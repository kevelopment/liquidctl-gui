import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-change-color-mode",
  templateUrl: "./change-color-mode.component.html",
  styleUrls: ["./change-color-mode.component.scss"],
})
export class ChangeColorModeComponent implements OnInit {
  circleColor: string;
  textColor: string;

  constructor() {}

  ngOnInit(): void {}
}
