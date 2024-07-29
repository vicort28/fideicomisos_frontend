import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmpleadoApiService } from '../empleado-api.service';
import { DetalleEmpleadoComponent } from '../detalle-empleado/detalle-empleado.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-buscar-empleado',
  templateUrl: './buscar-empleado.component.html',
  styleUrls: ['./buscar-empleado.component.scss']
})
export class BuscarEmpleadoComponent implements OnInit {
  buscarForm: FormGroup;
  error: string | null = null;
  displayedColumns: string[] = ['nombres', 'apellidoPaterno', 'apellidoMaterno', 'acciones'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(); 
  datos: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private empleadoApiService: EmpleadoApiService, public dialog: MatDialog) {
    this.buscarForm = this.fb.group({
      nombreCompleto: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSubmit(): void {
    if (this.buscarForm.valid) {
      const nombreCompleto = this.buscarForm.value.nombreCompleto;
      this.empleadoApiService.buscarEmpleadoPorNombreCompleto(nombreCompleto).subscribe(
        data => {
          this.datos = data;
          this.dataSource.data = this.datos;
          this.dataSource.paginator = this.paginator; // Asegúrate de que el paginador vuelva a la primera página
          this.error = null;
        },
        error => {
          this.error = 'Error al realizar la búsqueda. Por favor, inténtelo de nuevo.';
          console.error(error);
        }
      );
    }
  }

  abrirDetalle(empleado: any): void {
    this.dialog.open(DetalleEmpleadoComponent, {
      data: { empleado }
    });
  }
}
