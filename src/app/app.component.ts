import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import * as $ from 'jquery'
import {StaticTranslations} from './shared/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  isBackTop = false;
  constructor(private appService: AppService) {
    this.appService.appInfo.subscribe(info => {
      StaticTranslations.locale = info.languages.current;
    });
  }

  ngOnInit() {
    $('#preloader').delay(600).fadeOut();
    this.appService.windowScroll.subscribe(position => {
      this.isBackTop = position > 700;
    });
  }

  backToTop() {
    $('body,html').animate({
      scrollTop: 0
    }, 600);
  }
}
