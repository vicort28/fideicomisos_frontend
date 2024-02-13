import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'fidecomisos';

  
  constructor(public router: Router) { }


  prestamoAprobadoHandler(prestamo: any) {
    console.log('Préstamo aprobado en el componente principal:', prestamo);

  }
}
