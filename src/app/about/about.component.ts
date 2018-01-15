import { Component, OnInit } from '@angular/core';
import {WpService} from "../wp.service";
import {DefaultContent} from "../shared/index";
import {Pages} from "../shared/constants";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  pageContent:AboutContent = new AboutContent();
  pageSections:Object[] = []

  constructor(private wpService: WpService) {}

  ngOnInit() {
    this.wpService.getPageBySlug(Pages.ABOUT).subscribe((page:any) => {
      this.pageContent = page.acf;
      this.pageContent.title = page.title;
      this.pageSections = [{
        title: this.pageContent.activities_title,
        text: this.pageContent.activities_text,
        icon: 'fa-cubes'
      }, {
        title: this.pageContent.conditions_title,
        text: this.pageContent.conditions_text,
        icon: 'fa-handshake-o'
      }, {
        title: this.pageContent.license_title,
        text: this.pageContent.license_text,
        icon: 'fa-briefcase'
      }]
    })
  }

}

class AboutContent extends DefaultContent {
  activities_title: string;
  activities_text: string;
  conditions_title: string;
  conditions_text: string;
  license_title: string;
  license_text: string;
}
