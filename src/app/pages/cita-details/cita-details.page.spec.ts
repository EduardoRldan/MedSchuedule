import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitaDetailsPage } from './cita-details.page';

describe('CitaDetailsPage', () => {
  let component: CitaDetailsPage;
  let fixture: ComponentFixture<CitaDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
