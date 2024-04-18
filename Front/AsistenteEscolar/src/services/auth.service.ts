import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../models/usuario';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  session: any = null;
  rol: string = 'sin_rol';
  errorMessageEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router, private apiService: ApiService) {}

  login(user: IUser, errorMessage: string, isLoading: boolean) {
    isLoading = true;
    this.apiService.loginUser(user).subscribe(
      (response) => {
        this.rol = response.rol_usuario;
        this.session = user.email;
        this.router.navigate(['/inicio']);
        isLoading = false;
      },
      (error) => {
        this.errorMessageEmitter.emit('Error al iniciar sesión');
        console.error(error);
        isLoading = false;
      }
    );
  }

  logout() {
    this.session = null;
    alert('Se ha cerrado correctamente la sesión');
    this.router.navigate(['/login']);
  }

  goToMainPage() {
    this.router.navigate(['/inicio']);
  }
}
