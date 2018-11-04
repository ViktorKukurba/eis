import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { VacancyContent } from '../vacancy/vacancy';
import { VacanciesService } from '../vacancies/vacancies.service';
import { Utils } from '../shared/index';
import { environment } from '../../environments/environment';
import { showVacancy } from './vacancy.animation';

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss'],
  animations: [showVacancy]
})
export class VacancyComponent implements OnChanges {

  @Input()
  vacancy: VacancyContent;
  activeVacancy: VacancyContent;
  state = 'close';

  options: Object = {
    items: 1,
    loop: true,
    margin: 10,
    nav: true,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    dots: true,
    autoplay: true,
    animateOut: 'fadeOut'
  }

  constructor(private vacanciesService: VacanciesService) {}

  ngOnChanges(changes: SimpleChanges) {
    const name: SimpleChange = changes.vacancy;
    if (!name.currentValue) {
      this.state = 'close';
    } else if (name.previousValue) {
      if (Utils.isMobile()) {
        this.state = this.state === 'refresh' ? 'open' : 'refresh';
      } else {
        this.state = this.state === 'refresh' ? 'open' : 'refresh';
      }

      setTimeout(() => {
        this.activeVacancy = name.currentValue;
      }, 4e2)
    } else if (name.currentValue) {
      this.activeVacancy = name.currentValue;
      this.state = 'open'
    }
  }

  requestVacancy(vacancy: VacancyContent) {
    this.vacanciesService.requestVacancy(vacancy);
    Utils.scrollTo('request-form');
  }

  getImageURL(image) {
    return environment.wpDist + image;
  }
}
