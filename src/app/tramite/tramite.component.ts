import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { EmpleadoService } from '../empleado.service';
import { EmpleadoSharedService } from '../empleado-shared.service';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../util/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PrestamosmodalComponent } from '../prestamosmodal/prestamosmodal.component';


@Component({
  selector: 'app-tramite',
  templateUrl: './tramite.component.html',
  styleUrls: ['./tramite.component.scss'],
})
export class TramiteComponent implements OnInit {
  tramiteId!: number;
  empleado: any;
  formulario1: FormGroup;
  formulario2: FormGroup;
  empleadoId!: number;
  formulario3: FormGroup;
  empleadoSeleccionado: any;
  empleadoSeleccionadoId!: number;
  listaEmpleados: Empleado[] = [];
  gastosFunerarios: any;  
  opcionesCantidad = ['$5,000.00', '$10,000.00', '$15,000.00', '$20,000.00'];
  opcionesQuincenas = ['24', '48'];
  opcionesParentesco = ['Padre', 'Madre', 'Hijo', 'Esposo'];
  estatusColor: string | undefined;
  prestamos: any;
  prestamosKeys: string[] = [];
  tienePrestamo: boolean = false;
  tieneSeguroVida: boolean = false;
  tieneGastosFunerarios: boolean = false;

  constructor(
    
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private empleadoService: EmpleadoService,
    private empleadoSharedService: EmpleadoSharedService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {

    
    this.formulario1 = this.formBuilder.group({
      empleado_id: [''],
      cantidad: [''],  
      quincenas: [''], 
      estatus: ['En proceso'],
    });


    this.formulario2 = this.formBuilder.group({
       empleado_id: [''],
        padre: [false],
        madre: [false],
        hijo: [false],
        esposo: [false]
      });
    
    
    this.formulario3 = this.formBuilder.group({
      empleado_id: [''],
      fecha_fallecimiento: [''],
      domicilio: [''],
      telefono: ['', [Validators.pattern(/^\d{7}$/)]],
      beneficiario: [''],
    });

    
  this.formulario3 = new FormGroup({
    empleado_id: new FormControl(''),
    fecha_fallecimiento: new FormControl('', [Validators.required]),
    domicilio: new FormControl('', [Validators.required, Validators.maxLength(25)]), 
    telefono: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(10), Validators.minLength(10)]),
    beneficiario: new FormControl('', [Validators.required, Validators.maxLength(25)]), 
  })
    
  }



  ngOnInit() {
    
    this.route.params.subscribe((params) => {
      this.tramiteId = +params['id'];
      this.empleadoSeleccionado = this.empleadoSharedService.getEmpleadoSeleccionado();
  
      if (this.empleadoSeleccionado) {
        this.empleadoSeleccionadoId = this.empleadoSeleccionado.id;
        console.log('ID del empleado seleccionado:', this.empleadoSeleccionadoId);
  
        this.formulario1.patchValue({ empleado_id: this.empleadoSeleccionadoId });
  
        this.formulario2.patchValue({ empleado_id: this.empleadoSeleccionadoId });
  
        this.formulario3.patchValue({ empleado_id: this.empleadoSeleccionadoId });

        this.verificarRegistros();
      }
    });

    this.obtenerPrestamos();
  }



  verificarRegistros(): void {
    this.verificarPrestamo();
    this.verificarSeguroVida();
    this.verificarGastosFunerarios();
  }


  verificarPrestamo(): void{
    this.empleadoService.getPrestamos(this.empleadoSeleccionadoId).subscribe(
      (data:any) =>{
        this.tienePrestamo = !!data;
        if (this.tienePrestamo){
          this.formulario1.disable();
        }
      },
      (error:any) => {
        console.error('Error al obtener el prestamo', error)
      }
    )
  }

  verificarSeguroVida(): void {
    this.empleadoService.getSegurosVida(this.empleadoSeleccionadoId).subscribe(
      (data: any) => {
        this.tieneSeguroVida = !!data;
        if (this.tieneSeguroVida) {
          this.formulario3.disable();
        }
      },
      (error: any) => {
        console.error('Error al obtener el seguro de vida:', error);
      }
    );
  }

  verificarGastosFunerarios(): void {
    this.empleadoService.getGastosFunerarios(this.empleadoSeleccionadoId).subscribe(
      (data: any) => {
        this.tieneGastosFunerarios = !!data;
        if (this.tieneGastosFunerarios) {
          this.formulario2.disable();
        }
      },
      (error: any) => {
        console.error('Error al obtener los gastos funerarios:', error);
      }
    );
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
    if (this.formulario1.disabled) {
      return;
    }

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
    this.empleadoService.guardarDatos(datosFormulario1).subscribe(
      (response) => {
        const pagoporquincena = parseFloat(datosFormulario1.cantidad.replace('$', '').replace(',', '')) / parseFloat(datosFormulario1.quincenas);
        this.formulario1.patchValue({ estatus: 'aprobado' });
        this.estatusColor = 'green';
        window.location.reload();
        this.snackBar.open('Registro de préstamo guardado exitosamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass:'snackbar-custom',
        });
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }


obtenerPrestamos(): void {
  this.empleadoService.getPrestamos(this.empleadoSeleccionadoId).subscribe(
    (data: any[]) => {
      this.prestamos = data;
    },
    (error: any) => {
      console.error('Error al obtener los préstamos:', error);
    }
  );
}


guardarFormulario3() {
  if (this.formulario3.disabled) {
    return;
  }

  const datosFormulario3 = this.formulario3.value;
  if (!this.empleadoSeleccionadoId) {
    console.error('Falta el ID del empleado en el formulario.');
    return;
  }
  if (this.formulario3.invalid) {
    this.snackBar.open('Por favor, completa todos los campos correctamente', 'Cerrar', {
      duration: 3000, 
      horizontalPosition: 'end', 
      verticalPosition: 'top',
      panelClass: ['snackbar-custom' ]
    });
    return; 
  }
  datosFormulario3.empleado_id = this.empleadoSeleccionadoId;
  this.empleadoService.guardarSeguroVida(datosFormulario3).subscribe(
    (response) => {
      console.log('Seguro de vida registrado correctamente:', response);
      window.location.reload();
      this.snackBar.open('Registro de seguro de vida guardado exitosamente', 'Cerrar', {
        duration: 4000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
    },
    (error) => {
      console.error('Error al registrar seguro de vida:', error);
    }
  );
}

  guardarGastosFunerarios() {
    if (this.formulario2.disabled) {
      return;
    }

    const datosFormulario2 = this.formulario2.value;
    const empleadoId = this.empleadoSeleccionadoId;
    if (!empleadoId) {
      console.error('Falta el ID del empleado en el formulario.');
      return;
    }
    window.location.reload();
    this.empleadoService.guardarGastosFunerarios(datosFormulario2).subscribe(
      (response) => {
        console.log('Gastos funerarios guardados correctamente:', response);
        window.location.reload();
        this.snackBar.open('Registro de gastos funerarios guardado exitosamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-custom']
        });
      },
      (error) => {
        console.error('Error al guardar los gastos funerarios:', error);
      }
    );
  }

  validacion_formulario_seguro_vida(campo: string): boolean {
    const control = this.formulario3.get(campo);
    return !!control && (control.hasError('maxlength') || control.hasError('pattern') || control.hasError('minlength'))  && (control.dirty || control.touched);
  }
  
  
  openModal(): void {
    if (!this.empleadoSeleccionadoId) {
      console.error('Falta el ID del empleado.');
      return;
    }
  
    this.dialog.open(PrestamosmodalComponent, {
      width: '400px',
      data: { empleadoId: this.empleadoSeleccionadoId }
    });
  }
  
  

} 
