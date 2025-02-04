import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowmenuComponent } from './showmenu.component';

describe('ShowmenuComponent', () => {
  let component: ShowmenuComponent;
  let fixture: ComponentFixture<ShowmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowmenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
