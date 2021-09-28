import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'fn-app-menu-button',
  templateUrl: './app-menu-button.component.html',
  styleUrls: ['./app-menu-button.component.scss']
})
export class AppMenuButtonComponent {

  @Output() toggleMenu = new EventEmitter();
  
}
