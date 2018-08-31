import {
  animate,
  state,
  style,
  transition,
  trigger,
  keyframes,
  AnimationTriggerMetadata,
  query,
  animateChild
} from '@angular/animations';

export const quoteCardAnimations: {
  readonly slideCardInOut: AnimationTriggerMetadata;                                                              
} = {
  slideCardInOut: trigger('slideCardInOut', [
    state('slideIn', style({ transform: 'translateX(0)' })),
    transition('void => *', [
      style({ transform: 'translateX(-100%)' }),
      animate('700ms ease')
    ]),
    transition('* => void', [
      animate(
        '200ms ease',
        keyframes([
          style({ transform: 'translateX(0%)' }),
          style({ transform: 'translateX(150%)' })
        ])
      )
    ])
  ])

  // slideCardInOut: trigger('slideCardInOut', [
  //   state('slideIn', style({ transform: 'translateX(0%)' })),
  //   state('slideOut', style({ transform: 'translateX(100%)' })),
  //   transition('* => slideIn', [
  //     style({ transform: 'translateX(0%)' }),
  //     animate('800ms ease-in')
  //   ]),
  //   transition('* => slideOut', [
  //     style({ transform: 'translateX(100%)' }),
  //     animate('300ms ease-out')
  //   ])
  // ]),
};
