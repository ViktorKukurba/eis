import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state, keyframes } from '@angular/animations'
import { ContactService } from "./contact.service";
import { Contact } from './contact'

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

  formActive: boolean = false

  selectedContact:Contact;

  get formState() {
    return this.formActive ? 'show' : 'hide';
  }

  get mapState() {
    return this.selectedContact ? 'show' : 'hide';
  }

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
    });

    this.contactService.activeContact.subscribe(contact => {
      this.selectedContact = contact;
    })
  }

  sendForm() {
    this.contactService.sendEmail('Test').subscribe((res) => {
      console.log('res', res);
    })
    return false;
  }

  selectAddress(contact) {
    this.contactService.setActiveContact(contact)
  }

}
