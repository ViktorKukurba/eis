import {
    trigger,
    state,
    style,
    transition,
    animate,
    keyframes,
  } from '@angular/animations';

  export const contactForm = [
    trigger('contactForm', [
      state('show', style({
        'max-height': '100%'
      })),
      state('hide', style({
        'max-height': '0',
        border: 'none'
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
  ])
];

export const showMap = [
  trigger('showMap', [
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
  ])
]
