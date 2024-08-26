import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarraDespegablePage } from './barra-despegable.page';

describe('BarraDespegablePage', () => {
  let component: BarraDespegablePage;
  let fixture: ComponentFixture<BarraDespegablePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraDespegablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
