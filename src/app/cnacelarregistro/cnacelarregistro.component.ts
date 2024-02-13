import { Component } from '@angular/core';
import { EmpleadoService } from '../empleado.service'; // Reemplaza 'path-to-your-service' con la ubicación correcta de tu servicio
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cnacelarregistro',
  templateUrl: './cnacelarregistro.component.html',
  styleUrls: ['./cnacelarregistro.component.scss']
})
export class CnacelarregistroComponent {
  searchTerm: string = '';
  selectedEmployee: any;
  empleados: any[] = [];
  empleadosDataSource = new MatTableDataSource<any>();

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe(
      (data) => {
        this.empleadosDataSource.data = data;
        this.empleados = data;
      },
      (error) => {
        console.error('Error al obtener empleados:', error);
      }
    );
  }

  buscarEmpleado() {
    if (this.searchTerm.trim() !== '') {
      const filteredEmployees = this.empleados.filter((empleado) =>
        empleado.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.empleadosDataSource.data = filteredEmployees;
    } else {
      this.empleadosDataSource.data = this.empleados;
    }
  }

  seleccionarEmpleado(empleado: any) {
    this.selectedEmployee = empleado;
  }

  cancelarRegistro() {
    if (this.selectedEmployee) {
      this.empleadoService.eliminarRegistro(this.selectedEmployee.id).subscribe(
        () => {
          console.log('Registro eliminado correctamente.');
         
          this.ngOnInit();
          this.selectedEmployee = null;
        },
        (error) => {
          console.error('Error al eliminar el registro:', error);
        }
      );
    }
  }
}
