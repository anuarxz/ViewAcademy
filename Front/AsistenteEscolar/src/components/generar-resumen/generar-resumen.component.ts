import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-generar-resumen',
  templateUrl: './generar-resumen.component.html',
  styleUrls: ['./generar-resumen.component.css']
})
export class GenerarResumenComponent {
  public pdfFile: FormGroup | undefined;
  public hasPdf: boolean = false;
  public mensaje: any;
  public respuesta: any;
  public pdfUploaded: boolean = false;

  constructor(protected authService: AuthService, private apiService: ApiService, private readonly formBuilder: FormBuilder, private http: HttpClient){ }

  ngOnInit() {
    this.pdfFile = this.formBuilder.group({
      profile: ['']
    });
  }

  generateUniqueId() {
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substr(2, 5);
    return `${timestamp}-${randomString}`;
  }
  
  onSubmit(){
    if (!this.pdfFile) {
      console.error('Debe seleccionar un archivo PDF.');
      return;
    }

    const randomId = this.generateUniqueId();

    const formData = new FormData();
    formData.append('archivo', this.pdfFile?.get('profile')?.value);
    formData.append('user', this.authService.session);
    formData.append('id', randomId); // Agregar el ID aleatorio al formulario

    this.http.post<any>("http://localhost:3000/resumen", formData).subscribe(
      (response: any) => {
        this.respuesta = response.respuesta;
        this.pdfUploaded = true;
      },
      (error) => {
        console.error('Error al enviar datos al servidor:', error);
      }
    );
  }

  onFileSelected(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.pdfFile?.get('profile')?.setValue(fileList[0]);
      console.log(this.pdfFile?.get('profile')?.value);
      this.hasPdf = true;
    }
    event.preventDefault();
  }

  // Función para descargar el PDF
  downloadPdf() {
    const options = {
      margin: 1,
      filename: 'GenerarResumenViewAcademy.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf()
      .from(this.respuesta)
      .set(options)
      .save();
  }
}
