import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmpleadoService } from '../empleado.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router'; 
import { EmpleadoSharedService } from '../empleado-shared.service';
import { SelectionModel } from '@angular/cdk/collections';
import { jsPDF } from "jspdf"


@Component({
  selector: 'app-tabla-empleado',
  templateUrl: './tabla-empleado.component.html',
  styleUrls: ['./tabla-empleado.component.scss']
})
export class TablaEmpleadoComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(); 
  displayedColumns: string[] = [
    'id',
    'nombre',
    'n_empleado',
    'apellido_paterno',
    'apellido_materno',
    'telefono',
    'domicilio',
    'correo',
    'unidad',
    'antiguedad',
    'rfc',
    'curp',
    'seleccion', 
  ];

  columnas: { [key: string]: string } = {
    'id': 'No. registro',
    'nombre': 'Nombre',
    'n_empleado': 'Número de empleado',
    'apellido_paterno': 'Apellido Paterno',
    'apellido_materno': 'Apellido Materno',
    'telefono': 'Teléfono',
    'domicilio': 'Domicilio',
    'correo': 'Correo',
    'unidad': 'Unidad',
    'antiguedad': 'Antigüedad',
    'rfc': 'RFC',
    'curp': 'CURP',
  };

  datos: any[] = [];
  empleados: any[] = [];
  empleadosSeleccionados: any[] = []; 
  selection = new SelectionModel<any>(true, []);
  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private EmpleadoService: EmpleadoService, 
    private elementRef: ElementRef,
    private router: Router, 
    private empleadoSharedService: EmpleadoSharedService
  ) { }

  ngOnInit() {
    this.getEmpleados();
  }

  getEmpleados() {
    this.EmpleadoService.getEmpleados().subscribe(
      data => {
        this.datos = data;
        this.dataSource.data = this.datos;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.empleados = data;
      },
      error => {
        console.error('Error en la solicitud:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  verDetalle(empleado: any) {
    this.router.navigate(['/tramite', empleado.id]);
    this.empleadoSharedService.setEmpleadoSeleccionado(empleado);
  }

// Funciones para la gestión de la selección

masterToggle() {
  this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
}

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  toggleSelection(row: any) {
    this.selection.toggle(row);
  }


  generatePDF() {
    const selectedEmployees = this.selection.selected;
  
    if (selectedEmployees.length === 0) {
      alert('Selecciona al menos un empleado para generar el PDF.');
      return;
    }
  
    const pdf = new jsPDF();
    pdf.text('', 5, 5);
  
    const listStartY = 70;
    const lineHeight = 10;
    let currentY = listStartY;
  
    pdf.setFontSize(10);

    selectedEmployees.forEach((empleado, index) => {
      const fullName = `${empleado.apellido_paterno} ${empleado.apellido_materno}, ${empleado.nombre}                 ______________                 ______________`;
      pdf.text(fullName , 5, currentY + index * lineHeight);
    });
  
    pdf.save('BONO_DEL_DIA_DE_POLICIA.pdf');
  } 



}
