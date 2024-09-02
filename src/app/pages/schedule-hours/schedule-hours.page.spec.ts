import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleHoursPage } from './schedule-hours.page';

describe('ScheduleHoursPage', () => {
  let component: ScheduleHoursPage;
  let fixture: ComponentFixture<ScheduleHoursPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleHoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
