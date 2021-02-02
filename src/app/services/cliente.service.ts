import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http_:HttpClient) { }
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
  getcliente(){
    let headers = this.headers();
    const path = 'http://localhost:8000/clientes/';
    return this.http_.get<Cliente>( path, {headers});
  }

  getclienteId(getcliente){
    let headers = this.headers();
    const path = 'http://localhost:8000/getCliente/';
    let params = JSON.stringify(getcliente);
    return this.http_.post<Cliente>( path, params, {headers});
    // return this.http_.post(path,{headers})
  }
  guardarCliente(datos){
    let headers = this.headers();
    const urlback = 'http://localhost:8000/saveCliente';
    return this.http_.post( urlback, datos, {headers});
  }
  editCliente(datos){
    let headers = this.headers();
    const path = 'http://localhost:8000/editarCliente';
    return this.http_.post( path, datos, {headers});
  }
  updateCliente(datos){
    let headers = this.headers();
    const path = 'http://localhost:8000/actualizarCliente';
    return this.http_.post( path, datos, {headers});
  }
  eliminarCliente(datos){
  	let headers = this.headers();
    const path = 'http://localhost:8000/eliminarCliente';
    return this.http_.post( path, datos, {headers});
  }
  getPais(){
    let headers = this.headers();
    const path = 'http://localhost:8000/pais/';
    return this.http_.get( path, {headers});
  }
  getEstado(){
    let headers = this.headers();
    const path = 'http://localhost:8000/estado/';
    return this.http_.get( path, {headers});
  }
}
