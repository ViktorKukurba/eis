import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { OwlModule } from 'ngx-owl-carousel';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { InViewportModule, WindowRef } from '@thisissoon/angular-inviewport';
import { ScrollSpyModule } from '@thisissoon/angular-scrollspy';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { ContactComponent } from './contact/contact.component';
import { ContactService } from './contact/contact.service';
import { VacanciesService } from './vacancies/vacancies.service'
import { WpService } from './wp.service'
import { VacancyComponent } from './vacancy/vacancy.component';
import { AgmCoreModule } from '@agm/core';
import { TranslateDirective } from './translate.directive';


// Provide window object for browser and a suitable replacement
// on other platforms
const getWindow = () => window;
const providers = [
  { provide: WindowRef, useFactory: (getWindow) },
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    VacanciesComponent,
    ContactComponent,
    VacancyComponent,
    TranslateDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InViewportModule.forRoot(providers),
    ScrollSpyModule.forRoot(),
    OwlModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCfDuzk8cLBCL4z3lqmb6oA6e5P4VSnY0I'
    })
  ],
  providers: [ContactService, VacanciesService, WpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
