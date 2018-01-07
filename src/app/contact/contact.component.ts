import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state, keyframes } from '@angular/animations';
import { ContactService } from "./contact.service";
import { VacanciesService } from '../vacancies/vacancies.service'
import { Contact } from './contact';
import { Request, getEmptyRequest } from './request';
import { Vacancy } from "../vacancy/vacancy";
import {Utils} from "../shared/index";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    trigger('myAwesomeAnimation', [
      state('show', style({
        'max-height': '100%'
      })),
      state('hide', style({
        'max-height': '0',
        border: 'none'
      })),
      transition('show => hide', animate('500ms ease-in',
          keyframes([
            style({'height': '0', offset: 0.5}),
            style({'height': '0', offset: 1.0})
          ])
      )),
      transition('hide => show', animate('500ms ease-in',
          keyframes([
            style({'max-height': '20em', offset: 0.5}),
            style({'max-height': '100%', offset: 1.0})
          ])
      )),
    ]),
    trigger('showMap', [
      state('show', style({
        'max-height': '100%'
      })),
      state('hide', style({
        'max-height': '0'
      })),
      transition('show => hide', animate('500ms ease-in',
          keyframes([
            style({'height': '0', offset: 0.5}),
            style({'height': '0', offset: 1.0})
          ])
      )),
      transition('hide => show', animate('500ms ease-in',
          keyframes([
            style({'max-height': '20em', offset: 0.5}),
            style({'max-height': '100%', offset: 1.0})
          ])
      )),
    ]),
  ]
})
export class ContactComponent implements OnInit {

  public contacts:Contact[] = []

  request: Request = getEmptyRequest();
  formActive: boolean = false;
  sendFormError: boolean = false;
  sendFormSuccess: boolean = false;
  uploadFormSuccess: boolean = false;
  uploadFormError: boolean = false;
  fileToUpload: File;

  vacancies: string[] = [];

  selectedContact:Contact;

  get formState() {
    return this.formActive ? 'show' : 'hide';
  }

  get mapState() {
    return this.selectedContact ? 'show' : 'hide';
  }

  constructor(private contactService: ContactService, private vacanciesService: VacanciesService) {}

  ngOnInit() {
    this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
    });

    this.contactService.activeContact.subscribe(contact => {
      this.selectedContact = contact;
    });

    this.vacanciesService.getVacancies().subscribe(vacancies => {
      this.vacancies = vacancies.map(vacancy => {
        return vacancy.name;
      });
    });

    this.vacanciesService.requestedVacancy.subscribe((vacancy:Vacancy) => {
      if (vacancy) {
        this.request.vacancy = vacancy.name;
        this.formActive = true;
      }
    })
  }

  sendForm(form) {
    this.contactService.sendEmail('Test').subscribe(res => {
      console.log('sendForm', res);
      form.reset();
      this.sendFormSuccess = true;
      this.formActive = false;
      setTimeout(() => {
        this.sendFormSuccess = false;
      }, 5e3);
    }, error => {
      this.sendFormError = true;
      console.error('oops', error);
    });
  }

  selectAddress(contact) {
    this.contactService.setActiveContact(contact);
    if (Utils.isMobile()) {
      Utils.scrollTo('map-container', -150);
    } else {
      Utils.scrollTo('contact');
    }
  }

  uploadRequestForm(files: FileList, input:HTMLInputElement) {
    this.fileToUpload = files.item(0);
    console.log(input.value);
    this.contactService.sendFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      this.uploadFormSuccess = true;
      this.fileToUpload = null;
    }, error => {
      console.log(error);
      this.uploadFormError = true;
      this.fileToUpload = null;
      input.value = '';
    });
  }

}
