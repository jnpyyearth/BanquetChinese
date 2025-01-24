import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppetizerComponent } from './appetizer.component';

describe('AppetizerComponent', () => {
  let component: AppetizerComponent;
  let fixture: ComponentFixture<AppetizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppetizerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppetizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
