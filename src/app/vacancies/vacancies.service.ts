import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { Vacancy } from '../vacancy/vacancy'

@Injectable()
export class VacanciesService {

  constructor(private http: HttpClient) { }

  getVacancies(): Observable<Vacancy[]> {

    return this.http.get<Vacancy[]>('/assets/data/vacancies.json');

  }

}