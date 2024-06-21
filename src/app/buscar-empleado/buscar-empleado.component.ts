import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoApiService } from '../empleado-api.service';

@Component({
  selector: 'app-buscar-empleado',
  templateUrl: './buscar-empleado.component.html',
  styleUrls: ['./buscar-empleado.component.scss'] 
})
export class BuscarEmpleadoComponent {
  buscarForm: FormGroup;
  resultados: any;
  error: string | null = null;

  constructor(private fb: FormBuilder, private empleadoApiService: EmpleadoApiService) {
    this.buscarForm = this.fb.group({
      nombreCompleto: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.buscarForm.valid) {
      const nombreCompleto = this.buscarForm.value.nombreCompleto;
      this.empleadoApiService.buscarEmpleadoPorNombreCompleto(nombreCompleto).subscribe(
        data => {
          this.resultados = data;
          this.error = null;
        },
        error => {
          this.error = 'Error al realizar la búsqueda. Por favor, inténtelo de nuevo.';
          console.error(error);
        }
      );
    }
  }
}
