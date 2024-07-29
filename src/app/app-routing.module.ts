import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaEmpleadoComponent } from './busqueda-empleado/busqueda-empleado.component';
import { TablaEmpleadoComponent } from './tabla-empleado/tabla-empleado.component';
import { TramiteComponent } from './tramite/tramite.component';
import { EliminarRegistrosComponent } from './eliminar-registros/eliminar-registros.component';
import { ListaRegistrosComponent } from './lista-registros/lista-registros.component';
import { AprobacionPrestamoComponent } from './aprobacion-prestamo/aprobacion-prestamo.component';
import { LoginComponent } from './login/login.component';
import { BuscarEmpleadoComponent } from './buscar-empleado/buscar-empleado.component';
import { AuthGuard } from './auth.guard'; 

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'busqueda-empleado', component: BusquedaEmpleadoComponent, canActivate: [AuthGuard] },
  { path: 'tabla-empleado', component: TablaEmpleadoComponent, canActivate: [AuthGuard] },
  { path: 'buscar-empleado', component:BuscarEmpleadoComponent, canActivate: [AuthGuard] },
  { path: 'tramite/:id', component: TramiteComponent, canActivate: [AuthGuard] },
  { path: 'aprobacion-prestamo', component: AprobacionPrestamoComponent, canActivate: [AuthGuard] },
  { path: 'datos-empleado/<int:empleado_id>/',component: TramiteComponent, canActivate: [AuthGuard]},
  { path: 'lista-registros', component:ListaRegistrosComponent, canActivate: [AuthGuard]},
  { path: 'eliminar-registros', component: EliminarRegistrosComponent, canActivate: [AuthGuard] },
  { path: 'login', component:LoginComponent},
  
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

