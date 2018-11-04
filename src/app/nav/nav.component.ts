import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { AppService } from '../app.service';
import { Utils } from '../shared'
import { WpService} from '../wp.service';
import {HomePageContent} from '../home/home.component';
import {Pages} from '../shared/constants';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  links: Object[] = [];
  languages: Array<string> = [];
  activeSection: string;
  currentLanguage: string;
  fixedNav: boolean;
  phones: Array<string> = [];

  constructor(private appService: AppService, private wpService: WpService) { }

  ngOnInit() {
    ///////////////////////////
    // Mobile dropdown
    $('.has-dropdown a').on('click', function() {
      $(this).parent().toggleClass('open-drop');
    });

    this.appService.windowScroll.subscribe(position => {
      this.fixedNav = position > 1
    });

    this.appService.activeSection.subscribe(section => {
      this.activeSection = section;
    });

    this.appService.links.subscribe(links => {
      this.links = links;
    });

    this.appService.appInfo.subscribe(info => {
      if (info) {
        this.languages = (<any>Object).values(info.languages.options);
        this.currentLanguage = info.languages.current;
      }
    });

    this.wpService.getPageBySlug(Pages.HOME).subscribe((page: {acf: HomePageContent}) => {
      this.phones = [page.acf.phone_number, page.acf.secondary_phone_number];
    });
  }

  // Smooth scroll
  navigate(event, link) {
    event.preventDefault();
    Utils.scrollTo(link.hash, this.fixedNav ? 0 : -60);
  }

  toggleNav() {
    $('#nav').toggleClass('open');
  }
}
