import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { trigger, transition, style, animate, state, keyframes } from '@angular/animations'
declare var $ :any;

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss'],
  animations: [
    trigger('myAwesomeAnimation', [
      state('small', style({
        // transform: 'scale(1)',
         // 'max-height': '100%'
      })),
      state('large', style({
        // transform: 'scale(1)',
        // 'max-height': '100%'
      })),
      transition('* => *', animate('700ms ease-in',
          keyframes([
            style({
              // 'max-height': '100%',
              offset: 0
            }),
            style({'height': '0',    offset: 0.4}),
            style({'height': '0',    offset: 0.6}),
            style({offset: 1.0})
          ])
      )),
      transition('* => open', animate('500ms ease-in',
          keyframes([
            style({'height': '0',    offset: 0}),
            style({offset: 1.0, 'max-height': '100%'})
          ])
      )),
    ]),
  ]
})
export class VacancyComponent implements OnInit, OnChanges {

  @Input()
  vacancy:Object;
  activeVacancy:Object;

  private options:Object = {
    items:1,
    loop:true,
    margin:15,
    nav: true,
    navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
    dots : true,
    autoplay : true,
    animateOut: 'fadeOut'
  }

  images = ['../../assets/img/about1.jpg', '../../assets/img/monolit.jpg']
  constructor() {

  }

  ngOnChanges(changes: SimpleChanges) {
    const name: SimpleChange = changes.vacancy;
    console.log('prev value: ', name.previousValue, name.previousValue === name.currentValue);
    console.log('got name: ', name.currentValue);
    if (name.previousValue) {
      this.state = this.state === 'small' ? 'large' : 'small';
    } else {
      this.state = 'open'
    }

    setTimeout(() => {
      this.activeVacancy = name.currentValue
    }, 4e2)
  }

  state:String = 'small';

  ngOnInit() {
    // Owl Carousel
    // $('#about-slider')['owlCarousel']({
    //   items:1,
    //   loop:true,
    //   margin:15,
    //   nav: true,
    //   navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
    //   dots : true,
    //   autoplay : true,
    //   animateOut: 'fadeOut'
    // });
  }

}
