import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../empleado.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-actualizar-datos',
  templateUrl: './actualizar-datos.component.html',
  styleUrls: ['./actualizar-datos.component.scss']
})
export class ActualizarDatosComponent implements OnInit {
  updateForm: FormGroup;
  cantidades = ['$5,000.00', '$10,000.00', '$15,000.00', '$20,000.00'];
  quincenas = ['24', '48'];

  constructor(
    public dialogRef: MatDialogRef<ActualizarDatosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private empleadoService: EmpleadoService,
    private snackBar: MatSnackBar,
  ) {
    this.updateForm = this.formBuilder.group({
      cantidad: [data.prestamo?.cantidad, Validators.required],
      quincenas: [data.prestamo?.quincenas, Validators.required],
    });
  }

  ngOnInit(): void {
    console.log('Empleado data:', this.data.empleado);
    console.log('Prestamo data:', this.data.prestamo);
  }

  actualizarPrestamo(): void {
    if (this.updateForm.valid) {
      const prestamoId = this.data.prestamo.id;
      console.log('Prestamo ID:', prestamoId);
      this.empleadoService.actualizarPrestamo(prestamoId, this.updateForm.value).subscribe(
        (response) => {
          console.log('Préstamo actualizado:', response);
          this.dialogRef.close(true);
          window.location.reload();
          this.snackBar.open('Registro Actualizado exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'snackbar-custom'
          });
         

        },
        (error) => {
          console.error('Error al actualizar el préstamo:', error);
        }
      );
    }
  }
  

  close(): void {
    this.dialogRef.close();
  }
}
