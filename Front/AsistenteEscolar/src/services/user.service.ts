import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://localhost:4000/users';

  constructor(private http: HttpClient) {}

  getAlumnos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alumnos`);
  }

  getProfesores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/profesores`);
  }
}