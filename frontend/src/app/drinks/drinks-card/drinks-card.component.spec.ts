import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinksCardComponent } from './drinks-card.component';

describe('DrinksCardComponent', () => {
  let component: DrinksCardComponent;
  let fixture: ComponentFixture<DrinksCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DrinksCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrinksCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
