import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AsistenteService {
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, protected authService: AuthService) {}

  /************ POR DEFECTO ************/

  getRespuestaGeneral(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/av`);
  }

  enviarMensajeGeneral(mensaje: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/avinput`, { content: mensaje, user: this.authService.session });
  }

  getRespuestaProfesor(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/profesor`);
  }

  enviarMensajeProfesor(mensaje: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/profinput`, { content: mensaje, user: this.authService.session });
  }

  /************ INGLÉS ************/

   getRespuestaIngles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ingles`);
  }

  enviarMensajeIngles(mensaje: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/inginput`, { content: mensaje, user: this.authService.session });
  }

  /************ LENGUA ************/

  getRespuestaLengua(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/lengua`);
  }

  enviarMensajeLengua(mensaje: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/leninput`, { content: mensaje, user: this.authService.session });
  }

  /************ HISTORIA ************/

  getRespuestaHistoria(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/historia`);
  }

  enviarMensajeHistoria(mensaje: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/histinput`, { content: mensaje, user: this.authService.session });
  }

  /************ MATEMÁTICAS ************/

  getRespuestaMatematicas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mates`);
  }

  enviarMensajeMatematicas(mensaje: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/matesinput`, { content: mensaje, user: this.authService.session });
  }
}