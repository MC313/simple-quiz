import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MenuState } from '../MenuState';

@Component({
  selector: 'fn-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss']
})

export class AppMenuComponent {

  @Input() menuState: MenuState;

}
