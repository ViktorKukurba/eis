import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Vacancy } from '../vacancy/vacancy'
import { environment } from '../../environments/environment';

@Injectable()
export class VacanciesService {

  private requestedVacancy_ = new BehaviorSubject<Vacancy>(undefined);
  private wpDist = environment.wpDist;

  requestedVacancy = this.requestedVacancy_.asObservable();


  constructor(private http: HttpClient) { }

  getVacancies(): Observable<Vacancy[]> {

    return this.http.get<Vacancy[]>( this.wpDist + 'assets/data/vacancies.json');

  }

  requestVacancy(vacancy: Vacancy) {
    if (vacancy && vacancy !== this.requestedVacancy_.value) {
      this.requestedVacancy_.next(vacancy)
    }
  }

}