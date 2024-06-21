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
  //ejemploo
  formulario_indicadores_asuntos_internos = new FormGroup({
    no_quejas_observaciones_dh_recibidas:new FormControl('', [Validators.required, Validators.maxLength(100)])
  })

  constructor(private empleadoService: EmpleadoService) {
    this.terminoBusqueda = '';
    this.empleados = [];
  }


  agregarEmpleado() {
    // if(this.formulario_indicadores_asuntos_internos.valid){

    // }else{
    //   this.showWarn()
    //   this.formulario_indicadores_asuntos_internos.markAllAsTouched();
    // }
    this.empleadoService.guardarNuevoEmpleado(this.nuevoEmpleado).subscribe(
      (response) => {
        console.log('Empleado agregado correctamente:', response);

      },
      (error) => {
        console.error('Error al agregar empleado:', error);
      });
  }
  // showWarn() {
  //   this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'No valido' });
  // }
  //ejemploo
  validacion_formulario_asuntos_internos(campo:any, tipo_validacion:any) {
    return this.formulario_indicadores_asuntos_internos.get(`${campo}`)?.errors?.[tipo_validacion]
      &&
      (this.formulario_indicadores_asuntos_internos.get(`${campo}`)?.dirty
      ||
    this.formulario_indicadores_asuntos_internos.get(`${campo}`)?.touched
    );
  }
}
