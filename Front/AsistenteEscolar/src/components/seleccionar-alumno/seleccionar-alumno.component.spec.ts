import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarAlumnoComponent } from './seleccionar-alumno.component';

describe('SeleccionarAlumnoComponent', () => {
  let component: SeleccionarAlumnoComponent;
  let fixture: ComponentFixture<SeleccionarAlumnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeleccionarAlumnoComponent]
    });
    fixture = TestBed.createComponent(SeleccionarAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
