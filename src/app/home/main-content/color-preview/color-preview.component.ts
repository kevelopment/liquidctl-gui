import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "color-preview",
  templateUrl: "./color-preview.component.html",
  styleUrls: ["./color-preview.component.scss"],
})
export class ColorPreviewComponent implements OnInit {
  @Input()
  circleColor: string;

  @Input()
  textColor: string;

  constructor() {}

  ngOnInit(): void {}
}
