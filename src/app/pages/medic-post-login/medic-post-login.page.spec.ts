import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicPostLoginPage } from './medic-post-login.page';

describe('MedicPostLoginPage', () => {
  let component: MedicPostLoginPage;
  let fixture: ComponentFixture<MedicPostLoginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicPostLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
