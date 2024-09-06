import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabPacientePage } from './tab-paciente.page';

describe('TabPacientePage', () => {
  let component: TabPacientePage;
  let fixture: ComponentFixture<TabPacientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
