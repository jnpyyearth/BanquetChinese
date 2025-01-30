import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaindishCardComponent } from './maindish-card.component';

describe('MaindishCardComponent', () => {
  let component: MaindishCardComponent;
  let fixture: ComponentFixture<MaindishCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaindishCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaindishCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
