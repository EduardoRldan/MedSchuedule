import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicHoursPage } from './medic-hours.page';

describe('MedicHoursPage', () => {
  let component: MedicHoursPage;
  let fixture: ComponentFixture<MedicHoursPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicHoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
