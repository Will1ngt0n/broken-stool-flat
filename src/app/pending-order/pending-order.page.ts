import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products-services/products.service';
import { AuthService } from '../services/auth-services/auth.service';
import { AlertController } from '@ionic/angular';
​​import * as moment from 'moment'
declare var window
@Component({
  selector: 'app-pending-order',
  templateUrl: './pending-order.page.html',
  styleUrls: ['./pending-order.page.scss'],
})
export class PendingOrderPage implements OnInit {
  item : object = {}
  refNo : String = ''
  name : String = ''
  products : Array<any> = []
  userID
  totalPrice
  quantity
  deliveryType
  deliveryAddress
  deliveryFee
  grandTotal
  purchaseDate
  userAddress
  pictures : Array<any> = []
  cell
  totalQuantity : Number
  routingPage
  constructor(private alertController : AlertController, private authService : AuthService, private route : Router, private activatedRoute : ActivatedRoute, private productsService: ProductsService) { }
​
  ngOnInit() {
    
    return this.authService.checkingAuthState().then( result => {
      if(result == null){
        this.route.navigate(['/login'])
      }else{
        this.activatedRoute.queryParams.subscribe(result => {
          //this.item = result.item
          //console.log(this.item);
          console.log(result);
          this.refNo = result.refNo
          this.status = 'quit'
          let name = result.user
          this.userID = result.userID
          console.log(name);
          this.cell = result.cell
          this.getUser(this.userID)
          console.log(this.cell);
          this.routingPage = result.currentPage
          console.log(this.routingPage);
          
          this.getOrder(this.refNo, name)
          this.refreshPendingOrder()
          // this.loadPictures().then(result => {
          //   console.log(result);
            
          // })
        })
      }
    })
​ 
  }
  signOutPopup(){
    this.presentLogoutConfirmAlert()
  }
  async presentLogoutConfirmAlert() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'You are about to sign out',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: (okay) => {
            console.log('Confirm Okay');
            return this.signOut()
          }
        }
      ]
    });
​
    await alert.present();
  }
  signOut(){
    return this.authService.signOut().then(result => {
      console.log(result);
    })
  }
  getUser(userID){
    return this.productsService.loadUser(userID).then(result => {
      console.log(result);
      this.cell = result.cell
      this.name = result.name
      this.userAddress = result.address
    })
  }
getOrder(refNo, name){
 return this.productsService.getOrderDetails(refNo).then(result => {
    this.item = result[0]
    this.item['details'].name = name
    console.log(this.item);
    this.products = this.item['details']['product']
    this.quantity = this.products.length
    console.log(this.products);
    this.deliveryType = this.item['details']['deliveryType']
    this.totalPrice = this.item['details']['totalPrice']

    if(this.deliveryType === 'Delivery'){
      this.deliveryAddress = this.userAddress
      console.log(this.deliveryAddress);
      this.deliveryFee = this.item['details']['deliveryFee']
      this.grandTotal = this.totalPrice + this.deliveryFee
    }else if(this.deliveryType === 'Collection'){
      this.deliveryFee = 0
      this.grandTotal = this.totalPrice
    }

    console.log(this.deliveryType);
    this.purchaseDate = moment(new Date(this.item['details']['timestamp'])).format('DD/MM/YYYY')
    console.log(this.purchaseDate);
    

    console.log(this.products);
    this.countQuantity()
  })
}
countQuantity(){
  this.totalQuantity = 0
  for(let key in this.products){
    this.totalQuantity = this.totalQuantity + this.products[key].quantity
  }
  console.log(this.totalQuantity);
  
}
goBack(){
  this.route.navigate([this.routingPage])
}
​
// async loadPictures(){
//   return this.productsService.getPictures().then(result => {
//     console.log(result);
//     let pictures : Array<any> = []
//     for(let key in result.items){
//       result.items[key].getDownloadURL().then(link => {
//         let path = result.items[key].fullPath
//         let splitPath = path.split('/')
//         let pictureID = splitPath[splitPath.length -1]
//         // picture['link'] = link
//         // picture['productID'] = pictureID
//         this.pictures.push({link : link, productID : pictureID})
//         console.log(this.pictures);
//         this.insertPictures()
//        });
//        return result
//       }
//   })
// }
// ​
// insertPictures(){
//   for(let i in this.pictures){
//     //Adding pictures to products arrays
//     for(let key in this.products){
//       if(this.pictures[i].productID === this.products[key].productID){
//         console.log('ddsfds');
//         this.products[key].pictures = {link: this.pictures[i].link}
//         console.log(this.products[key])
//       }
//     }
//   }
// }
​status : string;
cancelOrder(){
  let status = 'cancelled'
  return this.productsService.cancelOrder(this.refNo, status, this.userID, this.products,  this.purchaseDate).then(result => {
    this.route.navigate([this.routingPage])
  })
}
processOrder(){
  let status
  // if(this.item['details']['status'] === 'Order recieved' || this.item['details']['status'] === 'received'){
    status = 'processed'
  // }
  return this.productsService.processOrder(this.refNo, status).then(result => {
    window.location.reload()
    this.refreshPendingOrder()
  })
​
}
orderReady(){
  let status = 'ready'
  return this.productsService.processOrder(this.refNo, status).then(result => {
    window.location.reload()
  })
}
orderCollected(){
  if(this.deliveryType === 'Collection'){
    let status = 'Collected'
  }else if(this.deliveryType === 'Delivery'){
    let status = 'Delivered'
  }

  return this.productsService.closedOrders(this.refNo, status, this.userID, this.products, this.deliveryType, this.purchaseDate).then(result => {
    this.route.navigate([this.routingPage])
  })
}
refreshPendingOrder(){
  return this.productsService.refreshPendingOrder(this.refNo).then(result => {

    this.status = result
    console.log(result);
    
  })
}
}