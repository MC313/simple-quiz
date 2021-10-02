import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MenuState } from '../MenuState';

type MenuItem = "INVITE" | "SETTINGS";
interface ActiveMenuItem {
  previous: null | MenuItem;
  current: MenuItem;
}

@Component({
  selector: 'fn-app-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss']
})

export class AppMenuComponent {

  _activeMenuItem: ActiveMenuItem = {
    previous: null,
    current: "INVITE"
  }

  menuState: MenuState;
  
  toggleMenu() {
    const { current, previous } = this._activeMenuItem;
    if(!previous || current !== previous) {
      this.menuState = "ACTIVE";
    } else {
      this.menuState = "INACTIVE";
      this.resetMenuItems();
    }
    console.log("MENU ITEM: ", this._activeMenuItem)
  }

  toggleMenuItem(menuItem: MenuItem) {
    if(this._activeMenuItem.current) {
      this._activeMenuItem.previous = this._activeMenuItem.current;
    }
    this._activeMenuItem.current = menuItem;
  }

  resetMenuItems() {
    this._activeMenuItem = { current: null, previous: null };
  }

  set activeMenuItem(activeItem: MenuItem) {
    this._activeMenuItem.current = activeItem;
  }

  get activeMenuItem() {
    return this._activeMenuItem.current;
  }
}
