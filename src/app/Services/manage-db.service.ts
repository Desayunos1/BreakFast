import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Order } from '../models/Order';
import { Option } from '../models/Option';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ManageDBService {

  listOrders: AngularFireList<any>;
  listMyOrders: AngularFireList<any>;
  listOptions: AngularFireList<any>;
  listUser: AngularFireList<any>;
  listUserAproved: AngularFireList<any>;
  listEnableSystem: AngularFireList<any>;

  private urlOrders:string ='Orders';
  private urlOptions:string ='Options';
  private urlUsers:string ='Users';
  private urlUsersAproved:string ='UsersAproved';
  private urlEnableSystem:string ='EnableSystem';

  constructor(private firebase:AngularFireDatabase) { }


  initListOrders(){
    this.listOrders = this.firebase.list(this.urlOrders);
  }
  initMyOrder(key:string){
    this.listMyOrders = this.firebase.list(this.urlOrders+'/'+key);
  }
  initListOrdersInsert(key:string){
    this.listOrders = this.firebase.list(this.urlOrders+key);
  }
  initListOptions(){
    this.listOptions = this.firebase.list(this.urlOptions);
  }
  initListOptionsInsert(key:string){
    this.listOptions = this.firebase.list(this.urlOptions+key);
  }
  initListUser(){
    this.listUser = this.firebase.list(this.urlUsers);
  }
  initListUserInsert(key:string){
    this.listUser = this.firebase.list(this.urlUsers+key);
  }
  initListUserAproved(){
    this.listUserAproved = this.firebase.list(this.urlUsersAproved);
  }
  initListUserAprovedInsert(key:string){
    this.listUserAproved = this.firebase.list(this.urlUsersAproved+key);
  }
  
  initListEnableSystem(){
    this.listEnableSystem = this.firebase.list(this.urlEnableSystem);
  }

  getListOrders(){
    this.initListOrders();
    return this.listOrders;
  }
  getMyOrder(key:string){
    this.initMyOrder(key);
    return this.listMyOrders;
  }
  getListOptions(){
    this.initListOptions();
    return this.listOptions;
  }  
  getListUser(){
    this.initListUser();
    return this.listUser;
  }   
  getUser(user:string){
    return this.firebase.list(this.urlUsers+'/'+user);
  }   
  getUserAcepted(user:string){
    return this.firebase.list(this.urlUsersAproved+'/'+user);
  } 
  getListUserAproved(){
    this.initListUserAproved();
    return this.listUserAproved;
  }

  //Update
  updateListOrders(order:Order){
    this.initListOrders();
    this.listOrders.update(order.$key,{tp_snack:order.tp_snack, user: order.user});
  }
  
  updateListOptions(option:Option){
    this.initListOptions();
    this.listOptions.update(option.$key,{description: option.description});
  }
  updateListUser(user:User){
    this.initListUser();
    this.listUser.update(user.$key,{name: user.name,email: user.email});
  }
  updateListUserAproved(user:User){
    this.initListUserAproved();
    this.listUserAproved.update(user.$key,{name: user.name,email: user.email});
  }
  updateListEnableSystem(enableSystem:Boolean){
    this.initListEnableSystem();
    this.listEnableSystem.update('1',{enable: enableSystem});
  }

  //insert
  insertListOptions(option:Option){
    this.initListOptions();
    this.listOptions.push({description: option.description});
  }
  insertListOrders(order:Order){
    this.initListOrdersInsert(order.$key);
    this.updateListOrders(order);
  }
  insertListUser(user:User){
    this.initListUserInsert(user.$key);
    this.updateListUser(user);
  }
  insertListUserAproved(user:User){
    this.initListUserAproved();
    this.updateListUserAproved(user);
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
