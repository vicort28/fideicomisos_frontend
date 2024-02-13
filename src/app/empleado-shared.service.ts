import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoSharedService {
  private empleadoKey = 'empleadoSeleccionado';
  private empleadoSeleccionado: any;

  constructor() {

    const storedEmpleado = localStorage.getItem(this.empleadoKey);
    if (storedEmpleado) {
      this.empleadoSeleccionado = JSON.parse(storedEmpleado);
    }
  }

  setEmpleadoSeleccionado(empleado: any) {
    this.empleadoSeleccionado = empleado;
    localStorage.setItem(this.empleadoKey, JSON.stringify(empleado));
  }

  getEmpleadoSeleccionado() {
    return this.empleadoSeleccionado;
  }
}
