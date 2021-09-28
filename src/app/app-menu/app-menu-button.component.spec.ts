import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMenuButtonComponent } from './app-menu-button.component';

describe('AppMenuButtonComponent', () => {
  let component: AppMenuButtonComponent;
  let fixture: ComponentFixture<AppMenuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppMenuButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
