import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Cotizacion } from '../interfaces/cotizacion';
import { Cliente } from '../interfaces/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  constructor(private http_:HttpClient) { }


  getAllCotizaciones(id){
    let headers = this.headers();
    const path = 'http://localhost:8000/documentos/'+id;
  	return this.http_.get<Cotizacion>(path,{headers});//<Cotizacion[]>

  }
  editItem(datos){
    let headers = this.headers();
    const path = 'http://localhost:8000/editar';
    return this.http_.post( path, datos, {headers});
  }
  actualizarItem(datos){
    let headers = this.headers();
    const path = 'http://localhost:8000/actualizar';
    return this.http_.post( path, datos, {headers});
  }
  deletedItem(datos){
    let headers = this.headers();
    const path = 'http://localhost:8000/delete';
    return this.http_.post( path, datos, {headers});
  }

  getcliente(getcliente){
    let headers = this.headers();
    const path = 'http://localhost:8000/getCliente/';
    let params = JSON.stringify(getcliente);
    return this.http_.post<Cliente>( path, params, {headers});
    // return this.http_.post(path,{headers})
  }

  additem(doc){
      let headers = this.headers();
      const urlback = 'http://localhost:8000/crear_documento';
      // let params = JSON.stringify(doc);
      return this.http_.post( urlback, doc, {headers});
   }
  guardarDoc(datos){
    // return datos;
    let headers = this.headers();
    const urlback = 'http://localhost:8000/guardarDoc';
    // let params = JSON.stringify(doc);
    return this.http_.post( urlback, datos, {headers});
  }

   addUser(user){
      let headers = this.headers();
      const urlback = 'http://localhost:8000/registrer';
      let params = JSON.stringify(user);
      return this.http_.post( urlback, params, {headers});
   }

   getAllAcabados(){
      let headers = this.headers();
      const path = 'http://localhost:8000/acabados';
      return this.http_.get<Cotizacion>(path,{headers});
   }
   getTipoPapel(){
      let headers = this.headers();
      const path = 'http://localhost:8000/tipo_papel';
      return this.http_.get<Cotizacion>(path,{headers});
   }
   getTipoMaquina(){
      let headers = this.headers();
      const path = 'http://localhost:8000/tipo_maquina';
      return this.http_.get<Cotizacion>(path,{headers});
   }

   headers(){
     let headers = new HttpHeaders({
         "Access-Control-Allow-Headers" : "Content-Type",
         "Access-Control-Allow-Origin": "http://localhost:4200",
         "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
         "Content-Type": "application/json",
         "api_token": "Gwz9VpxpNNDEk03vQhbEiYIAuin4Fj3k"
      });
     return headers;
   }

}
