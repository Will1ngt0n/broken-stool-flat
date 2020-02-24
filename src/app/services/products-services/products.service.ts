import { Injectable} from '@angular/core';
import * as firebase from 'firebase'
import * as moment from 'moment';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsRef
  new
  products : Array<any> = []
  constructor(public loadingCtrl: LoadingController) {
    this.products = []
  }
  addItem(brand, brandID, selectedCategory, selectedCategoryID, itemName, description, price, size, accessory, summer, color, picture, productCode){
    let resultID
return new Promise((resolve, reject)  => {
      firebase.firestore().collection('Products').add({
        quantity: 1,
        color: color,
        brand: brand,
        brandID: brandID,
        category: selectedCategory,
        categoryID: selectedCategoryID,
        productCode: productCode,
        pictureLink: 'none',
        price : Number(price),
        size : size,
        name : itemName,
        hideItem : true,
        description : description,
        isAccessory: accessory,
        isSummer: summer,
        onSale: false,
        timestamp : firebase.firestore.FieldValue.serverTimestamp(),
        dateAdded : moment(new Date()).format('LLLL')
      }).then(result => {
        console.log(result.id);
        resultID = result.id
        console.log(resultID);
        
      })
    .then( (result) => { // (***)
      console.log(result, 'fourth chain');
      let storageRef = firebase.storage().ref('clothes/' + resultID)
      console.log(picture);
      storageRef.put(picture).then((data : any) => {
        console.log(data, 'fifth chain');
        console.log(data);
        data.ref.getDownloadURL().then(url => {
          console.log(url, 'sixth chain');
          firebase.firestore().collection('Products').doc(resultID).update({
            pictureLink: url,
            hideItem: false
          }).then(result => {
    resolve ('success')
    return 'sucesss'
    //return
          })
        })
      })
    })
  }).then(result => {

    return 'success'
  })

  }
  addItems(department, selectedCategory,  itemName, description, price, size, accessory, summer, color, picture){
   // console.log(department);
  //  console.log(selectedCategory);
    return firebase.firestore().collection('Products').doc(department).collection(selectedCategory).add({
      quantity: 1,
      color: color,
      // brand: department,
      // category: selectedCategory,
      pictureLink: 'none',
      price : Number(price),
      size : size,
      name : itemName,
      hideItem : true,
      description : description,
      isAccessory: accessory,
      isSummer: summer,
      onSale: false,
      timestamp : firebase.firestore.FieldValue.serverTimestamp(),
      dateAdded : moment(new Date()).format('LLLL')
    }).then(result => {
    //  console.log(result);
      
      // if(department === 'Dankie Jesu'){
      //   if(summer === true){
      //     firebase.firestore().collection('Brands').doc(department).collection('Summer').doc(result.id).set({
      //       timestamp : firebase.firestore.FieldValue.serverTimestamp()
      //     })
      //   }else if(summer === false){
      //     firebase.firestore().collection('Brands').doc(department).collection('Winter').doc(result.id).set({
      //       timestamp : firebase.firestore.FieldValue.serverTimestamp()
      //     })
      //   }
      // }
      // firebase.firestore().collection('NumberOfProducts').doc('MwjotZqh3JPKx0qEcuui').get().then(result => {
      //   let number : string = String(Number(result.data().numberOfProducts) + 1)
      //   firebase.firestore().collection('NumberOfProducts').doc('MwjotZqh3JPKx0qEcuui').update({
      //     numberOfProducts: number
      //   })
      // })

      let storageRef = firebase.storage().ref('clothes/' + result.id)
      console.log(picture);
      
      storageRef.put(picture).then((data) => {
        console.log(data);
        data.ref.getDownloadURL().then(url => {
          firebase.firestore().collection('Products').doc(department).collection(selectedCategory).doc(result.id).update({
            pictureLink: url,
            hideItem: false
          })
        })
        console.log('Saved');
      })
    })
  }

  getAllSales(brand, category){
    return firebase.firestore().collection('Specials').doc(brand).collection(category).get().then(result => {
      let sales : Array<any> = []
      for(let key in result.docs){
        
        let productID = result.docs[key].id
     //   console.log(productID);
    //  console.log(result.docs[key].data());
      let data = result.docs[key].data()
      sales.push({productID: productID, data : data})
    }
    return sales
  })
  
  }
  getProduct(brand, category, productID, data){
    return firebase.firestore().collection('Products').doc(brand).collection(category).doc(productID).get().then(product => {
      let productData : Object = {}
      let sales : Array<any> = []
      //console.log(product.data());
      productData = product.data()
      if(productData){
      //  console.log(productData['name']);
        sales.push({
          productID: productID,
          data : {
            brand: brand,
            category: category,
            name: productData['name'],
            salePrice: data['data']['saleprice'],
            description: productData['description'],
            dateAdded : productData['dateAdded'],
            isAccessory: productData['isAccessory'],
            isSummer: productData['isSummer'],
            normalPrice: productData['price'],
            quantity: productData['quantity'],
            size : productData['size']
          }
        })
      //  console.log(sales);
      }
      return sales
    })
  }
  getEver(){
    return firebase.firestore().collection('Product').get().then(result => {
      let sales : Array<any> = []
     // console.log(Object(result.docs));
      
      for(let key in result.docs){ 
     //   console.log(key);
        //console.log(result.query);
      //  console.log(result[key].data().productsRef);

        
        
      //   let productID = result.docs[key].id
      //   console.log(productID);
      // console.log(result.docs[key].data());
      // let data = result.docs[key].data()
      // sales.push({description: data['description'], productID: productID, name: data['name'],category : data['category'], brand : data['brand'], normalPrice : data['price'], salePrice: data['saleprice'], startDate : data['startDate'], endDate : data['endDate']})
      }
     // console.log(sales);
      return sales
    })
  }

  getBrandSales(){
    return firebase.firestore().collection('Specials').get().then(result => {
      let sales : Array<any> = []
      console.log(result);
      
      for(let key in result.docs){
          let productID = result.docs[key].id
          let docData = result.docs[key].data()
          console.log(docData);
          
          sales.push({productID: productID, data: docData, category: docData.category, brand: docData.brand, link: docData.pictureLink})
        }
        if(sales.length !== 0){
          return sales
        }
      })
  }
  // getSales(query){
  //   console.log(query);
  //   if(query === 'viewAll'){
  //     return this.getAllSales().then(result => { 
  //       return result  
  //     })
  //   }else{
  //     return this.getBrandSales(query).then(result => {
  //       return result
  //     })
  //   }
  // }
  getRecentSummerItems(){
    return firebase.firestore().collection('Products').where('brand', '==', 'Dankie Jesu').where('isSummer', '==', true).orderBy('timestamp', 'desc').limit(5).get().then(result => {
    //  console.log(result);
      let data = []
      for(let key in result.docs){
        let productID = result.docs[key].id
        let item = result.docs[key].data()
        data.push({productID : productID, brand: item['brand'], category : item['category'], description : item['description'], group : item['group'], name : item['name'], price : item['price']})
      }
    //  console.log(data);
      return data
    })
  }
  getRecentWinterItems(){
    return firebase.firestore().collection('Products').where('brand', '==', 'Dankie Jesu').where('isSummer', '==', false).orderBy('timestamp', 'desc').limit(5).get().then(result => {
     // console.log(result);
      let data = []
      for(let key in result.docs){
        let productID = result.docs[key].id
       // console.log(productID);
        
        let item = result.docs[key].data()
        data.push({productID : productID, brand: item['brand'], category : item['category'], description : item['description'], group : item['group'], name : item['name'], price : item['price']})
      }
     // console.log(data);
      return data
    })
  }
  getKwangaRecentItems(){
    return firebase.firestore().collection('Products').where('brand', '==', 'Kwanga').orderBy('timestamp', 'desc').get().then(result => {
    // console.log(result);
      let data = []
      for(let key in result.docs){
        let productID = result.docs[key].id
        let item = result.docs[key].data()
        data.push({productID : productID, brand: item['brand'], category : item['category'], description : item['description'], group : item['group'], name : item['name'], price : item['price']})
      }
     // console.log(data);
      return data
    })
  }
  getBrandProducts(){
    return firebase.firestore().collection('Brands').get().then(result => {
     // console.log(result);
      let brands : Array<any> = []
      for(let i in result.docs){
     //  console.log(i);
    //    console.log(result.docs[i].data());
     //   console.log(result.docs[i].id);
       let pi = result.docs[i].data()
        for(let p in pi){
          brands.push({id :result.docs[i].id, products: result.docs[i].data().products})
        }

        
      }
     // console.log(brands);
      return brands
    })
  }

  deleteSpecialsItem(productID, item){
    return firebase.firestore().collection('Specials').doc(productID).delete().then(result => {
      firebase.firestore().collection('Products').doc(item.brand).collection(item.category).doc(productID).update({
        onSale : false,
        discount : 0,
        saleprice : Number(item.data.normalPrice)
      })
      return result
    }).catch(error => {
      return 'Not deleted'
    })
  }
  hideItem(productID, item){
    return firebase.firestore().collection('Specials').doc(item.data.brand).collection(item.data.category).doc(productID).update({
      hideItem : true
    }).then(result => {
     // console.log(result);
    })
  }

  showItem(productID, item){
    return firebase.firestore().collection('Specials').doc(item.data.brand).collection(item.data.category).doc(productID).update({
      hideItem : false
    }).then(result => {
     // console.log(result);
    })
  }
  updateSpecialsItem(productID, item, newPrice, newPricePercentage, newStartDate, newEndDate){
    return firebase.firestore().collection('Specials').doc(item.data.brand).collection(item.data.category).doc(productID).update({
      saleprice: Number(newPrice),
      endDate: newEndDate,
      startDate: newStartDate,
      discount: newPricePercentage
    })
  }
  
  getSeasonalRecentItems(query){
    return firebase.firestore().collection('Brands').doc('Dankie Jesu').collection(query).orderBy('timestamp', 'desc').limit(5).get().then(result => {
     // console.log(result);
      let data : Array<any> = []
      let list : Array<any> = []
      for(let i in result.docs){
       // console.log(result.docs[i].data());
      //  console.log(result.docs[i].id);
        
        data.push(result.docs[i].id)
      //  console.log(data);
        
      }
      list = data[0]
      //console.log(list);
      
      return data
    })
  }
  getKwangaPopularItems(){
    return firebase.firestore().collection('Brands').doc('Kwanga').collection('products').orderBy('itemsSold', 'desc').get().then(result => {
  //    console.log(result);
      let data : Array<any> = []
      for(let key in result.docs){
       // console.log(result.docs[key].data());
        data.push({productID : result.docs[key].id, itemsSold: result.docs[key].data().itemsSold})
      }
      return data
    })
  }

  // getNumberOfProducts(){
  //   return firebase.firestore().collection('NumberOfProducts').doc('MwjotZqh3JPKx0qEcuui').get().then(result => {
  //     console.log(result.data());
  //     let number : number = 0
  //     number = result.data().numberOfProducts
  //     console.log(number);
      
  //     return number
  //   })
  // }
  loadCategoryItems(category, brand){
   // console.log(brand);
   // console.log(category);
    
    return firebase.firestore().collection('Products').doc(brand).collection(category).orderBy('dateAdded', 'desc').get().then(result => {
      //console.log(result.docs);
      //console.log(result);
      let data : Array<any> = []
      for(let key in result.docs){
      //  console.log('sdfdsfs');
      //  console.log(result.docs[key].data());
        let productID = result.docs[key].id
        let docData = result.docs[key].data()
        //console.log(docData);
        
        data.push({productID: productID, data: docData, category: category, brand: brand})
      }
      //console.log(data);
      if(data.length !== 0){
        return data
      }
    })
    
  }
  deleteItemFromInventory(productID, brand, category, item){
    console.log(item);
    console.log(productID);
    console.log(brand);
    console.log(category);
    console.log(item);
    
    
    return firebase.firestore().collection('Products').doc(brand).collection(category).doc(productID).delete().then( result => {
      //this.updateNumberOfItems()
      if(item.data.onSale){
        if(item.data.onSale === true){
          console.log(item.data.onSale);
          firebase.firestore().collection('Specials').doc(productID).delete().then(result => {

          })
        }
      }
      // firebase.firestore().collection('NumberOfProducts').doc('MwjotZqh3JPKx0qEcuui').get().then(result => {
      //   let number : string = String(Number(result.data().numberOfProducts) - 1)
      //   firebase.firestore().collection('NumberOfProducts').doc('MwjotZqh3JPKx0qEcuui').update({
      //     numberOfProducts: number
      //   })
      // })
      return 'Deleted'
    })
  }
  // updateNumberOfItems(){  //Cloud Function?
  //   return firebase.firestore().collection('NumberOfProducts').doc('MwjotZqh3JPKx0qEcuui').get().then(result => {
  //     let numberOfProducts = result.data().numberOfProducts - 1
  //     console.log(numberOfProducts);
      
  //     firebase.firestore().collection('NumberOfProducts').doc('MwjotZqh3JPKx0qEcuui').update({
  //       numberOfProducts: numberOfProducts
  //     })
  //   })

  // }
  hideProduct(productID, brand, category, item){
    console.log(productID);
    console.log(brand);
    console.log(category);
    console.log(item);
    
    return firebase.firestore().collection('Products').doc(brand).collection(category).doc(productID).update({
      hideItem : true
    }).then(result => {
     // console.log(result);
     if(item.data.onSale){
       if(item.data.onSale === true){
          this.hideItem(productID, item)
       }
     }
     return 'success'
    }).catch(error => {
      console.log(error);
      
      return 'error'
    })
  }
  showProduct(productID, brand, category, item){
    console.log(productID);
    console.log(brand);
    console.log(category);
    console.log(item);
    
    
    
    
    return firebase.firestore().collection('Products').doc(brand).collection(category).doc(productID).update({
      hideItem : false
    }).then(result => {
     // console.log(result);
     if(item.data.onSale){
       if(item.data.onSale === true){
         this.showItem(productID, item)
       }
     }
     return 'success'
    }).catch(error => {
      console.log(error);
      return 'error'
    })
  }
  updateItemsListItem(itemID, itemBrand, itemCategory, itemPrice, itemDescription, itemName, sizes, picture, colors){
    console.log(picture,' I am pictrue');
    return new Promise( (resolve, reject) => {
      firebase.firestore().collection('Products').doc(itemBrand).collection(itemCategory).doc(itemID).update({
        price : Number(itemPrice),
        description : itemDescription,
        name : itemName,
        size: sizes,
        color: colors
      })
      .then(result => {
        if(picture !== undefined){
          console.log(picture);
          
          firebase.storage().ref('clothes/' + itemID).put(picture)
          .then(result => {
              console.log(result);
              result.ref.getDownloadURL()
              .then(url => {
                firebase.firestore().collection('Products').doc(itemBrand).collection(itemCategory).doc(itemID).update({
                 pictureLink: url,
                  hideItem: false
                })
                .then( () => {
                  resolve ('success')
                })
              })
              console.log('Sad');
          })
        }else{
          console.log('Picture is undefined');
          resolve ('success')
        }

      })
    })


  }
  updateItem(itemID, itemBrand, itemCategory, itemPrice, itemDescription, itemName, sizes){
    return firebase.firestore().collection('Products').doc(itemBrand).collection(itemCategory).doc(itemID).update({
      price : Number(itemPrice),
      description : itemDescription,
      name : itemName,
      size: sizes
    }).then(result => {

      return 'success'
    })
  }
  updateProduct(productID, brand, category, itemName, itemDescription, itemPrice, picture){
    if(picture !== undefined){
      firebase.storage().ref('clothes/' + productID).put(picture).then(result => {

      })
    }
    return firebase.firestore().collection('Products').doc(brand).collection(category).doc(productID).update({
      price : Number(itemPrice),
      description : itemDescription,
      name : itemName
    }).then(result => {

      return 'Successfully updated product'
    }).catch(result => {
      return 'Product could not be updated'
    })
  }
  promoteItem(price, percentage, startDate, endDate, itemBrand, itemCategory, itemID, itemName, itemImageLink, description, selectedItem){
    console.log(selectedItem);
    
    return firebase.firestore().collection('Specials').doc(itemID).set({
      saleprice : Number(price),
      discount: percentage,
      startDate : startDate,
      endDate : endDate,
      hideItem : false,
      brand: itemBrand,
      category: itemCategory,
      pictureLink: itemImageLink,
      name: itemName,
      description: description,
      isAccessory: selectedItem.data.isAccessory,
      isSummer: selectedItem.data.isSummer,
      color: selectedItem.data.color,
      quantity: selectedItem.data.quantity,
      size: selectedItem.data.size,
      normalPrice: Number(selectedItem.data.price),
      // hideItem: false,
      timestamp : firebase.firestore.FieldValue.serverTimestamp(),
    }).then(result => {
     // console.log(result);
        return firebase.firestore().collection('Products').doc(itemBrand).collection(itemCategory).doc(itemID).update({
          onSale: true,
          saleprice: Number(price),
          discount: percentage
        }).then(status => {
          return 'success'
        })
    })
  }

  getInventory(){
    
  }
  
  getPendingOrdersSnap(){
    return firebase.firestore().collection('Order').orderBy('timestamp', 'desc').onSnapshot(result => {
      let pendingOrder = []
     // console.log(result);
      
      for(let key in result.docs){
      //  console.log(result.docs[key].id);
        let refNo = result.docs[key].id
       // console.log(result.docs[key].data());
        let data = result.docs[key].data()
        let userID = data.userID
        console.log(userID);
        //this.loadUser(userID)

        pendingOrder.push({refNo : refNo, details : data, noOfItems: data.product.length})
      };
      console.log('Snapped', pendingOrder);
      
      return pendingOrder
      })
  }
  getPendingOrders(){
    return firebase.firestore().collection('Order').get().then(result => {
      let pendingOrder = []
     // console.log(result);
      
      for(let key in result.docs){
      //  console.log(result.docs[key].id);
        let refNo = result.docs[key].id
       // console.log(result.docs[key].data());
        let data = result.docs[key].data()
        let userID = data.userID
        console.log(userID);
        //this.loadUser(userID)

        pendingOrder.push({refNo : refNo, details : data, noOfItems: data.product.length})
      };
      if(pendingOrder.length > 0){
        return pendingOrder
      }else if(pendingOrder.length === 0){
        return null
      }
      })
  }
  loadUser(userID){
    return firebase.firestore().collection('userProfile').doc(userID).get().then(data => {
      let user
      let userName = data.data().name
      let number = data.data().cellPhone
      let userID = data.id
      let address = data.data().address
      //console.log(userName, userID);
      user = {name: userName, userID: userID, cell: number, address: address}
      return user
    })
  }
  getReadyOrders(){
    return firebase.firestore().collection('Order').where('status', '==', 'ready').get().then(result => {
      let readyOrder = []
     // console.log(result);
      
      for(let key in result.docs){
       // console.log(result.docs[key].id);
        let refNo = result.docs[key].id
       // console.log(result.docs[key].data());
        let data = result.docs[key].data()
        readyOrder.push({refNo : refNo, details : data})
      }
      return readyOrder
    })
  }
  //getClosedOrders()
  //retrieving all order history
  getOrderHistory(){
    return firebase.firestore().collection('orderHistory').orderBy('timestamp', 'desc').get().then(result => {
      let closedOrder = []
      //console.log(result);
      
      for(let key in result.docs){
      //  console.log(result.docs[key].id);
        let refNo = result.docs[key].id
       // console.log(result.docs[key].data());
        let data = result.docs[key].data()
        closedOrder.push({refNo : refNo, details : data})
      };
      console.log(closedOrder);
        return closedOrder
      })
  }

  //closeOrder(),
  //similar to orderCollected() ln 457 but for delivery
  closedOrder(orderID){
    return firebase.firestore().collection('Order').doc(orderID).update({
      status : 'closed'
      //status: 'collected' ?
    })
  }
  closedOrders(refNo, status, userID, products, deliveryType, purchaseDate, date, pdf){
    return new Promise( (resolve, reject) => {
      
      firebase.firestore().collection('orderHistory').doc(refNo).set({
        status: status,
        timestamp: date,
        refNo: refNo,
        uid: userID,
        orders: products,
        deliveryType: deliveryType,
        purchaseDate: purchaseDate
      }).then( result => {
        firebase.firestore().collection('Order').doc(refNo).delete().then(result => {
          console.log('deleted');
          return 'Order has been deleted'
        })
      }).then(result => {
        console.log(result, 'fourth chain');
        let storageRef = firebase.storage().ref('Reciepts/' + refNo)
        storageRef.put(pdf).then((data : any) => {
          console.log(data, 'fifth chain');
          console.log(data);
          data.ref.getDownloadURL().then(url => {
            console.log(url, 'sixth chain');
            firebase.firestore().collection('orderHistory').doc(refNo).update({
              receipt: url,
            })
            resolve ('success')
          })
        })
      })
    })

  }
  updateQuantity(brand, category, productID, quantity){
    return firebase.firestore().collection('Products').doc(brand).collection(category).doc(productID).update({
      quantity: quantity
    }).then( result => {
      return result
    })
  }

  getOrderDetails(refNo){
    return firebase.firestore().collection('Order').doc(refNo).get().then(result => {
      let item = result.data()
      let data : Array<any> = []
      console.log(item);
      
      data = [{details: item, refNo: refNo}]
      return data
    })
  }
  getOrderHistoryDetails(refNo){
    return firebase.firestore().collection('orderHistory').doc(refNo).get().then(result => {
      let item = result.data()
      let data : Array<any> = []
      console.log(item);
      
      data = [{details: item, refNo: refNo}]
      console.log(data);
      if(data.length > 0){
        return data
      }else if(data.length === 0){
        return null
      }

    })
  }
  //orderReady(), orderCollected, cancelOrder(), processOrder()
  //four functions from pending-orders page. changing order status
  // only using processOrder()
  orderReady(refNo){
    return firebase.firestore().collection('Order').doc(refNo).update({
      status: 'ready'
    })
  }
  orderCollected(refNo){
    return firebase.firestore().collection('Order').doc(refNo).update({
      status: 'collected'
    })
  }
  cancelOrder(refNo, status, userID, products, purchaseDate){
    return firebase.firestore().collection('orderHistory').doc(refNo).set({
      status: status,
      reciept: 'N/A',
      timestamp: new Date().getTime(),
      refNo: refNo,
      uid: userID,
      orders: products,
      purchaseDate: purchaseDate
    }).then( result => {
      return firebase.firestore().collection('Order').doc(refNo).delete().then(result => {
        console.log('deleted');
        return 'Order has been cancelled'
      })
    })
  }
  processOrder(refNo, status){
    console.log(status);
    return firebase.firestore().collection('Order').doc(refNo).update({
      status: status,
      time: new Date().getTime()
    }).then( result => {
      //console.log('success');
      
      return 'success'
      
    })
  }
  getPictures(){
    return firebase.storage().ref('clothes').listAll().then(result => {
      //let picture : object = {}
      let pictures : Array<any> = []
      for(let key in result.items){
        result.items[key].getDownloadURL().then(link => {
          let path = result.items[key].fullPath
          let splitPath = path.split('/')
          let pictureID = splitPath[splitPath.length -1]
          // picture['link'] = link
          // picture['productID'] = pictureID
          pictures.push({link : link, productID : pictureID})
          console.log(pictures);
          
         });
         console.log('idiot');
         
         console.log(pictures);
         return result
      }

      
      //return pictures
    })
  }
  refreshPendingOrder(refNo){
    return firebase.firestore().collection('Order').doc(refNo).get().then(result => {

      
      let data = result.data()
      console.log(data);
      let status = data.status
      return status
    })
  }

  loadAllProducts(){
    return new Promise((resolve, reject) => {
      firebase.firestore().collection('Products').orderBy('dateAdded', 'desc').get().then(result => {
        let data : Array<any> = []
        for(let key in result.docs){
          let productID = result.docs[key].id
          let docData = result.docs[key].data() 
          data.push({productID: productID, data: docData, category: docData['category'], categoryID: docData['categoryID'], brand: docData['brand'], brandID: docData['brandID']})
        }
        resolve(data)
      }).catch(error => {
        console.log(error);
        
      })
    })
  }
  getCategories(){
    return new Promise( (resolve, reject) => {
      let brands : Array<any> = []
      let all : Array<any> = []
      firebase.firestore().collection('brands').get().then(result => {
        for(let key in result.docs){
          brands.push({ brandID: result.docs[key].id, name :result.docs[key].data().name})
        }
        console.log(brands);
        if(brands.length === 0){
          console.log('empty');
          resolve(null)
        }
      })
      .then( log => {
        firebase.firestore().collection('category').get().then(result => {
          let name : string = ''
          let isSummer : string = ''
          let categoryList : Array<any> = []
          for(let key in brands){
            categoryList = []
            for(let i in result.docs){

              let categoryID = result.docs[i].id
              let brandID = result.docs[i].data().brandID
              let category = result.docs[i].data().name
              let isSummer = result.docs[i].data().isSummer
              let isAccessory = result.docs[i].data().isAccessory
              console.log(brandID);
              let now = {category : category, isSummer: isSummer}
              if(brandID === brands[key].brandID){
                console.log(now);
                
                categoryList.push({category : category, isSummer: isSummer, isAccessory : isAccessory, categoryID: categoryID})
              }
            }
            all.push({brand: brands[key], categoryList})
            console.log(all);
            resolve(all)
          }
        })
      })
    })
  }
} 
