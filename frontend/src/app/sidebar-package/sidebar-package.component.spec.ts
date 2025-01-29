import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPackageComponent } from './sidebar-package.component';

describe('SidebarPackageComponent', () => {
  let component: SidebarPackageComponent;
  let fixture: ComponentFixture<SidebarPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarPackageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
