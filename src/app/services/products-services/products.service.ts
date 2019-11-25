import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsRef
  constructor() {
    //this.productsRef = firebase.firestore().collection('Products').doc('Winter')
  }
  addItem(department, selectedCategory,  itemName, description, price, size){
    return this.productsRef.doc(department).collection(selectedCategory).add({
      price : price,
      size : size,
      name : itemName,
      description : description,
    })
  }

  getCategories(){
    return firebase.firestore().collection('Products').doc('Winter').get().then(result => {
      console.log(result.data());
      
    })
  }
}
