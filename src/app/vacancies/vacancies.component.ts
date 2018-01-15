import { Component, OnInit } from '@angular/core';
import { VacanciesService } from './vacancies.service'
import { Vacancy } from '../vacancy/vacancy'
import { AppService } from '../app.service'

import {Utils, DefaultContent} from '../shared'
import {WpService} from "../wp.service";
import {Pages} from "../shared/constants";

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {

  public vacancies:Array<Vacancy>;

  active:Object;
  pageContent:DefaultContent = new DefaultContent()

  constructor(private vacanciesService: VacanciesService,
              private appService:AppService,
              private wpService: WpService) { }

  vacancyDetails(vacancy) {
    this.active = vacancy;
    setTimeout(() => {
      if (Utils.isMobile()) {
        Utils.scrollTo('vacancy-details');
      } else {
        Utils.scrollTo(Pages.VACANCIES);
      }
    }, 1e1)
  }

  ngOnInit() {
    this.vacanciesService.getVacancies().subscribe(vacancies => {
      this.vacancies = vacancies
    });
    this.appService.activeSection.subscribe(section => {
      if (![Pages.VACANCIES, Pages.CONTACT].includes(section)) {
        this.active = undefined;
      }
    });
    this.wpService.getPageBySlug(Pages.VACANCIES).subscribe((page:DefaultContent) => {
      this.pageContent = page;
    });
  }

  uploadRequestForm() {

  }

}
