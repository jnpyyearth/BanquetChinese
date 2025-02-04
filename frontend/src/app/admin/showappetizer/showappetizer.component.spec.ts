import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowappetizerComponent } from './showappetizer.component';

describe('ShowappetizerComponent', () => {
  let component: ShowappetizerComponent;
  let fixture: ComponentFixture<ShowappetizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowappetizerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowappetizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
