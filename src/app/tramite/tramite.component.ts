import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../empleado.service';
import { EmpleadoSharedService } from '../empleado-shared.service';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../util/interfaces';

@Component({
  selector: 'app-tramite',
  templateUrl: './tramite.component.html',
  styleUrls: ['./tramite.component.scss'],
})
export class TramiteComponent implements OnInit {
  tramiteId!: number;
  formulario1: FormGroup;
  formulario2: FormGroup;
  formulario3: FormGroup;
  empleadoSeleccionado: any;
  empleadoSeleccionadoId!: number;
  listaEmpleados: Empleado[] = [];
  gastosFunerarios: any;  
  opcionesCantidad = ['$5,000.00', '$10,000.00', '$15,000.00', '$20,000.00'];
  opcionesQuincenas = ['24', '48'];
  opcionesParentesco = ['Padre', 'Madre', 'Hijo', 'Esposo'];
  estatusColor: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private empleadoService: EmpleadoService,
    private empleadoSharedService: EmpleadoSharedService,
    private http: HttpClient
  ) {
    this.formulario1 = this.formBuilder.group({
      empleado_id: [''],
      cantidad: [''],  
      quincenas: [''], 
      estatus: ['En proceso'],
    });

    this.formulario2 = this.formBuilder.group({
      empleado_id: [''],
      parentesco: [''],
    });

    this.formulario3 = this.formBuilder.group({
      empleado_id: [''],
      fecha_fallecimiento: [''],
      domicilio: [''],
      telefono: ['', [Validators.pattern(/^\d{7}$/)]],
      beneficiario: [''],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.tramiteId = +params['id'];
      this.empleadoSeleccionado = this.empleadoSharedService.getEmpleadoSeleccionado();

      if (this.empleadoSeleccionado) {
        this.empleadoSeleccionadoId = this.empleadoSeleccionado.id;
        console.log('ID del empleado seleccionado:', this.empleadoSeleccionadoId);

        const datosFormulario1Local = localStorage.getItem('datosFormulario1');
        if (datosFormulario1Local) {
          const datosFormulario1 = JSON.parse(datosFormulario1Local);
          this.formulario1.patchValue({ ...datosFormulario1, empleado_id: this.empleadoSeleccionadoId });
        }

        const datosFormulario2Local = localStorage.getItem('datosFormulario2');
        if (datosFormulario2Local) {
          const datosFormulario2 = JSON.parse(datosFormulario2Local);
          this.formulario2.patchValue({ ...datosFormulario2, empleado_id: this.empleadoSeleccionadoId });
        }

        const datosFormulario3Local = localStorage.getItem('datosFormulario3');
        if (datosFormulario3Local) {
          const datosFormulario3 = JSON.parse(datosFormulario3Local);
          this.formulario3.patchValue({ ...datosFormulario3, empleado_id: this.empleadoSeleccionadoId });
        }
      }
    });
  }

  enviarInfo(url: string, datos: any) {
    this.http.post(url, datos).subscribe(
      (response) => {
        console.log('Datos guardados correctamente:', response);
      },
      (error) => {
        console.error('Error al guardar datos:', error);
      }
    );
  }

  guardarFormulario1() {
    const datosFormulario1 = this.formulario1.value;
    console.log('Datos del formulario1:', datosFormulario1);

    if (!this.empleadoSeleccionadoId) {
        console.error('Falta el ID del empleado en el formulario.');
        return;
    }

    if (!this.formulario1.get('estatus')) {
        this.formulario1.addControl('estatus', new FormControl('por_aprobar'));
    }

    datosFormulario1.empleado_id = this.empleadoSeleccionadoId;

    console.log('Opciones enviadas desde Angular:', datosFormulario1);

    this.empleadoService.guardarDatos(datosFormulario1).subscribe(
        (response) => {
            console.log('Respuesta del servidor:', response);

            const pagoporquincena = parseFloat(datosFormulario1.cantidad.replace('$', '').replace(',', '')) / parseFloat(datosFormulario1.quincenas);
            console.log('Pago por quincena:', pagoporquincena);

            this.formulario1.patchValue({
                estatus: 'aprobado',
            });

            localStorage.setItem('datosFormulario1', JSON.stringify(datosFormulario1));

            this.estatusColor = 'green';
        },
        (error) => {
            console.error('Error en la solicitud:', error);
        }
    );
}

  guardarFormulario3() {
    const datosFormulario3 = this.formulario3.value;

    if (!this.empleadoSeleccionadoId) {
      console.error('Falta el ID del empleado en el formulario.');
      return;
    }

    datosFormulario3.empleado_id = this.empleadoSeleccionadoId;

    this.empleadoService.guardarSeguroVida(datosFormulario3).subscribe(
      (response) => {
        console.log('Seguro de vida registrado correctamente:', response);
      },
      (error) => {
        console.error('Error al registrar seguro de vida:', error);
      }
    );
    localStorage.setItem('datosFormulario3', JSON.stringify(datosFormulario3));
  }

  guardarFormulario2() {
    const datosFormulario2 = this.formulario2.value;

    if (!this.empleadoSeleccionadoId) {
      console.error('Falta el ID del empleado en el formulario.');
      return;
    }

    datosFormulario2.empleado_id = this.empleadoSeleccionadoId;

    this.empleadoService.guardarGastosFunerarios(datosFormulario2).subscribe(
      (response) => {
        console.log('Gastos funerarios registrados correctamente:', response);

        this.empleadoService.getGastosFunerarios(this.empleadoSeleccionadoId).subscribe(
          (gastosFunerarios) => {
            this.gastosFunerarios = gastosFunerarios;
          },
          (error) => {
            console.error('Error al obtener gastos funerarios:', error);
          }
        );
      },
      (error) => {
        console.error('Error al registrar gastos funerarios:', error);
      }
    );
    localStorage.setItem('datosFormulario2', JSON.stringify(datosFormulario2));
  }
}
