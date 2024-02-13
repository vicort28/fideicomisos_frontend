import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaEmpleadoComponent } from './busqueda-empleado/busqueda-empleado.component';
import { TablaEmpleadoComponent } from './tabla-empleado/tabla-empleado.component';
import { TramiteComponent } from './tramite/tramite.component';
import { EliminarRegistrosComponent } from './eliminar-registros/eliminar-registros.component';
import { ListaRegistrosComponent } from './lista-registros/lista-registros.component';
import { AprobacionPrestamoComponent } from './aprobacion-prestamo/aprobacion-prestamo.component';

const routes: Routes = [
  { path: '', redirectTo: '/busqueda-empleado', pathMatch: 'full' },
  { path: 'busqueda-empleado', component: BusquedaEmpleadoComponent },
  { path: 'tabla-empleado', component: TablaEmpleadoComponent },
  { path: 'tramite/:id', component: TramiteComponent },
  { path: 'aprobacion-prestamo', component: AprobacionPrestamoComponent },
  { path: 'datos-empleado/<int:empleado_id>/',component: TramiteComponent},
  { path: 'lista-registros', component:ListaRegistrosComponent},
  { path: 'eliminar-registros', component: EliminarRegistrosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

