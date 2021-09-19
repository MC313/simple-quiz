import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fn-scoreboard',
  templateUrl: './fn-scoreboard.component.html',
  styleUrls: ['./fn-scoreboard.component.scss']
})
export class FnScoreboardComponent implements OnInit {

  @Input() score: number;

  constructor() { }

  ngOnInit() {
  }

}
