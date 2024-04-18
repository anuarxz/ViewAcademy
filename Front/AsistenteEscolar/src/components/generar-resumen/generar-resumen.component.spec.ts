import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarResumenComponent } from './generar-resumen.component';

describe('GenerarResumenComponent', () => {
  let component: GenerarResumenComponent;
  let fixture: ComponentFixture<GenerarResumenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerarResumenComponent]
    });
    fixture = TestBed.createComponent(GenerarResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
