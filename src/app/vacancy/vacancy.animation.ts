import {
    trigger,
    state,
    style,
    transition,
    animate,
    keyframes
  } from '@angular/animations';

  const refreshAnimation = animate('700ms ease-in',
    keyframes([
      style({'height': '0', offset: 0.4}),
      style({'height': '0', offset: 0.6}),
      style({offset: 1.0})
    ])
)

  export const showVacancy = [
    trigger('showVacancy', [
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
      ])
  ]
