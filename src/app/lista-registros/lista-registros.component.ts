
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmpleadoService } from '../empleado.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal-component/modal-component.component';

@Component({
  selector: 'app-lista-registros',
  templateUrl: './lista-registros.component.html',
  styleUrls: ['./lista-registros.component.scss']
})
export class ListaRegistrosComponent implements OnInit {
  @Output() prestamoAprobado = new EventEmitter<any>();
  empleados: any[] = [];
  empleadosConRegistros: any[] = [];
  empleadoSeleccionado: any;
  prestamosDataSource = new MatTableDataSource<any>();
  segurosVidaDataSource = new MatTableDataSource<any>();
  empleadosDataSource = new MatTableDataSource<any>();
  estatusColor: string = 'black';
  

  displayedColumnsEmpleado: string[] = ['nombre', 'apellido_paterno', 'apellido_materno'];
  displayedColumns: string[] = ['cantidad', 'quincenas', 'autorizar'];
  displayedColumnsSegurosVida: string[] = ['fecha_fallecimiento', 'domicilio', 'telefono', 'beneficiario'];


  constructor(private empleadoService: EmpleadoService, private router: Router, private dialog: MatDialog) {
    this.prestamosDataSource = new MatTableDataSource<any>();
    this.segurosVidaDataSource = new MatTableDataSource<any>();
    this.empleadosDataSource = new MatTableDataSource<any>();
  }

  ngOnInit() {
    this.empleadoService.getEmpleadosConRegistros().subscribe(
      (data) => {
        this.empleadosDataSource.data = data;
      },
      (error) => {
        console.error('Error al obtener empleados con registros:', error);
      }
    );
  }

  obtenerDetallesPrestamo(registroId: number) {
    this.empleadoService.obtenerDetallesPrestamo(registroId).subscribe(
      (detalles) => {

      },
      (error) => {
        console.error('Error al obtener detalles del préstamo:', error);
      }
    );
  }

  getDetallesSeguroVida(registroId: number) {
    this.empleadoService.getSegurosVida(registroId).subscribe(
      (detalles) => {

      },
      (error) => {
        console.error('Error al obtener detalles del seguro de vida:', error);
      }
    );
  }

  seleccionarEmpleado(empleado: any) {
    forkJoin([
      this.empleadoService.getSegurosVida(empleado.id),
      this.empleadoService.getPrestamos(empleado.id)
    ]).subscribe(
      ([segurosVida, prestamos]) => {
        const dialogRef = this.dialog.open(ModalComponent, {
          width: '800px',
          data: { empleado, segurosVida, prestamos }
        });
  
        dialogRef.afterClosed().subscribe(result => {
          console.log('Modal cerrado');
          this.cerrarModal();
        });
      },
      error => {
        console.error('Error al obtener detalles:', error);
        const dialogRef = this.dialog.open(ModalComponent, {
          width: '800px',
          data: { empleado }
        });
  
        dialogRef.afterClosed().subscribe(result => {
          console.log('Modal cerrado');
          this.cerrarModal();
        });
      }
    );
  }
  
  
  
  
  
  

  cerrarModal(): void {
    
  }

  abrirModal(empleadoSeleccionado: any): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '600px',
      data: {
        prestamosDataSource: this.prestamosDataSource,
        segurosVidaDataSource: this.segurosVidaDataSource,
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal cerrado con resultado:', result);
    });
  }
  
  

  

  deseleccionarEmpleado() {
    this.empleadoSeleccionado = null;
  }

  private crearFiltro(columna: string): (data: any, filter: string) => boolean {
    return (data: any, filter: string) => {
      const value = data[columna];
      return value ? value.toLowerCase().includes(filter) : false;
    };
  }

  aplicarFiltro(event: Event, columna: string) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.empleadosDataSource.filterPredicate = this.crearFiltro(columna);
    this.empleadosDataSource.filter = filtro;
  }

  autorizarPrestamo(prestamo: any) {
    const empleadoId = this.empleadoSeleccionado.id;
  
    prestamo.estatus = 'aprobado';
    this.estatusColor = 'green';
  
    this.empleadoService.aprobarPrestamo(prestamo.id).subscribe(
      (response) => {
        prestamo.estatus = 'aceptado';
        this.router.navigate(['/aprobacion-prestamo']);
      },
      (error) => {
        console.error('Error al aprobar el préstamo:', error);
      }
    );
  }
}