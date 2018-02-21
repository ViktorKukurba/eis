import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Vacancy, VacancyContent } from '../vacancy/vacancy'
import { environment } from '../../environments/environment';
import { WpService } from "../wp.service";
import { Pages, StaticTranslations } from "../shared/constants";
declare var $ :any;

@Injectable()
export class VacanciesService {

  private requestedVacancy_ = new BehaviorSubject<VacancyContent>(undefined);
  private vacancies_ = new Subject<VacancyContent[]>();
  private wpDist = environment.wpDist;

  requestedVacancy = this.requestedVacancy_.asObservable();
  vacancies = this.vacancies_.asObservable();

  constructor(private http: HttpClient, private wpService: WpService) {
    this.wpService.getPostsByCategorySlug(Pages.VACANCY).subscribe((posts:any) => {
      this.vacancies_.next(posts.map(p => {
        var vacancy = (<VacancyContent>p.acf);
        vacancy.genderTranslated = StaticTranslations.translate(vacancy.gender);
        vacancy.images = $(p.content.rendered).find('img').map((i, el) => el.getAttribute('src'));
        return vacancy;
      }));
    });
  }

  getVacancies(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>( this.wpDist + 'assets/data/vacancies.json');
  }

  requestVacancy(vacancy: VacancyContent) {
    if (vacancy && vacancy !== this.requestedVacancy_.value) {
      this.requestedVacancy_.next(vacancy)
    }
  }

}