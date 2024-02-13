import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from '../empleado.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-aprobacion-prestamo',
  templateUrl: './aprobacion-prestamo.component.html',
  styleUrls: ['./aprobacion-prestamo.component.scss'],
})
export class AprobacionPrestamoComponent implements OnInit {
  empleado: any;  
  prestamoAprobadoDataSource = new MatTableDataSource<any>(); 
  displayedColumns: string[] = ['nombre_empleado', 'apellido_paterno_empleado', 'apellido_materno_empleado', 'cantidad', 'quincenas'];

  constructor(
    private empleadoService: EmpleadoService, 
  ) {}

  ngOnInit() {
    this.obterenerRegistrosAporbados();
  }

  obterenerRegistrosAporbados() {
    this.empleadoService.obterenerRegistrosAporbados().subscribe(
      data => {
        this.prestamoAprobadoDataSource.data = data;
      },
      error => {
        console.error('Error en la solicitud:', error);
      }
    );
  }

  aprobarPrestamo(prestamo: any) {
    console.log('Préstamo aprobado:', prestamo);
  }
  
}
