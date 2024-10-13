import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserMedicProfilePage } from './user-medic-profile.page';

describe('UserMedicProfilePage', () => {
  let component: UserMedicProfilePage;
  let fixture: ComponentFixture<UserMedicProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMedicProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
