import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppetizerCardComponent } from './appetizer-card.component';

describe('AppetizerCardComponent', () => {
  let component: AppetizerCardComponent;
  let fixture: ComponentFixture<AppetizerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppetizerCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppetizerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
