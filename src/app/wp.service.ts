import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject"
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class WpService {

  pages_ = new BehaviorSubject([]);
  categories_ = new BehaviorSubject([]);
  pages = this.pages_.asObservable();
  categories = this.categories_.asObservable();

  constructor(private http: HttpClient) {
    this.getPages();
    this.getCategories();
  }

  getPages() {
    return this.http.get<Object[]>(environment.wpBase + 'pages').subscribe(data => {
      if (data && data.length) {
        this.pages_.next(data);
      }
    });
  }

  getPageBySlug(slug) {
    return Observable.fromPromise(new Promise((resolve) => {
      var subscription = this.pages.subscribe(pages => {
        if (pages && pages.length) {
          let page = pages.find(page => page.slug === slug);
          if (page) {
            return resolve(page);
          } else {
            subscription.unsubscribe();
            return Promise.reject('No page found with such slug');
          }
        }
      });
    }));
  }

  getCategories() {
    this.http.get<Object[]>(environment.wpBase + 'categories').subscribe(data => {
      if (data && data.length) {
        this.categories_.next(data);
      }
    });
  }

  getPostsByCategoryId(id) {
    return this.http.get<Object[]>(environment.wpBase + `posts?categories=${id}`);
  }
}
