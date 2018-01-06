import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { trigger, transition, style, animate, state, keyframes } from '@angular/animations'
import { Vacancy } from '../vacancy/vacancy'
import {Utils} from "../shared/index";
declare var $ :any;

var refreshAnimation = animate('700ms ease-in',
    keyframes([
      style({'height': '0', offset: 0.4}),
      style({'height': '0', offset: 0.6}),
      style({offset: 1.0})
    ])
)

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss'],
  animations: [
    trigger('myAwesomeAnimation', [
      state('refresh', style({})),
      state('close', style({
        'max-height': '0'
      })),
      state('open', style({
        'max-height': '100%',
      })),
      transition('open => refresh', refreshAnimation),
      transition('refresh => open', refreshAnimation),
      transition('close => open', animate('500ms ease-in',
          keyframes([
            style({'max-height': '0em', offset: 0}),
            style({'max-height': '20em', offset: 0.5}),
            style({'max-height': '100%', offset: 1.0})
          ])
      )),
      transition('* => close', animate('500ms ease-out',
          keyframes([
            style({'height': '0', offset: 0.5}),
            style({'height': '0', offset: 1.0})
          ])
      )),
    ]),
  ]
})
export class VacancyComponent implements OnChanges {

  @Input()
  vacancy:Vacancy;
  activeVacancy:Vacancy;

  private options:Object = {
    items:1,
    loop:true,
    margin:10,
    nav: true,
    navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
    dots : true,
    autoplay : true,
    animateOut: 'fadeOut'
  }

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges) {
    const name: SimpleChange = changes.vacancy;
    if (!name.currentValue) {
      console.log('close-vacancy');
      this.state = 'close'
    } else if (name.previousValue) {
      if (Utils.isMobile()) {
        this.state = this.state === 'refresh' ? 'open' : 'refresh';
      } else {
        this.state = this.state === 'refresh' ? 'open' : 'refresh';
      }

      setTimeout(() => {
        this.activeVacancy = name.currentValue
      }, 4e2)
    } else if (name.currentValue) {
      this.activeVacancy = name.currentValue
      this.state = 'open'
    }
  }

  state:string = 'close';
}
