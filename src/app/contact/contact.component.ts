import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state, keyframes } from '@angular/animations';
import { ContactService } from "./contact.service";
import { VacanciesService } from '../vacancies/vacancies.service'
import { Contact } from './contact';
import { Request, getEmptyRequest } from './request';
import { Vacancy } from "../vacancy/vacancy";
import { Utils } from "../shared/index";
import { WpService } from "../wp.service";
import {Pages} from "../shared/constants";

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

  public contacts: Contact[] = []

  request: Request = getEmptyRequest();
  formActive: boolean = false;
  sendFormError: boolean = false;
  sendFormSuccess: boolean = false;
  uploadFormSuccess: boolean = false;
  uploadFormError: boolean = false;
  fileToUpload: File;

  vacancies: string[] = [];

  selectedContact: Contact;
  pageContent: any = {title: {}};

  get formState() {
    return this.formActive ? 'show' : 'hide';
  }

  get mapState() {
    return this.selectedContact ? 'show' : 'hide';
  }

  constructor(private contactService: ContactService,
              private vacanciesService: VacanciesService,
              private wpService: WpService) {}

  ngOnInit() {
    this.contactService.contacts.subscribe(contacts => {
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

    this.vacanciesService.requestedVacancy.subscribe((vacancy: Vacancy) => {
      if (vacancy) {
        this.request.vacancy = vacancy.name;
        this.formActive = true;
      }
    });

    this.wpService.getPageBySlug(Pages.CONTACT).subscribe(page => {
      this.pageContent = page;
    })

  }

  sendForm(form) {
    this.contactService.sendEmail(this.request).subscribe(res => {
      if (res.success) {
        form.reset();
        this.sendFormSuccess = true;
        this.formActive = false;
        setTimeout(() => {
          this.sendFormSuccess = false;
        }, 5e3);
      } else {
        this.sendFormError = true;
        console.error('oops', new Error('Not successful'));
      }
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
      Utils.scrollTo(Pages.CONTACT);
    }
  }

  private handleUploadError(error: Error, input) {
    console.log(error);
    this.uploadFormError = true;
    this.fileToUpload = null;
    input.value = '';
  }

  uploadRequestForm(files: FileList, input: HTMLInputElement) {
    this.fileToUpload = files.item(0);
    this.contactService.sendFile(this.fileToUpload).subscribe(data => {
      if (data.success) {
        this.uploadFormSuccess = true;
        this.fileToUpload = null;
      } else {
        this.handleUploadError(new Error('Not successful'), input);
      }
    }, error => this.handleUploadError(error, input));
  }
}
