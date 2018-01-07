import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';
import { Contact } from './contact'
import 'rxjs/add/operator/catch';

@Injectable()
export class ContactService {

  private _wpSite = environment.wpSite;

  private CONTACT_POST_URL = this._wpSite + 'wp-admin/admin-ajax.php?action=send_message';
  private REQUEST_FORM_POST_URL = this._wpSite + 'wp-admin/admin-ajax.php?action=send_file';
  private CONTACTS_URL = '/assets/data/contacts.json';

  private activeContact_ = new BehaviorSubject<Contact>(undefined);

  activeContact = this.activeContact_.asObservable();

  constructor(public http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse) {
    // simple logging, but you can do a lot more, see below
    console.error('An error occurred:', error.error);
    return Observable.throw(new Error(error.error));
  }

  sendEmail(message: string): Observable<any> {
    const formData = new FormData();
    formData.append('message', message)
    return this.http.post(this.CONTACT_POST_URL, formData).catch(this.handleError);
  }

  sendFile(fileToUpload: File): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('requestForm', fileToUpload, fileToUpload.name);
    return this.http.post(this.REQUEST_FORM_POST_URL, formData).catch(this.handleError);
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.CONTACTS_URL);
  }

  setActiveContact(contact) {
    if (contact !== this.activeContact_.value) {
      this.activeContact_.next(contact);
    }
  }

}
