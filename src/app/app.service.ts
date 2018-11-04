import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, fromEvent, merge} from 'rxjs';
import { environment } from '../environments/environment';
import * as $ from 'jquery';
import { Utils } from './shared/index';
import { WpService } from './wp.service';

interface Page {
  hash: string;
  title: string;
}

@Injectable()
export class AppService {
  activeSection = new BehaviorSubject<string>(undefined);
  windowScroll = new BehaviorSubject<number>(undefined);
  links = new BehaviorSubject<Page[]>([]);
  appInfo = new Subject<any>();

  private APP_INFO_URL = environment.wpSite + 'wp-admin/admin-ajax.php?action=get_app_info';
  // private PAGES_URL = environment.wpDist + 'assets/data/pages.json';

  constructor(private http: HttpClient, private wpService: WpService) {
    merge(fromEvent(window, 'scroll'), this.links).subscribe(() => {
      this.scrollHandler();
    })
    this.getAppInfo();

    this.wpService.pages.subscribe(pages => {
      if (pages && pages.length) {
        this.links.next(pages.sort((a, b) => {
          return a.menu_order - b.menu_order;
        }).map(page => ({title: page.title.rendered, hash: page.slug})))
      }
    });
  }

  scrollHandler() {
    for (const { hash } of this.links.value) {
      if (Utils.isElementOnView(document.getElementById(hash))) {
        if (this.activeSection.value !== hash) {
          this.activeSection.next(hash);
        }
      }
    }
    this.windowScroll.next($(window).scrollTop());
  }

  getAppInfo() {
    return this.http.get(this.APP_INFO_URL).subscribe(data => {
      this.appInfo.next(data);
    });
  }
}
