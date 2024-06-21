import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoApiService {
  private apiUrl = 'ingenieria.sspechih.gob.mx/rh_api/consultar'; // Reemplaza con tu URL de la API
  private apiKey = '4b76b5af-1a50-4eca-8fa0-be514a8636bd'; // Reemplaza con tu API key

  constructor(private http: HttpClient) {}

  buscarEmpleadoPorNombreCompleto(nombreCompleto: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });
    const url = `${this.apiUrl}/nombre/${nombreCompleto}`;
    return this.http.get<any>(url, { headers });
  }
}
