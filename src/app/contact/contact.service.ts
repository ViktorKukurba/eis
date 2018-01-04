import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Contact } from './contact'

@Injectable()
export class ContactService {

  private _wpSite = environment.wpSite;

  private CONTACT_POST_URL = this._wpSite + 'wp-admin/admin-ajax.php?action=send_message';
  private CONTACTS_URL = '/assets/data/contacts.json';

  constructor(public http:HttpClient) { }

  sendEmail(message: string): Observable<any> {
    console.log(this._wpSite + `wp-admin/admin-ajax.php`)
    const formData = new FormData();
    formData.append('message', message)
    return this.http.post(this.CONTACT_POST_URL, formData);
  }

  getContacts():Observable<Contact[]> {
    return this.http.get<Contact[]>(this.CONTACTS_URL);
  }

}
