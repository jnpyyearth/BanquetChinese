import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HirelistComponent } from './hirelist.component';

describe('HirelistComponent', () => {
  let component: HirelistComponent;
  let fixture: ComponentFixture<HirelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HirelistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HirelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
