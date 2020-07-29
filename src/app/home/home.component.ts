import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

interface Link {
  name: string;
  path: string;
}
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  sites = [
    { name: "Color", path: "colors" },
    { name: "Infos", path: "infos" },
  ];

  activeSite = this.sites[0].path;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.navigateToActiveSite();
  }

  onNavTabClick(newSite: string): void {
    this.activeSite = newSite;
    this.navigateToActiveSite();
  }

  navigateToActiveSite(): void {
    this.router.navigate([this.activeSite], { relativeTo: this.route });
  }
}
