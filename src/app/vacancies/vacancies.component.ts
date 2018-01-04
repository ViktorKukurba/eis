import { Component, OnInit } from '@angular/core';
import { VacanciesService } from './vacancies.service'
import { Vacancy } from '../vacancy/vacancy'

import { Utils } from '../shared'

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss'],
  providers: [VacanciesService]
})
export class VacanciesComponent implements OnInit {

  public vacancies:Array<Vacancy>;

  active:Object;

  constructor(private vacanciesService: VacanciesService) { }

  vacancyDetails(vacancy) {
    this.active = vacancy;
    setTimeout(() => {
      Utils.scrollTo('vacancy-details', -250)
      // Utils.scrollTo('vacancies-list', -50)
    }, 1e1)
  }

  ngOnInit() {
    this.vacanciesService.getVacancies().subscribe(vacancies => {
      this.vacancies = vacancies
    })
  }

}
