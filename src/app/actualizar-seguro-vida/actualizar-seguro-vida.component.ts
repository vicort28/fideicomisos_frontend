import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpleadoService } from '../empleado.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-actualizar-seguro-vida',
  templateUrl: './actualizar-seguro-vida.component.html',
  styleUrls: ['./actualizar-seguro-vida.component.scss']
})
export class ActualizarSeguroVidaComponent implements OnInit {
  updateForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ActualizarSeguroVidaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private empleadoService: EmpleadoService,
    private snackBar: MatSnackBar,
  ) {
    this.updateForm = this.formBuilder.group({
      fecha_fallecimiento: [data.seguroVida.fecha_fallecimiento, Validators.required],
      domicilio: [data.seguroVida.domicilio, Validators.required, Validators.maxLength(25)],
      telefono: [data.seguroVida.telefono, Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(10), Validators.minLength(10)],
      beneficiario: [data.seguroVida.beneficiario, Validators.required, Validators.maxLength(25)]
    });
  }

  ngOnInit(): void {}

  actualizarSeguroVida(): void {
    if (this.updateForm.valid) {
      const seguroVidaId = this.data.seguroVida.id;
      this.empleadoService.actualizarSeguroVida(seguroVidaId, this.updateForm.value).subscribe(
        (response) => {
          console.log('Seguro de vida actualizado:', response);
          this.dialogRef.close(true);
          this.snackBar.open('Registro Actualizado exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'snackbar-custom'
          });
          window.location.reload();

        },
        (error) => {
          console.error('Error al actualizar el seguro de vida:', error);
        }
      );
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  validacion_formulario_seguro_vida(campo: string): boolean {
    const control = this.updateForm.get(campo);
    return !!control && (control.hasError('maxlength') || control.hasError('pattern') || control.hasError('minlength'))  && (control.dirty || control.touched);
  }
  
}
