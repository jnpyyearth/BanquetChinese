import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrerlistComponent } from './orerlist.component';

describe('OrerlistComponent', () => {
  let component: OrerlistComponent;
  let fixture: ComponentFixture<OrerlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrerlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
