import { Component, OnInit } from '@angular/core';
import { ElectronService } from '@core/services';

@Component({
  selector: 'app-status-info',
  templateUrl: './status-info.component.html',
  styleUrls: ['./status-info.component.scss']
})
export class StatusInfoComponent implements OnInit {

  constructor(private electronService: ElectronService) { }

  ngOnInit(): void {
    this.electronService.changeColor
  }

}
