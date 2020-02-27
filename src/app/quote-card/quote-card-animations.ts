import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const quoteCardAnimations: {
  readonly toggleOverlay: AnimationTriggerMetadata;
} = {
  toggleOverlay: trigger('toggleOverlay', [
    state('show', style({ transform: 'translateY(0%)' })),
    state('hide', style({ transform: 'translateY(-100%)' })),
    transition('hide => show', [
      animate('400ms ease-in')
    ]),
    transition('show => hide', [
      animate('400ms ease-out')
    ])
  ])
};


