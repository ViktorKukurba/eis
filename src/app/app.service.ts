import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject"
import { environment } from '../environments/environment';
import * as $ from 'jquery'
import {Utils} from "./shared/index";
import {WpService} from "./wp.service";

interface Page {
  hash:string;
  title:string;
}

@Injectable()
export class AppService {
  private activeSection_ = new BehaviorSubject<string>(undefined);
  private windowScroll_ = new BehaviorSubject<number>(undefined);
  private links_ = new BehaviorSubject<Page[]>(undefined);
  private appInfo_ = new BehaviorSubject<any>(undefined);
  private handler_:any = this.scrollHandler.bind(this);

  activeSection = this.activeSection_.asObservable();
  windowScroll = this.windowScroll_.asObservable();
  links = this.links_.asObservable();
  appInfo = this.appInfo_.asObservable();

  private APP_INFO_URL = environment.wpSite + 'wp-admin/admin-ajax.php?action=get_app_info';
  // private PAGES_URL = environment.wpDist + 'assets/data/pages.json';

  constructor(private http: HttpClient, private wpService: WpService) {
    this.links.subscribe(links => {
      if (links && links.length) {
        this.scrollHandler();
      }
    });
    this.getAppInfo();

    this.wpService.pages.subscribe(pages => {
      if (pages && pages.length) {
        this.links_.next(pages.sort((a, b) => {
          return a.menu_order - b.menu_order;
        }).map(page => ({title: page.title.rendered, hash: page.slug})))
      }
    });
    this.appScrollHandler();
  }

  scrollHandler() {
    if (!this.links_.value) return;
    for (let { hash } of this.links_.value) {
      if (Utils.isElementOnView(document.getElementById(hash))) {
        if (this.activeSection_.value !== hash) {
          this.activeSection_.next(hash);
        }
      }
    }
    this.windowScroll_.next($(window).scrollTop());
  }

  appScrollHandler() {
    window.removeEventListener('scroll', this.handler_);
    window.addEventListener('scroll', this.handler_);
  }

  getAppInfo() {
    return this.http.get(this.APP_INFO_URL).subscribe(data => {
      this.appInfo_.next(data);
    });
  }
}
