import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowmaindishComponent } from './showmaindish.component';

describe('ShowmaindishComponent', () => {
  let component: ShowmaindishComponent;
  let fixture: ComponentFixture<ShowmaindishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowmaindishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowmaindishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
