import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from 'src/services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

@Component({
  selector: 'app-detector-plagios',
  templateUrl: './detector-plagios.component.html',
  styleUrls: ['./detector-plagios.component.css']
})

export class DetectorPlagiosComponent implements OnInit {
  public pdfFile1: FormGroup | undefined;
  public pdfFile2: FormGroup | undefined;
  public hasPdf1: boolean = false;
  public hasPdf2: boolean = false;
  public pdfUploaded: boolean = false;
  public plagioResult: string | undefined;
  public filesSelected: boolean = false; // Nueva propiedad

  respuesta: any;

  constructor(
    protected authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.pdfFile1 = this.formBuilder.group({
      profile: ['']
    });

    this.pdfFile2 = this.formBuilder.group({
      profile: ['']
    });
  }

  onSubmit() {
    if (!this.pdfFile1?.get('profile')?.value || !this.pdfFile2?.get('profile')?.value) {
      console.error('Debe seleccionar ambos archivos PDF.');
      return;
    }
  
    const formData = new FormData();
    formData.append('archivo1', this.pdfFile1?.get('profile')?.value, this.pdfFile1?.get('profile')?.value.name);
    formData.append('archivo2', this.pdfFile2?.get('profile')?.value, this.pdfFile2?.get('profile')?.value.name);
    formData.append('user', this.authService.session);
  
    this.http.post<any>("http://127.0.0.1:8000/plagio", formData).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        if (response && response.resultado_plagio) {
          this.pdfUploaded = true;
          this.plagioResult = "<h1 class='fs-4 card-title fw-bold mb-4'>Respuesta:</h1>" + response.resultado_plagio;
        } else {
          console.error('La respuesta del servidor no contiene el resultado esperado.');
        }
      },
      (error) => {
        console.error('Error al enviar archivos al servidor:', error);
      }
    );
  }
  

  onFileSelected1(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.pdfFile1?.get('profile')?.setValue(fileList[0]);
      console.log(this.pdfFile1?.get('profile')?.value);
      this.hasPdf1 = true;
      this.checkFilesSelected(); // Llamada para verificar si se seleccionaron ambos archivos
    }
    event.preventDefault();
  }

  onFileSelected2(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.pdfFile2?.get('profile')?.setValue(fileList[0]);
      console.log(this.pdfFile2?.get('profile')?.value);
      this.hasPdf2 = true;
      this.checkFilesSelected(); // Llamada para verificar si se seleccionaron ambos archivos
    }
    event.preventDefault();
  }

  checkFilesSelected() {
    this.filesSelected = this.hasPdf1 && this.hasPdf2;
  }
}
