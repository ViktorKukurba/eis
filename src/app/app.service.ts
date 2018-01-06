import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject"
import { environment } from '../environments/environment';
import * as $ from 'jquery'
import {Utils} from "./shared/index";

@Injectable()
export class AppService {
  private activeSection_ = new BehaviorSubject<string>(undefined);
  private windowScroll_ = new BehaviorSubject<number>(undefined);

  activeSection = this.activeSection_.asObservable();
  windowScroll = this.windowScroll_.asObservable();

  private _wpBase = environment.wpBase;
  private links_:Array<string> = [];

  constructor(private http: HttpClient) {
    window.addEventListener('load', () => {
      var links = document.querySelectorAll('#nav .main-nav a');
      this.links_ = Array.from(links).map(link => link.getAttribute('href'));
      this.scrollHandler();
    })
    this.appScrollHandler();
  }

  appScrollHandler() {
    ///////////////////////////
    // On Scroll
    $(window).on('scroll', () => this.scrollHandler());
  }

  scrollHandler() {
    for (let id of this.links_) {
      if (Utils.isElementOnView(document.querySelector(id))) {
        if (this.activeSection_.value !== id) {
          this.activeSection_.next(id);
        }
      }
    }
    this.windowScroll_.next($(window).scrollTop());
  }

  getSettings() {
    return this.http.get(this._wpBase + 'settings').subscribe(data => {
      console.log(data);
    });
  }



}
