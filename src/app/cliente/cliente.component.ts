import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl,FormBuilder} from '@angular/forms';
import { ClienteService } from '../services/cliente.service';
import { ClassTercero } from '../clases/Tercero';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
	@ViewChild('cerrarModalCliente') closeAddExpenseModal: ElementRef;
	all_clientes;
	formCliente;
	catalog_pais;
	calog_estado;
	id_cliente:any=0;
	constructor(private clienteService_: ClienteService) {
		this.getClientes();
		this.formCliente= this.FormCliente();
	}

	ngOnInit(): void {
	}

	getClientes(){
		this.clienteService_.getcliente().subscribe(
		(response)=>{
			console.log(response);
			this.all_clientes =response;
		},(err : HttpErrorResponse)=>{
			console.log(err.error);
		});
	}

	FormCliente(){
		return new FormGroup({
			nombre    :new FormControl(),
			tipo_id   :new FormControl(),
			numero    :new FormControl(),
			direccion :new FormControl(),
			barrio    :new FormControl(),
			pais      :new FormControl(),
			ciudad    :new FormControl(),
			email     :new FormControl(),
			telefono  :new FormControl(),
			celular   :new FormControl(),
			tipo_tercero   :new FormControl(),
			idcliente :new FormControl(),
		});
	}

	guardarcliente(){
		console.log("status id_cliente: "+this.id_cliente)
		this.formCliente.patchValue({tipo_tercero: "cliente"});
		this.formCliente.patchValue({idcliente: this.id_cliente});
		const datos = this.formCliente.value;
		if (this.id_cliente==0) {
			this.clienteService_.guardarCliente(datos).subscribe(
			(response)=>{
				console.log(response);
				this.getClientes();
				this.closeAddExpenseModal.nativeElement.click();
			},(err : HttpErrorResponse)=>{
				console.log(err.error);
			});
		}else{
			this.clienteService_.updateCliente(datos).subscribe(
			(response)=>{
				console.log(response);
				this.getClientes();
				this.closeAddExpenseModal.nativeElement.click();
			},(err : HttpErrorResponse)=>{
				console.log(err.error);
			});
		}
	}
	editarCliente(idx){
		console.log("editar("+idx+")");
		const datos = {
			"id_tercero":idx,
		};
		this.clienteService_.editCliente(datos).subscribe(
		(response:ClassTercero)=>{
			console.log(response);
			this.getPais();
			this.getEstado();
			this.formCliente.patchValue({nombre:       response['nombre']});
			this.formCliente.patchValue({tipo_id:      response['nombre']});
			this.formCliente.patchValue({numero:       response['num_key']});
			this.formCliente.patchValue({direccion:    response['direccion']});
			this.formCliente.patchValue({barrio:       response['barrio']});
			this.formCliente.patchValue({pais:         response['id_pais']});
			this.formCliente.patchValue({ciudad:       response['id_estado']});
			this.formCliente.patchValue({email:        response['email']});
			this.formCliente.patchValue({telefono:     response['telefono']});
			this.formCliente.patchValue({celular:      response['celular']});
			this.id_cliente = response['id_tercero'];
			document.getElementById('button_mdl_cliente').click();
			this.getClientes();
			this.closeAddExpenseModal.nativeElement.click();
		},(err : HttpErrorResponse)=>{
			console.log(err.error);
		});
	}
	eliminarCliente(id){
		const datos = {
			"id_tercero":id,
		};
		this.clienteService_.eliminarCliente(datos).subscribe(
		(response:ClassTercero)=>{
			console.log(response);
			this.getClientes();
		},(err : HttpErrorResponse)=>{
			console.log(err.error);
		});
	}
	resetFormCliente() {
	  this.formCliente.reset()
	}
	abrirModalCliente(){
		this.resetFormCliente();
		this.getPais();
		this.getEstado();
		this.id_cliente = 0;
		document.getElementById('button_mdl_cliente').click();
	}
	getPais(){
		this.clienteService_.getPais().subscribe(
		(response)=>{
			this.catalog_pais = response;
		},(err : HttpErrorResponse)=>{
			console.log(err.error);
		});
	}
	getEstado(){
		this.clienteService_.getEstado().subscribe(
		(response)=>{
			this.calog_estado = response;
		},(err : HttpErrorResponse)=>{
			console.log(err.error);
		});
	}
}
