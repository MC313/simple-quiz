import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MenuState } from '../MenuState';

@Component({
  selector: 'fn-app-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss']
})

export class AppMenuComponent {
  menuState: MenuState;

  toggleMenu() {
    this.menuState = (this.menuState === "SHOW" ? "HIDE" : "SHOW");
  }
}
