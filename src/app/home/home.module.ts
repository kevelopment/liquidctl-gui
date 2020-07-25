import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "../shared/shared.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { ChangeColorModeComponent } from "./main-content/change-color-mode/change-color-mode.component";
import { ColorPreviewComponent } from "./main-content/color-preview/color-preview.component";
import { StatusInfoComponent } from "./main-content/status-info/status-info.component";

@NgModule({
  declarations: [
    HomeComponent,
    ChangeColorModeComponent,
    StatusInfoComponent,
    ColorPreviewComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    FormsModule,
    HomeRoutingModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class HomeModule {}
