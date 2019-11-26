import { Injectable, Query } from '@angular/core';
import * as firebase from 'firebase'
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsRef
  new
  products : Array<any> = []
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
      isSummer: summer,
      timeStamp : firebase.firestore.FieldValue.serverTimestamp()
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
  getAllSales(){
    return firebase.firestore().collection('Specials').get().then(result => {
      let sales : Array<any> = []
      for(let key in result.docs){
        console.log(key);
        let productID = result.docs[key].id
        console.log(productID);
      console.log(result.docs[key].data());
      let data = result.docs[key].data()
      sales.push({productID: productID, category : data['category'], brand : data['Brand'], currentPrice : data['currentPrice'], startDate : data['startDate'], endDate : data['endDate']})
      }
      console.log(sales);
      return sales
    })
  }
  getBrandSales(query){
    return firebase.firestore().collection('Specials').where("Brand", "==", query).get().then(result => {
      let sales : Array<any> = []
      for(let key in result.docs){
        console.log(key);
        let productID = result.docs[key].id
        console.log(productID);
      console.log(result.docs[key].data());
      let data = result.docs[key].data()
      sales.push({productID: productID, category : data['category'], brand : data['Brand'], currentPrice : data['currentPrice'], startDate : data['startDate'], endDate : data['endDate']})
      }
      console.log(sales);
      return sales
    })
  }
  getSales(query){
    console.log(query);
    if(query === 'viewAll'){
      return this.getAllSales().then(result => { 
        return result  
      })
    }else{
      return this.getBrandSales(query).then(result => {
        return result
      })
    }
  }
  getRecentSummerItems(){
    return firebase.firestore().collection('Products').where('Brand', '==', 'Dankie Jesu').where('group', '==', 'summer').orderBy('timestamp', 'desc').limit(5).get().then(result => {
      console.log(result);
      let data = []
      for(let key in result.docs){
        let productID = result.docs[key].id
        let item = result.docs[key].data()
        data.push({productID : productID, Brand: item['Brand'], category : item['category'], description : item['description'], group : item['group'], name : item['name'], price : item['price']})
      }
      console.log(data);
      
    })
  }
}
