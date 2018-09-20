import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup,FormControl,Validators } from '@angular/forms';
import { ManageDBService } from '../../Services/manage-db.service';
import { Order } from '../../models/Order';
import { Option } from '../../models/Option';
import { LoginService } from '../../Services/login.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  TpSnacks=[];
  ElegirSnackForm : FormGroup;
  ValorSeleccionado:string;
  
  
  constructor(private manageBD: ManageDBService, private manageLogin:LoginService) { }

  ngOnInit() {
    this.ElegirSnackForm = new FormGroup({
      tipoSnack: new FormControl('',[
        Validators.required])
    });
    this.getOptionList();
    this.getMyOrder();
  }

  getMyOrder(){
    this.manageBD.getMyOrder(this.manageLogin.userData.$key).snapshotChanges().subscribe(item => {
      console.log("Consulto myorder");
      console.log(item);
      this.ValorSeleccionado = "";
       let element =item[0];       
        let x = element.payload.toJSON();
        console.log(x);
        this.ValorSeleccionado=x as string;
      })
  }

  getOptionList(){
    this.manageBD.getListOptions().snapshotChanges().subscribe(item => {
      this.TpSnacks = Array<Option>();
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.TpSnacks.push(x as Option)
        console.log(x);
      })
    });
  }

  addOrder(){
    let objeto= new Order();
    objeto.tp_snack=this.ElegirSnackForm.get('tipoSnack').value;
    objeto.$key=this.manageLogin.userData.$key;
    objeto.user=this.manageLogin.userData.name;
    this.manageBD.insertListOrders(objeto);
    this.getMyOrder();
    console.log("Orden agregada"+ this.ValorSeleccionado);
  }

  delOrder(){
    this.manageBD.deleteListOrders(this.manageLogin.userData.$key);
  }

  getErrorMessage(control:string) {
    if(control=='tipoSnack')
    return this.ElegirSnackForm.get(control).hasError('required') ? 'Debe elegir el tipo de snack' :'';
  }

  getTypeSnack(key: string){
    let retorno="No encontrado";
    this.TpSnacks.forEach(element => {
      if(element.$key==key){
        retorno=element.description;
      }
    });
    return retorno;
  }

}
