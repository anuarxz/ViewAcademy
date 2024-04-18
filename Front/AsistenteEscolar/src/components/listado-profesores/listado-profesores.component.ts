import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-listado-profesores',
  templateUrl: './listado-profesores.component.html',
  styleUrls: ['./listado-profesores.component.css']
})
export class ListadoProfesoresComponent {
  profesores: any[] = [];

  constructor(
    protected authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.obtenerProfesores();
  }

  obtenerProfesores() {
    this.userService.getProfesores().subscribe((data: any[]) => {
      this.profesores = data;
    });
  }
}
