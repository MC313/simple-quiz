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
  readonly slideCardOut: AnimationTriggerMetadata;
  readonly slideCardUp: AnimationTriggerMetadata;
} = {
  slideCardInOut: trigger('slideInOut', [
    state('slideIn', style({ transform: 'translateX(0%)' })),
    transition(':enter', [
      style({ transform: 'translateX(-100%)' }),
      animate(300)
    ]),
    transition(':leave', [
      style({ transform: 'translateX(100%)' }),
      animate(300)
    ])
  ]),

  slideCardOut: trigger('slideCardInOut', [
    state('slideIn', style({ transform: 'translateX(0%)' })),
    transition(':enter', [
      style({ transform: 'translateX(-100%)' }),
      animate(300)
    ]),
    transition(':leave', [
      style({ transform: 'translateX(100%)' }),
      animate(300)
    ])
  ]),

  slideCardUp: trigger('slideCardUp', [
    // state('slideIn', style({ transform: 'translateX(0%)'})),
    transition(':enter', [
      style({ transform: 'translateX(-100%)' }),
      animate(300)
    ]),
    transition(':leave', [
      style({ transform: 'translateX(100%)' }),
      animate(300)
    ])
  ])
};
