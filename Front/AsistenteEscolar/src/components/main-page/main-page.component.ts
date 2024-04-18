import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  constructor(protected authService: AuthService, private router: Router) { }

  goToAsistenteVirtual(){
    this.router.navigate(['/asistente-virtual']);
  }

  goToGenerarResumen(){
    this.router.navigate(['/generar-resumen']);
  }

  goChatPDF(){
    this.router.navigate(['/chat-pdf']);
  }

  goToSeleccionarAlumno(){
    this.router.navigate(['/seleccionar-alumno']);
  }

  goToEvaluacionCompetencias(){
    this.router.navigate(['/evaluacion-competencias']);
  }

  goToDetectorPlagios(){
    this.router.navigate(['/detector-plagios']);
  }

  goToVisualizarAlumnos(){
    this.router.navigate(['/listado-alumnos']);
  }

  goToVisualizarProfesores(){
    this.router.navigate(['/listado-profesores']);
  }

  goToVerEstadisticas(){
    alert('Investigando en PowerBI...');
  }
}
