import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Order } from '../models/Order';
import { Option } from '../models/Option';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ManageDBService {

  listOrders: AngularFireList<Order>;
  listOptions: AngularFireList<Option>;
  listUser: AngularFireList<User>;
  listUserAproved: AngularFireList<User>;

  constructor(private firebase:AngularFireDatabase) { }

  initListOrders(){
    this.listOrders = this.firebase.list('Orders');
  }
  initListOptions(){
    this.listOptions = this.firebase.list('Options');
  }
  initListUser(){
    this.listUser = this.firebase.list('Users');
  }
  initListUserAproved(){
    this.listUser = this.firebase.list('UsersAproved');
  }

  getListOrders(){
    this.initListOrders();
    return this.listOrders;
  }
  getListOptions(){
    this.initListOptions();
    return this.listOptions;
  }  
  getListUser(){
    this.initListUser();
    return this.listUser;
  } 
  getListUserAproved(){
    this.initListUserAproved();
    return this.listUserAproved;
  }
  updateListOrders(order:Order){
    this.initListOrders();
    this.listOrders.update(order.$key,order);
  }
  
  updateListOptions(option:Option){
    this.initListOrders();
    this.listOptions.update(option.$key,option);
  }
  updateListUser(user:User){
    this.initListUser();
    this.listUser.update(user.$key,user);
  }
  updateListUserAproved(user:User){
    this.initListUserAproved();
    this.listUserAproved.update(user.$key,user);
  }
  insertListOptions(option:Option){
    this.initListOrders();
    this.listOptions.push(option).set;
  }
  insertListOrders(order:Order){
    this.initListOptions();
    this.listOrders.push(order).set;
  }
  insertListUser(user:User){
    this.initListUser();
    this.listUser.push(user).set;
  }
  insertListUserAproved(user:User){
    this.initListUserAproved();
    this.listUserAproved.push(user).set;
  }

  //Delete

  deleteListUser($key: string){
    this.initListUser();
    this.listUser.remove($key);
  }
  deleteListUserAproved($key: string){
    this.initListUserAproved();
    this.listUserAproved.remove($key);
  }
  deleteListOptions($key: string){
    this.initListOptions();
    this.listOptions.remove($key);
  }
  deleteListOrders($key: string){
    this.initListOrders();
    this.listOrders.remove($key);
  }
  
  
}
