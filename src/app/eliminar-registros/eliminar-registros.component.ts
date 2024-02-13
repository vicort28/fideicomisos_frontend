import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../empleado.service';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-eliminar-registros',
  templateUrl: './eliminar-registros.component.html',
  styleUrls: ['./eliminar-registros.component.scss']
})
export class EliminarRegistrosComponent implements OnInit {
  empleadosConRegistros: any[] = [];
  dataSource = new MatTableDataSource<any>();
  empleadoSeleccionado: any;
  prestamosDataSource = new MatTableDataSource<any>();
  segurosVidaDataSource = new MatTableDataSource<any>();
  empleadosDataSource = new MatTableDataSource<any>();
  displayedColumnsEmpleado: string[] = ['nombre', 'apellido_paterno', 'apellido_materno'];
  displayedColumns: string[] = ['cantidad1', 'cantidad2', 'quincenas', 'acciones'];
  displayedColumnsSegurosVida: string[] = ['fecha_fallecimiento', 'domicilio', 'telefono', 'beneficiario', 'acciones'];

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit() {
    this.empleadoService.getEmpleadosConRegistros().subscribe(
      (data) => {
        this.empleadosConRegistros = data;
        this.empleadosDataSource.data = this.empleadosConRegistros;
      },
      (error) => {
        console.error('Error al obtener empleados con registros:', error);
      }
    );
  }

  eliminarRegistro(registroId: number, tipoRegistro: 'prestamo' | 'seguroVida') {
    let servicioEliminar;

    if (tipoRegistro === 'prestamo') {
      servicioEliminar = this.empleadoService.eliminarRegistroPrestamo(registroId);
    } else if (tipoRegistro === 'seguroVida') {
      servicioEliminar = this.empleadoService.eliminarRegistroSeguroVida(registroId);
    } else {
      console.error('Tipo de registro no válido');
      return;
    }

    servicioEliminar.subscribe(
      () => {
        
        this.empleadosDataSource.data.forEach(empleado => {
          if (tipoRegistro === 'prestamo') {
            empleado.prestamos = empleado.prestamos.filter((p: { id: number; }) => p.id !== registroId);
          } else if (tipoRegistro === 'seguroVida') {
            empleado.segurosVida = empleado.segurosVida.filter((s: { id: number; }) => s.id !== registroId);
          }
        });
      },
      (error) => {
        console.error(`Error al eliminar el registro de ${tipoRegistro}:`, error);
      }
    );
  }

  aplicarFiltro(event: Event, columna: string) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.empleadosDataSource.filterPredicate = this.crearFiltro(columna);
    this.empleadosDataSource.filter = filtro;
  }

  private crearFiltro(columna: string): (data: any, filter: string) => boolean {
    return (data: any, filter: string) => {
      const value = data[columna];
      return value ? value.toLowerCase().includes(filter) : false;
    };
  }

  deseleccionarEmpleado() {
    this.empleadoSeleccionado = null;
  }

  seleccionarEmpleado(empleado: any) {
    this.empleadoSeleccionado = empleado;
    this.segurosVidaDataSource.data = empleado.segurosVida?.length ? empleado.segurosVida : [];
    this.prestamosDataSource.data = empleado.prestamos?.length ? empleado.prestamos : [];
  }

  
}
