import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../empleado.service';
import { Empleado } from '../util/interfaces';

@Component({
  selector: 'app-busqueda-empleado',
  templateUrl: './busqueda-empleado.component.html',
  styleUrls: ['./busqueda-empleado.component.scss']
})
export class BusquedaEmpleadoComponent {
  nombreControl = new FormControl();
  terminoBusqueda: string;
  empleados: any[] = [];

  nuevoEmpleado: Empleado = {
    nombre: '',
    n_empleado:'',
    correo: '',
    domicilio: '',
    unidad: '',
    antiguedad: 0,
    rfc: '',
    curp: '',
    createdAt: '',
    updatedAt: '',
    publishedAt: '',
    apellido_paterno: '',
    apellido_materno: '',
    telefono: '',
    prestamos: [],
    segurosVida: [],
    gastosFunerarios:[]
  };
  
  constructor(private empleadoService: EmpleadoService) {
    this.terminoBusqueda = '';
    this.empleados = [];
  }


  agregarEmpleado() {

    this.empleadoService.guardarNuevoEmpleado(this.nuevoEmpleado).subscribe(
      (response) => {
        console.log('Empleado agregado correctamente:', response);

      },
      (error) => {
        console.error('Error al agregar empleado:', error);
      });
  }
  
}
