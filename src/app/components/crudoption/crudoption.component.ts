import { Component, OnInit } from '@angular/core';
import { Option } from '../../models/Option';
import { NgForm, FormGroup,FormControl,Validators } from '@angular/forms';
import { ManageDBService } from '../../Services/manage-db.service';
@Component({
  selector: 'app-crudoption',
  templateUrl: './crudoption.component.html',
  styleUrls: ['./crudoption.component.css']
})
export class CRUDoptionComponent implements OnInit {
  AddSnackForm : FormGroup;
  displayedColumns: string[] = ['description','Eliminar'];
  dataSource = [];
  constructor(private manageBD: ManageDBService) { }

  ngOnInit() {
    this.AddSnackForm = new FormGroup({
      typeSnack: new FormControl('',[
        Validators.required])
    });
    this.getSnacksList();
  }
  getSnacksList(){
    this.manageBD.getListOptions().snapshotChanges().subscribe(item => {
      this.dataSource = Array<Option>();
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.dataSource.push(x as Option)
        console.log(x);
      })
    });
  }
  addSnack(){
    let objeto =new Option();
    objeto.description=this.AddSnackForm.get('typeSnack').value;
    this.manageBD.insertListOptions(objeto);
    this.AddSnackForm.reset();
  }
  delSnack(k: string ){
    this.manageBD.deleteListOptions(k);
  }

  getErrorMessage(control:string) {
    if(control=='typeSnack')
    return this.AddSnackForm.get(control).hasError('required') ? 'Debe ingresar el tipo de snack' :'';
  }

}
