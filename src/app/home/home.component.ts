import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../services/home.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	allDocumentos;
	constructor(
		private homeService_: HomeService) {
		this.getDocumentos();
	}

	ngOnInit(): void {
	}

	getDocumentos(){
		this.homeService_.getAllDocumentos().subscribe(
		(response)=>{
			this.allDocumentos =response;
		},(err : HttpErrorResponse)=>{
			console.log(err.error);
		});
	}

	deletedDoc(id){
		const datos = {
			"iddocumento":id,
		};
		this.homeService_.deletedDoc(datos).subscribe(
		(response)=>{
			console.log(response);
			this.getDocumentos();
		},(err : HttpErrorResponse)=>{
			console.log(err.error);
		});
	}



}
