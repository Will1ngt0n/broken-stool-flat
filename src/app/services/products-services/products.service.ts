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

  addItem(department, selectedCategory,  itemName, description, price, size, accessory, summer, color){
    console.log(department);
    console.log(selectedCategory);
    return firebase.firestore().collection('Products').doc(department).collection(selectedCategory).doc('Item').collection('Product').add({
      quantity: 1,
      color: color,
      // brand: department,
      // category: selectedCategory,
      price : price,
      size : size,
      name : itemName,
      description : description,
      isAccerory: accessory,
      isSummer: summer,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()
    }).then(result => {
      console.log(result);
      
      if(department === 'Dankie Jesu'){
        if(summer === true){
          firebase.firestore().collection('Brands').doc(department).collection('Summer').doc(result.id).set({
            timestamp : firebase.firestore.FieldValue.serverTimestamp()
          })
        }else if(summer === false){
          firebase.firestore().collection('Brands').doc(department).collection('Winter').doc(result.id).set({
            timestamp : firebase.firestore.FieldValue.serverTimestamp()
          })
        }
      }
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
    return firebase.firestore().collectionGroup('Specials').get().then(result => {
      let sales : Array<any> = []
      for(let key in result.docs){
        
        let productID = result.docs[key].id
        console.log(productID);
      console.log(result.docs[key].data());
      let data = result.docs[key].data()
      sales.push({description: data['description'], productID: productID, name: data['name'], category : data['category'], brand : data['brand'], normalPrice : data['price'], salePrice: data['saleprice'], startDate : data['startDate'], endDate : data['endDate']})
      }
      console.log(sales);
      return sales
    })
  }
  getEver(){
    return firebase.firestore().collection('Product').get().then(result => {
      let sales : Array<any> = []
      console.log(Object(result.docs));
      
      for(let key in result.docs){
        console.log(key);
        //console.log(result.query);
        console.log(result[key].data().productsRef);

        
        
      //   let productID = result.docs[key].id
      //   console.log(productID);
      // console.log(result.docs[key].data());
      // let data = result.docs[key].data()
      // sales.push({description: data['description'], productID: productID, name: data['name'],category : data['category'], brand : data['brand'], normalPrice : data['price'], salePrice: data['saleprice'], startDate : data['startDate'], endDate : data['endDate']})
      }
      console.log(sales);
      return sales
    })
  }
  getAllSalesdddddd(){
    return firebase.firestore().collection('Products').where('onSale', '==', true).get().then(result => {
      let sales : Array<any> = []
      for(let key in result.docs){
        
        let productID = result.docs[key].id
        console.log(productID);
      console.log(result.docs[key].data());
      let data = result.docs[key].data()
      sales.push({description: data['description'], productID: productID, name: data['name'],category : data['category'], brand : data['brand'], normalPrice : data['price'], salePrice: data['saleprice'], startDate : data['startDate'], endDate : data['endDate']})
      }
      console.log(sales);
      return sales
    })
  }
  getBrandSales(query){
    //console.log(que);
    
    return firebase.firestore().collection('Specials').doc(query).collection('Bucket Hats').doc('Items').collection('Product').get().then(result => {
      let sales : Array<any> = []
      console.log(result);
      
      for(let key in result.docs){
        console.log(key);
        let productID = result.docs[key].id
        console.log(productID);
      console.log(result.docs[key].data());
      let data = result.docs[key].data()
      sales.push({productID: productID, category : data['category'], brand : data['brand'], currentPrice : data['currentPrice'], startDate : data['startDate'], endDate : data['endDate']})
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
    return firebase.firestore().collection('Products').where('brand', '==', 'Dankie Jesu').where('isSummer', '==', true).orderBy('timestamp', 'desc').limit(5).get().then(result => {
      console.log(result);
      let data = []
      for(let key in result.docs){
        let productID = result.docs[key].id
        let item = result.docs[key].data()
        data.push({productID : productID, brand: item['brand'], category : item['category'], description : item['description'], group : item['group'], name : item['name'], price : item['price']})
      }
      console.log(data);
      return data
    })
  }
  getRecentWinterItems(){
    return firebase.firestore().collection('Products').where('brand', '==', 'Dankie Jesu').where('isSummer', '==', false).orderBy('timestamp', 'desc').limit(5).get().then(result => {
      console.log(result);
      let data = []
      for(let key in result.docs){
        let productID = result.docs[key].id
        console.log(productID);
        
        let item = result.docs[key].data()
        data.push({productID : productID, brand: item['brand'], category : item['category'], description : item['description'], group : item['group'], name : item['name'], price : item['price']})
      }
      console.log(data);
      return data
    })
  }
  getKwangaRecentItems(){
    return firebase.firestore().collection('Products').where('brand', '==', 'Kwanga').orderBy('timestamp', 'desc').get().then(result => {
      console.log(result);
      let data = []
      for(let key in result.docs){
        let productID = result.docs[key].id
        let item = result.docs[key].data()
        data.push({productID : productID, brand: item['brand'], category : item['category'], description : item['description'], group : item['group'], name : item['name'], price : item['price']})
      }
      console.log(data);
      return data
    })
  }
  getBrandProducts(){
    return firebase.firestore().collection('Brands').get().then(result => {
      console.log(result);
      let brands : Array<any> = []
      for(let i in result.docs){
        console.log(i);
        console.log(result.docs[i].data());
        console.log(result.docs[i].id);
       let pi = result.docs[i].data()
        for(let p in pi){
          brands.push({id :result.docs[i].id, products: result.docs[i].data().products})
        }

        
      }
      console.log(brands);
      return brands
    })
  }

  getProducts(){
    return firebase.firestore().collectionGroup('Product').get().then(result => {
      console.log(result);
      let products : Array<any> = []
      for(let i in result.docs){
        let ID = result.docs[i].id
        console.log(ID);
        
        products.push({productID : ID, product : result.docs[i].data()})
      }
      console.log(products);
      return products
    })
  }
  deleteSpecialsItem(productID){
    return firebase.firestore().collection('Specials').doc(productID).delete().then(result => {
      console.log(result);
      return result
    })
  }
  hideItem(productID){
    return firebase.firestore().collection('Specials').doc(productID).update({
      hideItem : true
    }).then(result => {
      console.log(result);
    })
  }
  
  getSeasonalRecentItems(query){
    return firebase.firestore().collection('Brands').doc('Dankie Jesu').collection(query).orderBy('timestamp', 'desc').limit(5).get().then(result => {
      console.log(result);
      let data : Array<any> = []
      let list : Array<any> = []
      for(let i in result.docs){
        console.log(result.docs[i].data());
        console.log(result.docs[i].id);
        
        data.push(result.docs[i].id)
        console.log(data);
        
      }
      list = data[0]
      console.log(list);
      
      return data
    })
  }
  getKwangaPopularItems(){
    return firebase.firestore().collection('Brands').doc('Kwanga').collection('products').orderBy('itemsSold', 'desc').get().then(result => {
      console.log(result);
      let data : Array<any> = []
      for(let key in result.docs){
        console.log(result.docs[key].data());
        data.push({productID : result.docs[key].id, itemsSold: result.docs[key].data().itemsSold})
      }
      return data
    })
  }
}
