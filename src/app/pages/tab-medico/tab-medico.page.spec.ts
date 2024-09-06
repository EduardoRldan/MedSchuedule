import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabMedicoPage } from './tab-medico.page';

describe('TabMedicoPage', () => {
  let component: TabMedicoPage;
  let fixture: ComponentFixture<TabMedicoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabMedicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
