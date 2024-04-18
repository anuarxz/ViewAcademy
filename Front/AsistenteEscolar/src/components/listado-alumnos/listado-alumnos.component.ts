import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-listado-alumnos',
  templateUrl: './listado-alumnos.component.html',
  styleUrls: ['./listado-alumnos.component.css'],
})
export class ListadoAlumnosComponent {
  alumnos: any[] = [];

  constructor(
    protected authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.obtenerAlumnos();
  }

  obtenerAlumnos() {
    this.userService.getAlumnos().subscribe((data: any[]) => {
      this.alumnos = data;
    });
  }
}
