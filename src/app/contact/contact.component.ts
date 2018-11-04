import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { VacanciesService } from '../vacancies/vacancies.service';
import { Contact, ContactPageContent } from './contact';
import { OnlineForm, getEmptyOnlineForm } from './online-form';
import { VacancyContent} from '../vacancy/vacancy';
import { Utils } from '../shared/index';
import { WpService } from '../wp.service';
import { Pages } from '../shared/constants';
import { contactForm, showMap } from './contact.animation';

// function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
//   var R = 6371; // Radius of the earth in km
//   var dLat = deg2rad(lat2-lat1);  // deg2rad below
//   var dLon = deg2rad(lon2-lon1);
//   var a =
//           Math.sin(dLat/2) * Math.sin(dLat/2) +
//           Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//           Math.sin(dLon/2) * Math.sin(dLon/2)
//       ;
//   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//   var d = R * c; // Distance in km
//   return d;
// }
//
// function deg2rad(deg) {
//   return deg * (Math.PI/180)
// }

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [contactForm, showMap]
})
export class ContactComponent implements OnInit {

  public contacts: Contact[] = []

  onlineForm: OnlineForm = getEmptyOnlineForm();
  formActive = false;
  sendFormError = false;
  sendFormSuccess = false;
  uploadFormSuccess = false;
  uploadFormError = false;
  fileToUpload: File;

  vacancies: string[] = [];
  offices: any[] = [];

  selectedContact: Contact;
  pageContent: ContactPageContent = new ContactPageContent();

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
      this.offices = contacts.filter(office => office.city.includes('Укра'))
          .map(office => {
            return {
              value: office.email,
              title: office.city,
              coords: {
                lat: office.lat,
                lng: office.lng
              }
            }
          });

      if (this.offices.length) {
        this.onlineForm.office = this.offices.filter(office => office.value.includes('lviv'))[0].value;
      }

      // navigator.geolocation.getCurrentPosition((geolocation) => {
      //   this.offices.sort((a, b) => {
      //     return getDistanceFromLatLonInKm(a.coords.lat, a.coords.lng, geolocation.coords.latitude, geolocation.coords.longitude) -
      //       getDistanceFromLatLonInKm(b.coords.lat, b.coords.lng, geolocation.coords.latitude, geolocation.coords.longitude)
      //   })
      //
      //   this.onlineForm.office = this.offices[0]
      //   console.log('this.onlineForm.office', this.onlineForm.office)
      // }, () => {
      //
      // },{
      //   enableHighAccuracy: true,
      //   timeout: 1000,
      //   maximumAge: 0
      // });
    });

    this.contactService.activeContact.subscribe(contact => {
      this.selectedContact = contact;
    });

    this.vacanciesService.vacancies.subscribe(vacancies => {
      this.vacancies = vacancies.map(v => v.title);
    });

    this.vacanciesService.requestedVacancy.subscribe((vacancy: VacancyContent) => {
      if (vacancy) {
        this.onlineForm.vacancy = vacancy.title;
        this.formActive = true;
      }
    });

    this.wpService.getPageBySlug(Pages.CONTACT).subscribe((page: any) => {
      this.pageContent = <ContactPageContent>page.acf;
      this.pageContent.title = page.title.rendered;
    })

  }

  sendForm(form) {
    this.contactService.sendEmail(this.onlineForm).subscribe(res => {
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

  uploadOfficialForm(files: FileList, input: HTMLInputElement) {
    this.fileToUpload = files.item(0);
    this.contactService.sendFile(this.fileToUpload).subscribe(data => {
      if (data.success) {
        this.uploadFormSuccess = true;
        this.fileToUpload = null;
        setTimeout(() => {
          this.uploadFormSuccess = false;
        }, 5e3);
      } else {
        this.handleUploadError(new Error('Not successful'), input);
      }
    }, error => this.handleUploadError(error, input));
  }
}
