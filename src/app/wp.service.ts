import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject ,  Observable, from } from 'rxjs';
import { environment } from '../environments/environment';

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

  getPageBySlug(slug: string) {
    return from(new Promise((resolve) => {
      const subscription = this.pages.subscribe(pages => {
        if (pages && pages.length) {
          const page = pages.find(p => p.slug === slug);
          if (page) {
            return resolve(page);
          } else {
            subscription.unsubscribe();
            return Promise.reject(`No page found with such slug: ${slug}`);
          }
        }
      });
    }));
  }

  getPostsByCategorySlug(categorySlug: string) {
    return from(new Promise((resolve) => {
      this.categories_.subscribe(categories => {
        if (categories && categories.length) {
          const contactCategory = categories.find(c => c.slug === categorySlug);
          if (contactCategory) {
            this.getPostsByCategoryId(contactCategory.id).subscribe(posts => {
              resolve(posts);
            });
          } else {
            return Promise.reject(`No category found with such slug: ${categorySlug}`);
          }
        }
      })
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
