import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPageMedicPage } from './main-page-medic.page';

describe('MainPageMedicPage', () => {
  let component: MainPageMedicPage;
  let fixture: ComponentFixture<MainPageMedicPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageMedicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
