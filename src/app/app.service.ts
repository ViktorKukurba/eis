import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../environments/environment';

@Injectable()
export class AppService {

  private _wpBase = environment.wpBase;

  constructor(private http: HttpClient) { }

  getSettings() {
    return this.http.get(this._wpBase + 'settings').subscribe(data => {
      console.log(data);
    });
  }

}
