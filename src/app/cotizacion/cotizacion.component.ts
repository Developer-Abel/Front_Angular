import { Component, OnInit,ElementRef,ViewChild,HostListener } from '@angular/core';
import { FormGroup, FormControl,FormBuilder} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
/** Clases **/
import { ClassCliente } from '../clases/cliente';
import { ClassAcabado } from '../clases/Acabado';
import { ClassDocumento } from '../clases/Documento';
import { ClassItem } from '../clases/Item';
/** Servicios **/
import { CotizacionService } from '../services/cotizacion.service';


@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})


export class CotizacionComponent implements OnInit {
	@ViewChild('cerrarModalItem') closeAddExpenseModal: ElementRef;
	@ViewChild('cerrarModalItem') myModal;
	allCotizaciones;
	no_documento;
	allAcabados;
	tipo_papel;
	tipo_maquina;
	id_cotizacion:number = 0;
	msgErrorCliente:string;
	cliente:ClassCliente = new ClassCliente();
	cedu_nit;
	acabado:ClassAcabado = new ClassAcabado();
	item:ClassItem = new ClassItem();
	direccion_completa = '';
	// idCliente:object;
	formItem;
	sumaPrecioAcabado =0;
	preciosSelect =0;
	fech_cotizacion=new Date();
	myCate = new Date().toISOString();
	fech_vencimiento = this.sumarDias(this.fech_cotizacion,30);
	formTalonario;
	select_tipo_p =2;
	// formTalonario:FormGroup;

	mostrar:boolean = false;
	bandera:number = 0;
	iddocumento;
	id_item =0;


	/******/
	descuento = 0;
	subtotal=0;
	iva =0;
	total = 0;


	constructor(
		private cotizacionService_: CotizacionService,
		private route_: ActivatedRoute
		) {
		this.iddocumento = this.route_.snapshot.paramMap.get('id');
		this.getCotizaciones(this.iddocumento);
		this.formItem= this.FormItem();
		this.formTalonario= this.FormTalonario();
		// window.addEventListener("beforeunload", (event) => {
		//    event.returnValue = 'ESTAS SEGURO DE SALIR?';
		//    return event;
		// });


	}
	ngOnInit(): void {}

	sumarDias(fecha, dias){
		fecha.setDate(fecha.getDate() + dias);
		return fecha;
	}

	/**  GUARDAR DOCUMENTO Y LISTAR **/
	guardarDowc(){
		console.log("sub: "+this.subtotal+"iva: "+this.iva+" total:"+this.total);
	}
	guardarDoc(status){
		const datos = {
			"subtotal":this.subtotal,
			"descuento":0,
			"iva":this.iva,
			"total":this.total,
			"status":status,
			"id_documento":this.iddocumento,
		};
		this.cotizacionService_.guardarDoc(datos).subscribe(
		(response)=>{
			console.log(response);
		},(err : HttpErrorResponse)=>{
			console.log(err.error);
		});
	}

	/***** FUNCIONES ITEM*****/
	getCotizaciones(id){
		this.cotizacionService_.getAllCotizaciones(id).subscribe((response)=>{

			let total_datos = Object.keys(response).length;
			if(total_datos==0 || total_datos==null){
				this.subtotal = 0;
				this.iva = 0;
				this.total = 0;

				this.allCotizaciones = response;
				this.id_cotizacion = 0;
				this.no_documento = 0;
				this.getcliente(this.cedu_nit);
			}else{
				this.allCotizaciones = response;
				this.id_cotizacion = response[0].documento_id;
				this.no_documento = response[0].no_documento;
				this.cedu_nit = response[0].num_key;
				this.getcliente(this.cedu_nit);
				/**CALCULAR SUBTOTAL-IVA-TOTAL**/
				let total_items = Object.keys(response).length;
				let subtotal_ = 0;
				for (var i = 0; i < total_items; ++i) {
					subtotal_ = subtotal_ + response[i].costo;
				}
				this.subtotal = subtotal_;
				this.iva = this.subtotal*.16;
				this.total = this.subtotal + this.iva;
			}
		});
	}
	getcliente(nit){
		const num_key = {
			"num_key":nit
		};
		this.cotizacionService_.getcliente(num_key).subscribe((response:ClassCliente)=>{
			console.log(response);
			this.cliente = response;
			this.direccion_completa = this.cliente.direccion+" "+this.cliente.barrio+", "+this.cliente.estado+", "+this.cliente.pais;
			console.log("este es el id]:"+this.cliente.id_tercero);
			// this.idCliente = this.cliente['id_tercero'];
			this.msgErrorCliente = '';
			// this.getCotizaciones();
		},(err : HttpErrorResponse)=>{
			this.msgErrorCliente = err.error;
			this.cliente = new ClassCliente();
			// this.idCliente = this.cliente['id_tercero'];
		})
	}
   FormItem(){
		return new FormGroup({
			plantilla      : new FormControl(),
			cantidad       : new FormControl(),
			descripcion    : new FormControl(),
			tam_1          : new FormControl(),
			tam_2          : new FormControl(),
			tinta_1        : new FormControl(),
			tinta_2        : new FormControl(),
			val_diseno     : new FormControl(),
			transporte     : new FormControl(),
			val_rifle      : new FormControl(),
			val_tip_maq    : new FormControl(),
			tipo_papel     : new FormControl(),
			por_ganancia   : new FormControl(),
			costos         : new FormControl(),
			ganancia       : new FormControl(),
			id_tercero     : new FormControl(),
			tipo_documento : new FormControl(),
			num_acabado1   : new FormControl(),
			num_acabado2   : new FormControl(),
			num_acabado3   : new FormControl(),
			num_acabado4   : new FormControl(),
			num_acabado5   : new FormControl(),
			num_acabado6   : new FormControl(),
			num_acabado7   : new FormControl(),
			num_acabado8   : new FormControl(),
			num_acabado9   : new FormControl(),
			hayAcabado     : new FormControl(),
			id_documento   : new FormControl(),
			id_item_        : new FormControl(),
		});
	}
	iscabado(status,precio){
		if (status == true) {
			this.preciosSelect = this.preciosSelect + Number(precio);
			this.sumaPrecioAcabado = this.sumaPrecioAcabado + Number(precio);
			this.formItem.patchValue({costos: this.sumaPrecioAcabado});
			this.bandera ++;
			console.log(this.bandera,precio);
		}else{
			this.preciosSelect = this.preciosSelect - Number(precio);
			this.sumaPrecioAcabado = this.sumaPrecioAcabado - Number(precio);
			this.formItem.patchValue({costos: this.sumaPrecioAcabado});
			this.bandera--;
			console.log(this.bandera);
		}
	}
	guardarItem(){
		/**Verifica si Edita o Guarda**/

		/** Verifica si existen acabados**/
		if (this.bandera>0) {
			this.formItem.patchValue({hayAcabado: true});
		}else{
			this.formItem.patchValue({hayAcabado: false});
		}
		/** Verifica si ya existe el documento **/
		if (this.iddocumento != 0) {
			this.formItem.patchValue({id_documento: this.iddocumento});
		}else{
			this.formItem.patchValue({id_documento: 0});
		}
		/** Agrega el id del cliente **/
		this.formItem.patchValue({id_tercero: this.cliente.id_tercero, tipo_documento: "ITEM SENCILLO"});
		let papel_ = new String(this.formItem.value['tipo_papel']);
		let papel = papel_.split("-");
		let id_papel = Number(papel[0]);
		this.formItem.patchValue({tipo_papel: id_papel});
		var maquina_ = new String(this.formItem.value['val_tip_maq']);
		var maquina = maquina_.split("-");
		var id_maquina = Number(maquina[0]);
		this.formItem.patchValue({val_tip_maq: id_maquina});
		this.formItem.patchValue({id_item_: this.id_item});

		/** Manda los datos al servicio **/
		const datos = this.formItem.value;
		console.log("este es el iditem:"+this.id_item);
		if (this.id_item ==0) {
			this.cotizacionService_.additem(datos).subscribe(
			(response) => {
				this.iddocumento = Number(response);
				this.getCotizaciones(this.iddocumento);
				this.closeAddExpenseModal.nativeElement.click();
				this.resetFormItem();
				console.log(response);
			},(err : HttpErrorResponse)=>{
				console.log(err.error);
			});
		}else{
			this.cotizacionService_.actualizarItem(datos).subscribe(
			(response) => {
				this.getCotizaciones(this.iddocumento);
				this.closeAddExpenseModal.nativeElement.click();
				this.resetFormItem();
				console.log("respuesta: "+response);
			},(err : HttpErrorResponse)=>{
				console.log(err.error);
			});
		}

	}

	editarItem(iddoc, iditem){
		const datos = {
			"id_documento":iddoc,
			"id_detalle":iditem
		};
		this.cotizacionService_.editItem(datos).subscribe((response:ClassItem)=>{
			console.log(response);
			let total_acadado = Object.keys(response).length;

			this.getTipoPapel();
			this.getTipoMaquina();

			this.formItem.patchValue({cantidad:    response[0].cantidad});
			this.formItem.patchValue({descripcion: response[0].descripcion});
			this.formItem.patchValue({tam_1:       response[0].tamanoH});
			this.formItem.patchValue({tam_2:       response[0].tamano_v});
			this.formItem.patchValue({tinta_1:     response[0].num_tinta_tiro});
			this.formItem.patchValue({tinta_2:     response[0].num_tinta_retiro});
			this.formItem.patchValue({val_diseno:  response[0].vr_diseno});
			this.formItem.patchValue({transporte:  response[0].vr_trasporte});
			this.formItem.patchValue({val_rifle:   response[0].vr_rifle});
			this.formItem.patchValue({val_tip_maq: response[0].tipo_maquina_id +"-"+ response[0].precio_millar});
			this.formItem.patchValue({tipo_papel:  response[0].tipo_papel_id+"-"+ response[0].precio_papel});
			this.formItem.patchValue({costos:      response[0].costo});
			let ban2 = new Array();
				for (var k = 0; k < total_acadado; ++k) {
						ban2[response[k].acabado_id] = true;
						this.bandera++;
				}
			console.log(ban2);
			this.formItem.patchValue({num_acabado1:ban2[1]});
			this.formItem.patchValue({num_acabado2:ban2[2]});
			this.formItem.patchValue({num_acabado3:ban2[3]});
			this.formItem.patchValue({num_acabado4:ban2[4]});
			this.formItem.patchValue({num_acabado5:ban2[5]});
			this.formItem.patchValue({num_acabado6:ban2[6]});
			this.formItem.patchValue({num_acabado7:ban2[7]});
			this.formItem.patchValue({num_acabado8:ban2[8]});
			this.formItem.patchValue({num_acabado9:ban2[9]});
			this.id_item = response[0].id_detalle;
			document.getElementById('button_item_sencillo').click();
		},(err : HttpErrorResponse)=>{
			console.log(err.error);
		})
	}
	deleteItem(id_detalle){
		const datos = {
			"id_detalle":id_detalle
		};
		this.cotizacionService_.deletedItem(datos).subscribe((response:ClassItem)=>{
			console.log(response);
			this.getCotizaciones(this.iddocumento);
		},(err : HttpErrorResponse)=>{
			console.log(err.error);
		})
	}
	ischeck(id){
		if (id >0) {
			return true;
		}else{
			return false;
		}
	}
	siguiente(){
		this.getAcabados();
		document.getElementById("view_item").style.display='none';
		document.getElementById("view_acabado").style.display='block';
		this.mostrar = true;
		let papel = this.valor1Item();
		let maquina = this.valor2Item();
		let resultado_ = papel+maquina;
		let resultado = resultado_+Number(this.formItem.value['val_diseno'])+Number(this.formItem.value['transporte'])+Number(this.formItem.value['val_rifle']);
		console.log(resultado);
		this.sumaPrecioAcabado = resultado+this.preciosSelect;
		this.formItem.patchValue({costos: this.sumaPrecioAcabado});
	}
	anterior(){
		document.getElementById("view_item").style.display='block';
		document.getElementById("view_acabado").style.display='none';
		this.mostrar = false;
	}
	getAcabados(){
		this.cotizacionService_.getAllAcabados().subscribe((response)=>{
			this.allAcabados = response;
		});
	}
	abrirModalItem (){
		this.resetFormItem();
		document.getElementById('button_item_sencillo').click();
		this.getTipoPapel();
		this.getTipoMaquina();
	}
	getTipoPapel(){
		this.cotizacionService_.getTipoPapel().subscribe((response)=>{
			this.tipo_papel = response;
		});
	}
	getTipoMaquina(){
		this.cotizacionService_.getTipoMaquina().subscribe((response)=>{
			this.tipo_maquina = response;
		});
	}
	resetFormItem() {
	  this.formItem.reset()
	}

	tinta(tinta){
		switch(tinta) {
		   case 1: {
		      return 15;
		      break;
		   }
		   case 2: {
		      return 25;
		      break;
		   }
		   case 3: {
		      return 50;
		      break;
		   }
		   default: {
		      return 0;
		      break;
		   }
		}
	}

	valor1Item(){
		var AreaPliego = 7000;
		var cantidad = Number(this.formItem.value['cantidad']);
		var num_mayor,num_menor;
		if (Number(this.formItem.value['tam_1']) > Number(this.formItem.value['tam_2'])) {
			num_mayor = Math.floor(100 / Number(this.formItem.value['tam_1']));
			num_menor = Math.floor(70 / Number(this.formItem.value['tam_2']));
		}else{
			num_mayor = Math.floor(100 / Number(this.formItem.value['tam_2']));
			num_menor = Math.floor(70 / Number(this.formItem.value['tam_1']));
		}
		var hojasEnPliego = Math.floor(Number(num_menor * num_mayor));
		var numPliegos = cantidad / hojasEnPliego;

		var papel_ = new String(this.formItem.value['tipo_papel']);
		var papel = papel_.split("-");
		var id_papel = papel[0];
		var precio_papel = Number(papel[1]);
		var valor1 = numPliegos * precio_papel;
		return valor1;
	}
	valor2Item(){
		var tinta1 =  this.tinta(Number(this.formItem.value['tinta_1']));
		var tinta2 =  this.tinta(Number(this.formItem.value['tinta_2']));
		var tinta_total = tinta1 + tinta2;

		var maquina_ = new String(this.formItem.value['val_tip_maq']);
		var maquina = maquina_.split("-");
		var id_maquina = maquina[0];
		var precio_maquina = Number(maquina[1]);
		var valor2 = tinta_total * precio_maquina;
		return valor2;
	}


	/** FUNCIONES TALONARIO **/
	FormTalonario(){
		return new FormGroup({
			tal_plantilla      : new FormControl(),
			tal_cantidad       : new FormControl(),
			tal_descripcion       : new FormControl(),
			tal_tam_1       : new FormControl(),
			tal_tam_2       : new FormControl(),
			tal_juegosxlibreta       : new FormControl(),
			tal_val_diseño       : new FormControl(),
			tal_transporte       : new FormControl(),
			tal_acabado       : new FormControl(),
			tal_radio       : new FormControl(),
			tal_val_unit_lev       : new FormControl(),
			tal_tipo_maquina       : new FormControl(),
			tal_ganancia       : new FormControl(),
			tal_inicio_num       : new FormControl(),
			tal_val_rifle       : new FormControl(),
			tal_val_millar_num       : new FormControl(),
			tal_val_millar_perf       : new FormControl(),
			tal_original       : new FormControl(),
			tal_tinta01       : new FormControl(),
			tal_tinta02       : new FormControl(),
			tal_check_1       : new FormControl(),
			tal_select_1       : new FormControl(),
			tal_tinta11       : new FormControl(),
			tal_tinta12       : new FormControl(),
			tal_check_2       : new FormControl(),
			tal_select_2       : new FormControl(),
			tal_tinta21       : new FormControl(),
			tal_tinta22       : new FormControl(),
			tal_check_3       : new FormControl(),
			tal_select_3       : new FormControl(),
			tal_tinta31       : new FormControl(),
			tal_tinta32       : new FormControl(),
			tal_check_4       : new FormControl(),
			tal_select_4       : new FormControl(),
			tal_tinta41       : new FormControl(),
			tal_tinta42       : new FormControl(),
		});
	}
	guardarTalonario(){
		/** Verifica si existen acabados**/
		// if (this.bandera>0) {
		// 	this.formItem.patchValue({hayAcabado: true});
		// }else{
		// 	this.formItem.patchValue({hayAcabado: false});
		// }
		/** Verifica si ya existe el documento **/
		// if (this.iddocumento != 0) {
		// 	this.formItem.patchValue({id_documento: this.iddocumento});
		// }else{
		// 	this.formItem.patchValue({id_documento: 0});
		// }
		/** Agrega el id del cliente **/
		// this.formItem.patchValue({id_tercero: this.idCliente, tipo_documento: "ITEM SENCILLO"});
		/** Manda los datos al servicio **/
		const datos = this.formTalonario.value;
		console.log(datos);
		// this.cotizacionService_.addDocumento(datos).subscribe(
		// (response) => {
		// 	this.iddocumento = Number(response);
		// 	this.getCotizaciones();
		// 	this.closeAddExpenseModal.nativeElement.click();
		// 	console.log(response);
		// },(err : HttpErrorResponse)=>{
		// 	console.log(err.error);
		// });
	}

}
