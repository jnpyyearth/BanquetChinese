import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowdessertComponent } from './showdessert.component';

describe('ShowdessertComponent', () => {
  let component: ShowdessertComponent;
  let fixture: ComponentFixture<ShowdessertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowdessertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowdessertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
