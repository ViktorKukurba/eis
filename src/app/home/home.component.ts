import { Component, OnInit } from '@angular/core';

import { ContactService } from '../contact/contact.service'
import { AppService } from '../app.service'
import { WpService } from '../wp.service'
import { Utils } from '../shared'
import { Pages } from "../shared/constants";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pageContent:HomePageContent = new HomePageContent();

  constructor(private contactService: ContactService,
              private appService: AppService,
              private wpService: WpService) {}

  navigateTo(link) {
    Utils.scrollTo(link);
  }

  ngOnInit() {
    this.wpService.getPageBySlug(Pages.HOME).subscribe((page:{acf: HomePageContent}) => {
      this.pageContent = page.acf;
    });
    // this.wpService.pages.subscribe(pages => {
    //   if (pages && pages.length) {
    //     this.pageContent = pages.find(page => page.slug === 'home').acf;
    //   }
    // });

    // this.appService.appInfo.subscribe(info => {
    //   if (info) {
    //     this.title = info.title;
    //     this.subtitle = info.description;
    //   }
    // });

    // this.contactService.contacts.subscribe(contacts => {
    //   this.contacts = contacts.map(contact => {
    //     var {city, phones} = contact;
    //     return {
    //       city,
    //       phone: phones[0].number,
    //       contact
    //     }
    //   });
    // });

    // this.contactService.activeContact.subscribe(contact => {
    //   if (contact) {
    //     this.selectContact(contact);
    //     Utils.scrollTo('contact');
    //   }
    // })
  }

  selectContact(contact) {
    this.contactService.setActiveContact(contact);
    Utils.scrollTo('contact');
  }
}

export class HomePageContent {
  site_title: string;
  sub_title: string;
  action_button:string;
  search_button:string;
  phone_number:string;
  secondary_phone_number:string;
}
