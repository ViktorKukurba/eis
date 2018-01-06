import { Component, OnInit } from '@angular/core';

import { ContactService } from '../contact/contact.service'
import { Utils } from '../shared'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'ЄВРОІНВЕСТСЕРВІС';
  subtitle = 'Ми успішно надаємо послуги працевлаштування за будівельними спеціальностями громадянам України, Білорусі та Молдови на території Польші, Литви, Латвії та Німеччини'
  vacanciesLink = 'Пошук вакансій'
  formLink = 'Залишити заявку'

  contacts:Array<Object>;

  constructor(private contactService: ContactService) {}

  navigateTo(link) {
    Utils.scrollTo(link);
  }

  ngOnInit() {
    this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts.map(contact => {
        var {city, phones} = contact;
        return {
          city,
          phone: phones[0].number,
          contact
        }
      });
    });

    this.contactService.activeContact.subscribe(contact => {
      if (contact) {
        this.selectContact(contact);
        Utils.scrollTo('contact');
      }
    })
  }

  selectContact(contact) {
    console.log('selectContact-1111');
    this.contactService.setActiveContact(contact);
  }
}
