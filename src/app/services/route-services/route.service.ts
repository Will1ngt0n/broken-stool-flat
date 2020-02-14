import { Injectable } from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import { Location } from '@angular/common'
@Injectable({
  providedIn: 'root'
})
export class RouteService {
  link
  parameters : object 
  constructor( private localStorage : LocalStorageService, private loc : Location) { }
  storeParemeter (category, brand, title, link){
    return new Promise((resolve, reject) => {
      this.parameters = {category: category, brand: brand, title: title, link: link}
      let loc = this.loc['_platformLocation'].location.origin
      this.localStorage.store('parameters:' + loc, this.parameters)
      resolve ('success')
    })
  }

  readParameters(){
    return new Promise((resolve, reject) => {
      let loc = this.loc['_platformLocation'].location.origin
      resolve (this.localStorage.retrieve('parameters:' + loc))
    })
  }
}
