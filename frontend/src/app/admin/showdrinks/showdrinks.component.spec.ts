import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowdrinksComponent } from './showdrinks.component';

describe('ShowdrinksComponent', () => {
  let component: ShowdrinksComponent;
  let fixture: ComponentFixture<ShowdrinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowdrinksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowdrinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
