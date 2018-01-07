import { Component, OnInit } from '@angular/core';
import { VacanciesService } from './vacancies.service'
import { Vacancy } from '../vacancy/vacancy'
import { AppService } from '../app.service'

import { Utils } from '../shared'

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {

  public vacancies:Array<Vacancy>;

  active:Object;

  constructor(private vacanciesService: VacanciesService, private appService:AppService) { }

  vacancyDetails(vacancy) {
    this.active = vacancy;
    setTimeout(() => {
      if (Utils.isMobile()) {
        Utils.scrollTo('vacancy-details');
      } else {
        Utils.scrollTo('vacancies');
      }
    }, 1e1)
  }

  ngOnInit() {
    this.vacanciesService.getVacancies().subscribe(vacancies => {
      this.vacancies = vacancies
    });
    this.appService.activeSection.subscribe(section => {
      if (!['#vacancies', '#contact'].includes(section)) {
        this.active = undefined;
      }
    });
  }

  uploadRequestForm() {

  }

}
