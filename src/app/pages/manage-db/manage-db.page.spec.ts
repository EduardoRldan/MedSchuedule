import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageDbPage } from './manage-db.page';

describe('ManageDbPage', () => {
  let component: ManageDbPage;
  let fixture: ComponentFixture<ManageDbPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDbPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
