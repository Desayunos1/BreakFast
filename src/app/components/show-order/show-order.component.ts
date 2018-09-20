import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/Order';
import {ManageDBService} from "../../Services/manage-db.service";
import { Option } from '../../models/Option';
import { element } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-show-order',
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.css']
})
export class ShowOrderComponent implements OnInit {

  title = 'Show Order';
  
  dataSource: Order[]= [];
  OptionSnack: Option[]= [];

  constructor(private enviarOrden: ManageDBService) { }
  MostrarOrden(){
    this.enviarOrden.getListOrders().snapshotChanges()
    .subscribe(item => {
      this.dataSource = Array<Order>();
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.dataSource.push(x as Order)
      })
    });
  }

  MostrarTipo(key: string){
    let retorno ="No se encontro nada"
    this.OptionSnack.forEach(element => {
      if(element.$key==key){
        return element.description;
      }
      return retorno;
    });
  }
  
  ngOnInit() {
    this.MostrarOrden();
    
  }
  displayedColumns: string[] = ['Usuario', 'tp_snack'];
  prueba(key: string){

    console.log(this.OptionSnack);
  
  }
  

}
