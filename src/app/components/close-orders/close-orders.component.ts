import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarRef } from '@angular/material';
import { ManageDBService } from '../../Services/manage-db.service';

@Component({
  selector: 'app-close-orders',
  templateUrl: './close-orders.component.html',
  styleUrls: ['./close-orders.component.css']
})
export class CloseOrdersComponent implements OnInit {
  //refSnackBar:MatSnackBarRef<any>;
  constructor(public snackBar: MatSnackBar,
    public dbService: ManageDBService) { }

  ngOnInit() {
    this.openSnackBar("Esta Seguro Que Desea Finalizar Los Ingresos", "SI");
  }
  openSnackBar(message: string, action: string) {
    //this.refSnackBar = 
    this.snackBar.open(message, action, {
      duration: 5000,
    }).onAction().subscribe(()=>{
      this.closeOrders();
    });
    //this.refSnackBar
  }

  closeOrders(){
    this.dbService.updateListEnableSystem(false);
  }



}
