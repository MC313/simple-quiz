import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FnScoreboardComponent } from './fn-scoreboard.component';

describe('FnScoreboardComponent', () => {
  let component: FnScoreboardComponent;
  let fixture: ComponentFixture<FnScoreboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FnScoreboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FnScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
