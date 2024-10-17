import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAdminProfilePage } from './user-admin-profile.page';

describe('UserAdminProfilePage', () => {
  let component: UserAdminProfilePage;
  let fixture: ComponentFixture<UserAdminProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdminProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
