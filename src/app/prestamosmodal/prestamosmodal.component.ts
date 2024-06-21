import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef  } from '@angular/material/dialog';
import { EmpleadoService } from '../empleado.service';

@Component({
  selector: 'app-prestamosmodal',
  templateUrl: './prestamosmodal.component.html',
  styleUrls: ['./prestamosmodal.component.scss']
})
export class PrestamosmodalComponent {

  prestamos: any[] = [];
  cargando: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<PrestamosmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { empleadoId: number },
    private empleadoService: EmpleadoService
  ) {}


  ngOnInit(): void {
    this.obtenerPrestamos(this.data.empleadoId);
  }


  obtenerPrestamos(empleadoId: number): void {
    this.empleadoService.getPrestamos(empleadoId).subscribe(
      (data: any[]) => {
        this.prestamos = data;
        this.cargando = false;
      },
      (error: any) => {
        console.error('Error al obtener los préstamos:', error);
        this.cargando = false;
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }

}
