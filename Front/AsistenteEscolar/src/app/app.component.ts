import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(protected authService: AuthService, private router: Router){}

  title = 'AsistenteEscolar';

  ngOnInit(){
    this.router.navigate(['/login']);
  }
}
