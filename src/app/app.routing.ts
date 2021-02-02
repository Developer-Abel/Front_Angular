import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
// rutas
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './cliente/cliente.component';

const appRoutes = [
  { path: '', component: HomeComponent },
  { path: 'cotizacion/:id', component: CotizacionComponent,  pathMatch: 'full'},
  { path: 'clientes', component: ClienteComponent},
];
export const routing = RouterModule.forRoot(appRoutes);