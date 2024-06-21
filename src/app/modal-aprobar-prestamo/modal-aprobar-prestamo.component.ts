import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-aprobar-prestamo',
  templateUrl: './modal-aprobar-prestamo.component.html',
})
export class ModalAprobarPrestamoComponent {

  constructor(public dialogRef: MatDialogRef<ModalAprobarPrestamoComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
