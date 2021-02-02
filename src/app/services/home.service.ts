import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Documento } from '../interfaces/documento';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http_:HttpClient) { }

  getAllDocumentos(){
    let headers = this.headers();
    const path = 'http://localhost:8000/documentosAll/';
  	return this.http_.get(path,{headers});

  }
  deletedDoc(id){
    let headers = this.headers();
    const path = 'http://localhost:8000/documentoDeleted';
  	return this.http_.post(path,id,{headers});//<Cotizacion[]>

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
