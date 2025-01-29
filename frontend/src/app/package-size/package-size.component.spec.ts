import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageSizeComponent } from './package-size.component';

describe('PackageSizeComponent', () => {
  let component: PackageSizeComponent;
  let fixture: ComponentFixture<PackageSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PackageSizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
