import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// importaciones
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CotizacionComponent } from './cotizacion/cotizacion.component';

import { routing } from './app.routing';
import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './cliente/cliente.component';
import { TalonarioComponent } from './modals/talonario/talonario.component';

@NgModule({
  declarations: [
    AppComponent,
    CotizacionComponent,
    HomeComponent,
    ClienteComponent,
    TalonarioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
