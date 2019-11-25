import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsRef
  new
  products = []
  constructor() {
    this.products = []
  }
  addItem(department, selectedCategory,  itemName, description, price, size, accessory, summer){
    console.log(department);
    console.log(selectedCategory);
    return firebase.firestore().collection('Products').doc(department).collection(selectedCategory).add({
      price : price,
      size : size,
      name : itemName,
      description : description,
      isAccerory: accessory,
      isSummer: summer
    })
  }

  getCategories(){
    return firebase.firestore().collection('Products').doc('Winter').collection('Hat 500').get().then(result => {
      console.log(result);
      for(let key in result.docs){
        console.log(result.docs[key].data());
        
      }
      let data = result.docs
      console.log(data.values());
      
      
    })
  }
}
