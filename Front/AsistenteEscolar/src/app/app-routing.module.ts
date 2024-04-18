import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { MainPageComponent } from '../components/main-page/main-page.component';
import { AsistenteVirtualComponent } from '../components/asistente-virtual/asistente-virtual.component';
import { GenerarResumenComponent } from '../components/generar-resumen/generar-resumen.component';
import { EvaluacionCompetenciasComponent } from '../components/evaluacion-competencias/evaluacion-competencias.component';
import { SeleccionarAlumnoComponent } from '../components/seleccionar-alumno/seleccionar-alumno.component';
import { DetectorPlagiosComponent } from '../components/detector-plagios/detector-plagios.component';
import { ChatPdfComponent } from 'src/components/chat-pdf/chat-pdf.component';
import { ListadoAlumnosComponent } from 'src/components/listado-alumnos/listado-alumnos.component';
import { ListadoProfesoresComponent } from 'src/components/listado-profesores/listado-profesores.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'inicio', component: MainPageComponent},
  {path: 'asistente-virtual', component: AsistenteVirtualComponent},
  {path: 'generar-resumen', component: GenerarResumenComponent},
  {path: 'evaluacion-competencias', component: EvaluacionCompetenciasComponent},
  {path: 'seleccionar-alumno', component: SeleccionarAlumnoComponent},
  {path: 'detector-plagios', component: DetectorPlagiosComponent},
  {path: 'chat-pdf', component: ChatPdfComponent},
  {path: 'listado-alumnos', component: ListadoAlumnosComponent},
  {path: 'listado-profesores', component: ListadoProfesoresComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false } ) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
