import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss']
})
export class ModalComponent {
  empleado: any;
  empleadoSeleccionado: any;
  prestamos: any ;
  seguros_vida: any ;
  autorizarPrestamo: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalComponent>
    
  ) {
    this.autorizarPrestamo = data.autorizarPrestamo;
    this.empleado = data.empleado;
    this.prestamos = data.prestamos;
    this.seguros_vida = data.seguros_vida;
  }

  ngOnInit() {
    this.prestamos = this.data.prestamos ;
    this.seguros_vida = this.data.seguros_vida;
  }

  cerrarModal() {
    this.dialogRef.close();
  }

  aprobarPrestamo(prestamo: any) {
    this.autorizarPrestamo(prestamo);
    this.cerrarModal();
  }


  generarPDFSeguroVida() {
    const doc = new jsPDF();
    const fontSize = 12;
    doc.setFontSize(fontSize)
    doc.text('Detalles del Seguro de Vida', 10, 10);
    doc.text(`Nombre: ${this.empleado.nombre}`, 10, 20);
    doc.text(`Apellido Paterno: ${this.empleado.apellido_paterno}`, 10, 30);
    doc.text(`Apellido Materno: ${this.empleado.apellido_materno}`, 10, 40);
    if (this.empleado.seguros_vida) {
      this.empleado.seguros_vida.forEach((seguros_vida: any )=> {
  
      doc.text(`Fecha de Fallecimiento: ${seguros_vida.fecha_fallecimiento}`, 10, 50);
      doc.text(`Domicilio: ${seguros_vida.domicilio}`, 10, 60);
      doc.text(`Teléfono: ${seguros_vida.telefono}`, 10, 70);
      doc.text(`Beneficiario: ${seguros_vida.beneficiario}`, 10, 80);
    });
    } else {
      doc.text('Aún no tiene registro de seguro de vida', 10, 50);
    }
    doc.save(`${this.empleado.nombre}_${this.empleado.apellido_paterno}_${this.empleado.apellido_materno}_seguro_vida.pdf`);
  }


  generarPDFPrestamos() {
    const doc = new jsPDF();
    const fontSize = 12;
    doc.setFontSize(fontSize)
    doc.text('Detalles de Préstamo', 10, 10);
    doc.text(`Nombre: ${this.empleado.nombre}`, 10, 20);
    doc.text(`Apellido Paterno: ${this.empleado.apellido_paterno}`, 10, 30);
    doc.text(`Apellido Materno: ${this.empleado.apellido_materno}`, 10, 40);
    if (this.empleado.prestamos) {
      this.empleado.prestamos.forEach((prestamo: any, index: number) => {
        const yPosition = 50 + index * 40;
        doc.text(`Prestamo ${index + 1}:`, 10, yPosition);
        doc.text(`Cantidad: ${prestamo.cantidad}`, 10, yPosition + 10);
        doc.text(`Quincenas: ${prestamo.quincenas}`, 10, yPosition + 20);
      });
    } else {
      doc.text('Aún no tiene registros de préstamos', 10, 50);
    }
    doc.save(`${this.empleado.nombre}_${this.empleado.apellido_paterno}_${this.empleado.apellido_paterno}_prestamo.pdf`);
  }




}
