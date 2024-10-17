import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewMedicAccountPage } from './new-medic-account.page';

describe('NewMedicAccountPage', () => {
  let component: NewMedicAccountPage;
  let fixture: ComponentFixture<NewMedicAccountPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMedicAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
