import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import { EmpleadoService } from '../empleado.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalAprobarPrestamoComponent } from '../modal-aprobar-prestamo/modal-aprobar-prestamo.component';
import { ActualizarDatosComponent } from '../actualizar-datos/actualizar-datos.component';


@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss']
})
export class ModalComponent {
  empleado: any;
  empleadoSeleccionado: any;
  prestamos: any ;
  seguros_vida: any 
  gastos_funerarios: any;
  snackBar: any;
  gastosFunerarios: any;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalComponent>,
    private empleadoService: EmpleadoService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.empleado = data.empleado;
    this.prestamos = data.prestamos;
    this.seguros_vida = data.seguros_vida;
    this.gastos_funerarios = data.gastos_funerarios;
    this.empleadoSeleccionado = data.empleado;
    
  }

  ngOnInit() {
    this.prestamos = this.data.prestamos ;
    this.seguros_vida = this.data.seguros_vida;
    this.gastos_funerarios = this.data.gastos_funerarios;
    this.obtenerGastosFunerarios();
  }

  cerrarModal() {
    this.dialogRef.close();
  }

  obtenerPrestamos(): void {
    this.empleadoService.getPrestamos(this.empleado.id).subscribe(
      (data: any) => {
        this.prestamos = data; 
      },
      (error: any) => {
        console.error('Error al obtener los préstamos:', error);
      }
    );
  }

  obtenerGastosFunerarios() {
    this.empleadoService.getGastosFunerarios(this.empleado.id).subscribe(
      (data: any) => {
        console.log('Datos de gastos funerarios:', data);
        this.gastos_funerarios = data;        
        console.log('Datos de gastos funerarios:', this.gastos_funerarios[0]);
      },
      (error: any) => {
        console.error('Error al obtener los datos de gastos funerarios:', error);
      }
    );
  }


  
  aprobarPrestamo(empleadoId: number): void {
    this.empleadoService.aprobarPrestamoPorEmpleado(empleadoId).subscribe(
      response => {
        console.log('Préstamo aprobado correctamente:', response);
        this.prestamos = this.prestamos.map((prestamo: any) => {
          if (!prestamo.aprobado) {
            prestamo.aprobado = true;
          }
          return prestamo;
        });
      },
      error => {
        console.error('Error al aprobar el préstamo:', error);
      }
    );
  }
  
  
  openModalActualizarPrestamo(prestamo: any): void {
    const dialogRef = this.dialog.open(ActualizarDatosComponent, {
      width: '250px',
      data: { prestamo }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Actualiza el préstamo en la lista después de la actualización
        this.prestamos = this.prestamos.map((p: any) => {
          if (p.id === prestamo.id) {
            return result;
          }
          return p;
        });
      }
    });
  }

  

  
  


  seleccionarEmpleado(empleado: any) {
    const dialogRef = this.dialog.open(ActualizarDatosComponent, {
      width: '800px',
      data: { empleado, prestamo: empleado.prestamos[0] } // Pasando prestamo
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal cerrado');
      // Opcional: actualizar la lista o hacer alguna acción tras cerrar el modal
    });
  }



  generarPDFSeguroVida() {
    const doc = new jsPDF();
    const fontSize = 12;
  
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
  
    this.addBackgroundImage1(doc);
  

    doc.setFontSize(fontSize);
    doc.text(`${this.empleado.nombre}`, 114, 106);
    doc.text(`${this.empleado.nombre}`, 114, 106);
    doc.text(`${this.empleado.apellido_paterno}`,  26, 106);
    doc.text(`${formattedDate}`, 130, 72); 
    doc.text(`${this.empleado.apellido_materno}`, 65, 106);
    if (this.empleado.seguros_vida) {
      this.empleado.seguros_vida.forEach((seguro_vida: any, index: number) => {
        const yPosition = 50 + index * 40;
        doc.text(`${seguro_vida.domicilio}`, 63, 124);
        doc.text(`${seguro_vida.telefono}`, 68, 145);
       // doc.text(`Beneficiario: ${seguro_vida.beneficiario}`, 10, yPosition + 30);
      });
    } else {
      doc.text('Aún no tiene registro de seguro de vida', 10, 50);
    }

    doc.save(`${this.empleado.nombre}_${this.empleado.apellido_paterno}_${this.empleado.apellido_materno}_seguro_vida.pdf`);
  }


  generarPDFPrestamos() {

    const doc = new jsPDF();
  
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
  
    this.addBackgroundImage(doc);
  
    const fontSize = 12;
    doc.setFontSize(fontSize);
    doc.text(`${this.empleado.nombre}`, 126, 124);
    doc.text(`${this.empleado.apellido_paterno}`, 36, 124);
    doc.text(`${this.empleado.apellido_materno}`, 83, 124);
    doc.text(`${this.empleado.domicilio}`, 81, 136);
    doc.text(`${this.empleado.telefono}`, 81, 149);
    doc.text(`${this.empleado.n_empleado}`, 165, 124);
    doc.text(`${this.empleado.unidad}`, 126, 149);
    if (this.empleado.prestamos) {
      this.empleado.prestamos.forEach((prestamo: any, index: number) => {
        const yPosition = 50 + index * 40;
        doc.text(`${prestamo.cantidad}`, 30, 96);
        doc.text(`${formattedDate}`, 138, 65); 
        doc.text(`${prestamo.pagoporquincena}`, 165, 111);
      });
    } else {
      doc.text('Aún no tiene registros de préstamos', 120, 30);
    }
  
    doc.save(`${this.empleado.nombre}_${this.empleado.apellido_paterno}_${this.empleado.apellido_materno}_prestamo.pdf`);
  }
  
  formatDate(date: Date): string {
    const day = this.padZeroes(date.getDate().toString());
    const month = this.padZeroes((date.getMonth() + 1).toString());
    const year = date.getFullYear().toString();
    return `${day}              ${month}            ${year}`;
  }
  
  padZeroes(num: string): string {
    return num.length === 1 ? `0${num}` : num;
  }
  

  addBackgroundImage(doc: any) {
    const imgData = './assets/img/PRESTAMOS.jpg'; 
    doc.addImage(imgData, 'PDF', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
  }

  addBackgroundImage1(doc: any) {
    const imgData = './assets/img/SOLICITUD DE APOYO DE SEGURO DE VIDA.jpg'; 
    doc.addImage(imgData, 'PDF', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
  }



  openModalAprobarPrestamo(EmpleadoId: number): void {
    const dialogRef = this.dialog.open(ModalAprobarPrestamoComponent, {
      width: '250px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.aprobarPrestamo(EmpleadoId);
      }
    });
  }


  openActualizarModal(prestamo: any): void {
    const dialogRef = this.dialog.open(ActualizarDatosComponent, {
      width: '250px',
      data: { prestamo }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.data.empleado.prestamos = this.data.empleado.prestamos.map((p: any) => {
          if (p.id === prestamo.id) {
            p = result;
          }
          return p;
        });
      }
    });
  }
  

  closeModal() {
    this.dialogRef.close();
  }


}
