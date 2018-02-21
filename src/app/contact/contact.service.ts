import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';
import { Contact } from './contact'
import { OnlineForm } from './online-form'
import 'rxjs/add/operator/catch';
import {WpService} from "../wp.service";
import {Pages} from "../shared/constants";

@Injectable()
export class ContactService {
  private CONTACT_POST_URL =  environment.wpSite + 'wp-admin/admin-ajax.php?action=send_message';
  private ONLINE_FORM_POST_URL =  environment.wpSite + 'wp-admin/admin-ajax.php?action=send_order';
  private CONTACTS_URL = environment.wpDist + 'assets/data/contacts.json';

  private activeContact_ = new BehaviorSubject<Contact>(undefined);
  private contacts_ = new BehaviorSubject<Array<Contact>>([]);

  activeContact = this.activeContact_.asObservable();
  contacts = this.contacts_.asObservable();

  constructor(public http: HttpClient, private wpService: WpService) {
    this.wpService.categories_.subscribe(categories => {
      if (categories && categories.length) {
        let contactCategory = categories.find(c => c.slug === Pages.CONTACT);
        this.wpService.getPostsByCategoryId(contactCategory.id).subscribe(contacts => {
          this.contacts_.next(contacts.map(this.formatter));
        })
      }
    })
  }

  private formatter(contact):Contact {
    contact = (<any>contact).acf;
    let phones = (<any>contact).phones ? (<any>contact).phones.split(',').map(number => {
      return { number, viber: false }
    }) : [];
    return <Contact>{
      city: `${(<any>contact).country} ${(<any>contact).city}`,
      street: contact.street,
      email: contact.email,
      phones: (<any>contact).vibers.split(',').map(viber => {
        return {
          number: viber.trim(),
          viber: true
        }
      }).concat(phones),
      lat: +(<any>contact).coordinates.lat,
      lng: +(<any>contact).coordinates.lng,
    }
  }

  private handleError(error: HttpErrorResponse) {
    // simple logging, but you can do a lot more, see below
    console.error('An error occurred:', error.error);
    return Observable.throw(new Error(error.error));
  }

  sendEmail(form: OnlineForm): Observable<any> {
    const formData = new FormData();
    formData.append('message', form.description);
    formData.append('email', form.email);
    formData.append('vacancy', form.vacancy);
    formData.append('phone', form.phone);
    formData.append('name', form.name);
    formData.append('office', form.office);
    return this.http.post(this.CONTACT_POST_URL, formData).catch(this.handleError);
  }

  sendFile(fileToUpload: File): Observable<{success:boolean}> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(this.ONLINE_FORM_POST_URL, formData).catch(this.handleError);
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
