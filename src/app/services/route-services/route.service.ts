import { Injectable } from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  link
  parameters : object 
  constructor( private localStorage : LocalStorageService) { }
  storeParemeter (category, brand, title, link){
    return new Promise((resolve, reject) => {
      this.parameters = {category: category, brand: brand, title: title, link: link}
      this.localStorage.store('parameters', this.parameters)
      resolve ('success')
    })
  }

  readParameters(){
    return new Promise((resolve, reject) => {
      resolve (this.localStorage.retrieve('parameters'))
    })
  }
}
