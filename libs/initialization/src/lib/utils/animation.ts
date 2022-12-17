import { animate, animateChild, group, query, state, style, transition, trigger } from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimation', [
    state('*', style({
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
      zIndex: 100
    })),
    transition(':enter', [
      style({ opacity: 0.5 }),
      animate('1s ease-in-out', style({
        opacity: 1
      }))
    ]),
    transition(':leave', [
      style({
        top: 0,
        opacity: 1
      }),
      animate('1s ease-in-out', style({
        top: '-100%',
        opacity: 0
      }))
    ])
  ]);
