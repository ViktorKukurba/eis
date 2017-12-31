import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state, keyframes } from '@angular/animations'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    trigger('myAwesomeAnimation', [
      state('show', style({
        'max-height': '100%'
      })),
      state('hide', style({
        'max-height': '0'
      })),
      transition('show => hide', animate('500ms ease-in',
          keyframes([
            style({'height': '0', offset: 0.5}),
            style({'height': '0', offset: 1.0})
          ])
      )),
      transition('hide => show', animate('500ms ease-in',
          keyframes([
            style({'max-height': '20em', offset: 0.5}),
            style({'max-height': '100%', offset: 1.0})
          ])
      )),
    ]),
  ]
})
export class ContactComponent implements OnInit {

  public contacts:Array<Object> = []

  formActive:Boolean = false

  get formState() {
    return this.formActive ? 'show' : 'hide';
  }

  constructor() {
    this.contacts = [{
      city: 'Україна, м.Вінниця',
      address: 'вул. Козицького, 15, офіс 101',
      phones: [{
        number: '+38 098 449 2139',
        viber: true
      }]
    }, {
      city: 'Україна, м.Львів',
      address: 'вул. Миколайчука, 24, офіс 1',
      phones: [{
        number: '+ 38 095 786 7314',
        viber: false
      }, {
        number: '+ 38 067 706 4788',
        viber: true
      }, {
        number: '+ 38 097 431 3705',
        viber: true
      }]
    }, {
      city: 'Lithuania, Vilnius',
      address: '08223,  Verkiu g. 30B',
      phones: [{
        number: '+ 37 067 153 640',
        viber: true
      }]
    }]
  }

  ngOnInit() {
  }

}
