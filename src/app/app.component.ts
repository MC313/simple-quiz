import { Component, Input } from '@angular/core';

import { MenuState } from './MenuState';

@Component({
  selector: 'fn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  menuState: MenuState = "SHOW";
  
  updateMenuState() {
    this.menuState = (this.menuState === "SHOW" ? "HIDE" : "SHOW");
  }
}
