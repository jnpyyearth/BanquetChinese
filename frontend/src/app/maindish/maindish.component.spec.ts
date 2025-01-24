import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaindishComponent } from './maindish.component';

describe('MaindishComponent', () => {
  let component: MaindishComponent;
  let fixture: ComponentFixture<MaindishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaindishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaindishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
