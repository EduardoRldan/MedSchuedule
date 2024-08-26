import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaBusquedaPage } from './pagina-busqueda.page';

describe('PaginaBusquedaPage', () => {
  let component: PaginaBusquedaPage;
  let fixture: ComponentFixture<PaginaBusquedaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaBusquedaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
