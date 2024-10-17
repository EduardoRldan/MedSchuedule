import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainAdminPagePage } from './main-admin-page.page';

describe('MainAdminPagePage', () => {
  let component: MainAdminPagePage;
  let fixture: ComponentFixture<MainAdminPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAdminPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
