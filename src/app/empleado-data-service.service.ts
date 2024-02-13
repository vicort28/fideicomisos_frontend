import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoDataService {
  private empleados: any[] = [];

  agregarEmpleado(empleado: any) {
    this.empleados.push(empleado);
  }

  obtenerEmpleados(): any[] {
    return this.empleados;
  }
}
