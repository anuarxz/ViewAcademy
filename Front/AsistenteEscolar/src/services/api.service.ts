import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  loginUser(user: IUser): Observable<any> {
    return this.http.post<any>('http://localhost:4000/users/login', user);
  }

  uploadPdf(pdfFile: FormData): Observable<any> {
    console.log(pdfFile);
    return this.http.post(this.url+'/upresumen', pdfFile);
  }
}
