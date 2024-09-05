import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientConfigPage } from './patient-config.page';

describe('PatientConfigPage', () => {
  let component: PatientConfigPage;
  let fixture: ComponentFixture<PatientConfigPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientConfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
