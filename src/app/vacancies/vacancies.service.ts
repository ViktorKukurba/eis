import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Vacancy, VacancyContent } from '../vacancy/vacancy';
import { environment } from '../../environments/environment';
import { WpService } from '../wp.service';
import { Pages, StaticTranslations } from '../shared/constants';
import * as $ from 'jquery';

@Injectable()
export class VacanciesService {

  requestedVacancy = new BehaviorSubject<VacancyContent>(undefined);
  vacancies = new Subject<VacancyContent[]>();
  private wpDist = environment.wpDist;

  constructor(private http: HttpClient, private wpService: WpService) {
    this.wpService.getPostsByCategorySlug(Pages.VACANCY).subscribe((posts: any) => {
      this.vacancies.next(posts.map(p => {
        const vacancy = (<VacancyContent>p.acf);
        vacancy.genderTranslated = StaticTranslations.translate(vacancy.gender);
        vacancy.images = Array.from($(p.content.rendered).find('img')).map((el: HTMLImageElement) => el.getAttribute('src'));
        return vacancy;
      }));
    });
  }

  getVacancies(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(this.wpDist + 'assets/data/vacancies.json');
  }

  requestVacancy(vacancy: VacancyContent) {
    if (vacancy && vacancy !== this.requestedVacancy.value) {
      this.requestedVacancy.next(vacancy)
    }
  }
}
