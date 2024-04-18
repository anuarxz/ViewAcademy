import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat-pdf',
  templateUrl: './chat-pdf.component.html',
  styleUrls: ['./chat-pdf.component.css']
})
export class ChatPdfComponent {

  public pdfFile: FormGroup | undefined;
  public hasPdf: boolean = false;
  mensaje: any;
  respuesta: any;
  randomId: any;

  constructor(
    protected authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  pdfUploaded: boolean = false;

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

  onSubmit() {
    if (!this.pdfFile) {
      console.error('Debe seleccionar un archivo PDF.');
      return;
    }

    const randomId = this.generateUniqueId(); // Generar el UUID único

    const formData = new FormData();
    formData.append('archivo', this.pdfFile?.get('profile')?.value);
    formData.append('uuid', randomId); // Pasar el UUID en el formulario

    this.http.post("http://localhost:3000/chatpdf", formData).subscribe(
      (response) => {
        console.log('Esta bien: ', response);
        this.pdfUploaded = true;
        this.randomId = randomId; // Guardar el UUID generado
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

  enviarMensaje() {
    if (this.mensaje.trim() !== '') {
      const body = { mensaje: this.mensaje, user: this.authService.session, uuid: this.randomId }; // Utilizar el mismo UUID generado
      this.http.post("http://localhost:3000/chatpdfmensaje", body).subscribe(
        (response: any) => {
          console.log('Respuesta del servidor:', response.respuesta);
          this.respuesta = "<h1 class='fs-4 card-title fw-bold mb-4'>Respuesta:</h1>" + response.respuesta;
        },
        (error) => {
          console.error('Error al enviar la solicitud:', error);
        }
      );
    }
  }
}
