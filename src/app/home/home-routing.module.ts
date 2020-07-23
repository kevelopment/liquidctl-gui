import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { ChangeColorModeComponent } from "./main-content/change-color-mode/change-color-mode.component";
import { StatusInfoComponent } from "./main-content/status-info/status-info.component";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    children: [
      {
        path: "colors",
        component: ChangeColorModeComponent,
      },
      {
        path: "infos",
        component: StatusInfoComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
