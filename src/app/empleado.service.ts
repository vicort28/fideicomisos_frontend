import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { Observable, Subject, catchError, map, throwError } from 'rxjs';
import { Empleado, EmpleadoDetalle, PresatmoAprobado, Prestamo, SeguroVida } from './util/interfaces';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {

  
  private baseUrl = "http://127.0.0.1:8000/"
  empleadoSeleccionado: any; 
  private prestamoAprobadoSubject = new Subject<any>();
  prestamoAprobado$ = this.prestamoAprobadoSubject.asObservable();

  constructor(private http: HttpClient) {}



  getEmpleados(): Observable<Empleado[]> {
    const url = `${this.baseUrl}tabla-empleado/`;
    return this.http.get<Empleado[]>(url);
  }

  obtenerDatosEmpleado(empleadoId: number): Observable<EmpleadoDetalle> {
    const url = `${this.baseUrl}datos-empleado/${empleadoId}`;
    return this.http.get<EmpleadoDetalle>(url);
  }
  

  guardarDatos(datos: any): Observable<any> {
    const url = `${this.baseUrl}guardar_formulario/`;
    return this.http.post(url, datos);
  }

  guardarNuevoEmpleado(nuevoEmpleado: Empleado): Observable<any> {
    const url = `${this.baseUrl}agregar_empleado/`; 
    return this.http.post(url, nuevoEmpleado);
  }

  guardarSeguroVida(datosSeguroVida: any): Observable<any> {
    const url = `${this.baseUrl}guardarSeguroVida/`;
    return this.http.post(url, datosSeguroVida);
  }

  getGastosFunerarios(empleadoId: number): Observable<any> {
    const url = `${this.baseUrl}gastos-funerarios/${empleadoId}/`;
    return this.http.get<any>(url);
  }
  
  guardarGastosFunerarios(gastosFunerarios: any): Observable<any> {
    const url = `${this.baseUrl}gastos-funerarios/`;
    return this.http.post<any>(url, gastosFunerarios);
  } 

  getEmpleadosConRegistros(): Observable<Empleado[]> {
    const url = `${this.baseUrl}empleados-con-registros/`;
    return this.http.get<Empleado[]>(url);
  }

  getPrestamos(empleadoId: number): Observable<any[]> {
    const url = `${this.baseUrl}prestamos/${empleadoId}/`;
    return this.http.get<any[]>(url);
  }


  getSegurosVida(empleadoId: number): Observable<any[]> {
    const url = `${this.baseUrl}seguros-vida/${empleadoId}/`; 
    return this.http.get<any[]>(url);
  }



  obtenerDetallesPrestamo(registroId: number): Observable<Prestamo> {
    const url = `${this.baseUrl}prestamos/${registroId}/`;
    return this.http.get<Prestamo>(url);
    }

  obterenerRegistrosAporbados(): Observable<PresatmoAprobado[]> {
    const url = `${this.baseUrl}aprobacion-prestamo/`;
    return this.http.get<PresatmoAprobado[]>(url);
  }
    
  

  obtenerRegistrosAprobados(): Observable<PresatmoAprobado[]> {
      const url = `${this.baseUrl}aprobacion-prestamo/`;
      return this.http.get<PresatmoAprobado[]>(url);
    }


  obtenerDetallesSeguroVida(registroId: number): Observable<SeguroVida> {
    const url = `${this.baseUrl}seguros-vida/${registroId}/`;
    return this.http.get<SeguroVida>(url);
  }

  eliminarRegistro(empleadoId: number): Observable<any> {
    const url = `${this.baseUrl}eliminar_registro/${empleadoId}`;
    return this.http.delete(url).pipe(
      catchError((error) => {
        console.error('Error al eliminar el registro:', error);
        return throwError('Ocurrió un error al eliminar el registro.');
      })
    );
  }

  eliminarRegistroPrestamo(registroId: number): Observable<any> {
    const url = `${this.baseUrl}eliminar_registro_prestamo/${registroId}`;
    return this.http.delete(url).pipe(
      catchError((error) => {
        console.error('Error al eliminar el registro de préstamo:', error);
        return throwError('Ocurrió un error al eliminar el registro de préstamo.');
      })
    );
  }
  
  eliminarRegistroSeguroVida(registroId: number): Observable<any> {
    const url = `${this.baseUrl}eliminar_registro_seguro_vida/${registroId}`;
    return this.http.delete(url).pipe(
      catchError((error) => {
        console.error('Error al eliminar el registro de seguro de vida:', error);
        return throwError('Ocurrió un error al eliminar el registro de seguro de vida.');
      })
    );
  }

  obtenerDetallesEmpleado(empleadoId: number): Observable<any> {
    const url = `${this.baseUrl}empleados/${empleadoId}`;
    return this.http.get<any>(url);
  }

  obtenerRegistrosPrestamoAprobado(empleadoId: number): Observable<any[]> {
    const url = `${this.baseUrl}empleados/${empleadoId}/aprobacion-prestamo`;
    return this.http.get<any[]>(url);
  }


  aprobarPrestamo(registroId: number): Observable<any> {
    const url = `${this.baseUrl}empleados/${registroId}/aprobacion-prestamo/`;
    return this.http.post(url, registroId).pipe(
      map((response: any) => {
        response.estatus = 'aceptado';
        this.prestamoAprobadoSubject.next(response);
        return response;
      })
    );
  }

}
