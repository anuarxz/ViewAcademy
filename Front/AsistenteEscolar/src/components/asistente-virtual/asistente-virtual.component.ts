import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AsistenteService } from 'src/services/asistente.service';
import { Observable } from 'rxjs';
declare var showdown: any;
@Component({
  selector: 'app-asistente-virtual',
  templateUrl: './asistente-virtual.component.html',
  styleUrls: ['./asistente-virtual.component.css'],
})
export class AsistenteVirtualComponent {
  respuesta: string = '';
  respuestas: string[] = [];

  mensaje: string = '';
  mensajes: string[] = [];

  prompt: string = '';

  isLoading: boolean = true;

  constructor(
    protected authService: AuthService,
    private asistenteService: AsistenteService
  ) {}

  ngOnInit() {
    if (this.authService.rol === 'alumno') {
      this.prompt = 'General';
      this.getRespuesta(this.asistenteService.getRespuestaGeneral());
    } else if (this.authService.rol === 'profesor') {
      this.prompt = 'Profesor';
      this.getRespuesta(this.asistenteService.getRespuestaProfesor());
    }
  }

  enviarMensaje(mensaje: string) {
    if (this.prompt == 'General') {
      this.setRespuesta(this.asistenteService.enviarMensajeGeneral(mensaje));
    } else if (this.prompt == 'Profesor') {
      this.setRespuesta(this.asistenteService.enviarMensajeProfesor(mensaje));
    } else if (this.prompt == 'Ingles') {
      this.setRespuesta(this.asistenteService.enviarMensajeIngles(mensaje));
    } else if (this.prompt == 'Lengua') {
      this.setRespuesta(this.asistenteService.enviarMensajeLengua(mensaje));
    } else if (this.prompt == 'Historia') {
      this.setRespuesta(this.asistenteService.enviarMensajeHistoria(mensaje));
    } else if (this.prompt == 'Mates') {
      this.setRespuesta(
        this.asistenteService.enviarMensajeMatematicas(mensaje)
      );
    }
  }

  getRespuesta(metodo: Observable<any>) {
    metodo.subscribe((data: any[]) => {
      this.respuesta = JSON.stringify(data);
      // Convertir el string en un objeto JavaScript
      let responseObject = JSON.parse(JSON.stringify(data));
      // Obtener el mensaje de respuesta
      let respuesta = responseObject.respuesta;
      // Ahora `respuesta` contiene el mensaje de respuesta
      this.respuesta = this.interpretarTexto(respuesta);
      console.log(this.respuesta);
      this.isLoading = false;
    });
  }

  setRespuesta(metodo: Observable<any>) {
    if (this.mensaje.trim() !== '') {
      this.isLoading = true;
      this.mensajes.push(this.mensaje);

      // Llamar al servicio para enviar el mensaje
      metodo.subscribe(
        (response: any) => {
          console.log('Respuesta del servidor:', response);
          this.respuestas.push(this.interpretarTexto(response.respuesta.substring(4)));
          this.isLoading = false;
        },
        (error) => {
          console.error('Error al enviar la solicitud:', error);
          this.isLoading = false;
        }
      );

      this.mensaje = ''; // Limpiar el textarea después de enviar el mensaje
    }
  }

  promptGeneral() {
    this.isLoading = true;
    this.prompt = 'General';
    this.vaciarChat();
    this.getRespuesta(this.asistenteService.getRespuestaGeneral());
  }

  promptIngles() {
    this.isLoading = true;
    this.prompt = 'Ingles';
    this.vaciarChat();
    this.getRespuesta(this.asistenteService.getRespuestaIngles());
  }

  promptLengua() {
    this.isLoading = true;
    this.prompt = 'Lengua';
    this.vaciarChat();
    this.getRespuesta(this.asistenteService.getRespuestaLengua());
  }

  promptHistoria() {
    this.isLoading = true;
    this.prompt = 'Historia';
    this.vaciarChat();
    this.getRespuesta(this.asistenteService.getRespuestaHistoria());
  }

  promptMatematicas() {
    this.isLoading = true;
    this.prompt = 'Mates';
    this.vaciarChat();
    this.getRespuesta(this.asistenteService.getRespuestaMatematicas());
  }

  vaciarChat() {
    this.respuesta = '';
    this.respuestas = [];
    this.mensaje = '';
    this.mensajes = [];
  }

  handleEnterKey(event: KeyboardEvent) {
    if (event.key === 'Enter' && !this.isLoading) {
      // Aquí llamas al método que deseas ejecutar
      this.enviarMensaje(this.mensaje);
      // Evitar el comportamiento por defecto de la tecla "Enter" en el textarea (salto de línea)
      event.preventDefault();
    }
  }

  interpretarTexto(respuesta: string) {
    // Convertir Markdown a HTML
    let converter = new showdown.Converter(),
      html = converter.makeHtml(respuesta);
    return html;
  }
}
