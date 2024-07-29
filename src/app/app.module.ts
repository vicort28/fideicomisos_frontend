import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BusquedaEmpleadoComponent } from './busqueda-empleado/busqueda-empleado.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TablaEmpleadoComponent } from './tabla-empleado/tabla-empleado.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { EliminarRegistrosComponent } from './eliminar-registros/eliminar-registros.component';
import { TramiteComponent} from './tramite/tramite.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EmpleadoService } from './empleado.service';
import { TableModule } from 'primeng/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { ListaRegistrosComponent } from './lista-registros/lista-registros.component';
import { AprobacionPrestamoComponent } from './aprobacion-prestamo/aprobacion-prestamo.component';
import { ModalComponent } from './modal-component/modal-component.component';
import { LoginComponent } from './login/login.component';
import { ModalAprobarPrestamoComponent } from './modal-aprobar-prestamo/modal-aprobar-prestamo.component';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PrestamosmodalComponent } from './prestamosmodal/prestamosmodal.component';
import { ActualizarDatosComponent } from './actualizar-datos/actualizar-datos.component';
import { ConfirmacionModalComponent } from './confirmacion-modal/confirmacion-modal.component';
import { BuscarEmpleadoComponent } from './buscar-empleado/buscar-empleado.component';
import { EmpleadoApiService } from './empleado-api.service';
import { ActualizarSeguroVidaComponent } from './actualizar-seguro-vida/actualizar-seguro-vida.component';
import { DetalleEmpleadoComponent } from './detalle-empleado/detalle-empleado.component';
import { FormatDatePipe } from './format-date.pipe';

@NgModule({
  declarations: [AppComponent,FormatDatePipe, DetalleEmpleadoComponent, ActualizarSeguroVidaComponent, ConfirmacionModalComponent, BuscarEmpleadoComponent, ActualizarDatosComponent, PrestamosmodalComponent, ModalAprobarPrestamoComponent,EliminarRegistrosComponent,LoginComponent, BusquedaEmpleadoComponent, TablaEmpleadoComponent, TramiteComponent, NavegacionComponent, ListaRegistrosComponent, AprobacionPrestamoComponent, ModalComponent], 
  imports: [ MatSnackBarModule,MatCardModule,MatListModule,MatDialogModule, MatNativeDateModule, MatDatepickerModule, MatIconModule, MatCheckboxModule, MatSelectModule,ReactiveFormsModule,ButtonModule, MatPaginatorModule,TableModule, NgxDatatableModule,MatInputModule, MatAutocompleteModule, MatFormFieldModule,MatTabsModule,AppRoutingModule,RouterModule,MatTableModule, MatButtonModule,BrowserAnimationsModule,BrowserModule, FormsModule, HttpClientModule,BrowserAnimationsModule],
  providers: [EmpleadoService, EmpleadoApiService],
  bootstrap: [AppComponent],
  entryComponents: [PrestamosmodalComponent, ActualizarDatosComponent, ConfirmacionModalComponent]
})
export class AppModule {}
