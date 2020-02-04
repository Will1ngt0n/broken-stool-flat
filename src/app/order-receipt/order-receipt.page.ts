import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products-services/products.service';
import { AuthService } from '../services/auth-services/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';
​​import * as moment from 'moment'
@Component({
  selector: 'app-order-receipt',
  templateUrl: './order-receipt.page.html',
  styleUrls: ['./order-receipt.page.scss'],
})
export class OrderReceiptPage implements OnInit {
  item : Object = {}
  refNo : String = ''
  name : String = ''
  products : Array<any> = []
  pictures : Array<any> = []
  userID
  totalPrice : number
  quantity
  cell
  totalQuantity : Number
  deliveryType
  deliveryAddress
  deliveryFee : number
  grandTotal : number
  userAddress
  datePurchased
  routingPage
  constructor(public loadingCtrl: LoadingController, private alertController : AlertController, private authService : AuthService, private activatedRoute : ActivatedRoute, private productsService : ProductsService, private route : Router) {
​
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await loading.present();
  
    // const { role, data } = await loading.onDidDismiss();
  
    // console.log('Loading dismissed!');
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
​   dateClosed
  getOrderHistory(refNo, name){
    this.presentLoading()
    return this.productsService.getOrderHistoryDetails(refNo).then(result => {
      console.log(result)
       this.item = result[0]
       //this.item['details'].name = name
       console.log(this.item);
      this.products = this.item['details']['orders']
      //this.dateClosed = this.item['details']['timestamp']
      this.deliveryType = this.item['details']['deliveryType']
      if(this.deliveryType === 'Delivery'){
        this.deliveryAddress = this.userAddress
        this.deliveryFee = this.item['details']['deliveryCost']
      }
      console.log(this.deliveryType);
      this.datePurchased = this.item['details']['purchaseDate']
      this.dateClosed = moment(new Date(this.item['details']['timestamp'])).format('DD/MM/YYYY')
      console.log(this.dateClosed);
      
      //  this.quantity = this.products.length
      //this.totalPrice = this.item['details']['totalPrice']
       console.log(this.products);
      this.countQuantity()
      this.countTotalPrice()
     })
   }
   countTotalPrice(){
    this.totalPrice = 0
    console.log(this.item);
    
    for(let key in this.products){
      this.totalPrice = this.totalPrice + this.products[key].quantity * this.products[key].cost
      
    }
    console.log(this.totalPrice);
    if(this.deliveryType === 'Delivery'){
      this.deliveryFee = this.item['details']['deliveryCost']
      this.grandTotal = this.totalPrice + this.deliveryFee
    }else if(this.deliveryType === 'Collection'){
      this.deliveryFee = 0
      this.grandTotal = +this.totalPrice
      console.log(this.grandTotal);
    }
    this.loadingCtrl.dismiss()
   }
   countQuantity(){
     this.totalQuantity = 0
     for(let key in this.products){
       this.totalQuantity = this.totalQuantity + this.products[key].quantity
​
     }
     console.log(this.totalQuantity);
     
   }
   goBack(){
     this.route.navigate([this.routingPage])
   }
   isOnline : boolean
   isCached : boolean
  ngOnInit() {
    if(navigator.onLine){
      this.isOnline = true
      this.isCached = true
      this.activatedRoute.queryParams.subscribe(result => {
        console.log(result);
        
        //this.item = result.item
        //console.log(this.item);
        console.log(result);
        this.refNo = result.refNo
        let name = result.user
        this.userID = result.userID
        console.log(this.userID);
        this.getUser(this.userID)
        console.log(name);
        this.cell = result.cell
        console.log(this.cell);
        this.routingPage = result.link
        console.log(this.routingPage);
        //this.presentLoading()
        this.getOrderHistory(this.refNo, name)
        this.loadPictures().then(result => {
          console.log(result);
          
        })
  
      })
    }else{
      this.isOnline = false
      this.isCached = false
    }

  }
  reload() {
    if(navigator.onLine){
      this.isOnline = true
      this.isCached = true
      this.activatedRoute.queryParams.subscribe(result => {
        console.log(result);
        
        //this.item = result.item
        //console.log(this.item);
        console.log(result);
        this.refNo = result.refNo
        let name = result.user
        this.userID = result.userID
        console.log(this.userID);
        this.getUser(this.userID)
        console.log(name);
        this.cell = result.cell
        console.log(this.cell);
        this.routingPage = result.link
        console.log(this.routingPage);
        //this.presentLoading()
        this.getOrderHistory(this.refNo, name)
        this.loadPictures().then(result => {
          console.log(result);
          
        })
  
      })
    }else{
      this.isOnline = false
      this.isCached = false
    }

  }
  ionViewWillEnter(){
    console.log('ion view did enter');
    if(navigator.onLine){
      this.isOnline = true
      if(this.isCached === false){
        this.reload()
      }
    }else{
      this.isOnline = false
    }
  }
  getUser(userID){
    return this.productsService.loadUser(userID).then(result => {
      console.log(result);
      this.userAddress = result.address
      this.cell = result.cell
      this.name = result.name
    })
  }
  async loadPictures(){
    return this.productsService.getPictures().then(result => {
      console.log(result);
      let pictures : Array<any> = []
      for(let key in result.items){
        result.items[key].getDownloadURL().then(link => {
          let path = result.items[key].fullPath
          let splitPath = path.split('/')
          let pictureID = splitPath[splitPath.length -1]
          // picture['link'] = link
          // picture['productID'] = pictureID
          this.pictures.push({link : link, productID : pictureID})
          console.log(this.pictures);
          this.insertPictures()
         });
         return result
        }
    })
  }
  
  insertPictures(){
    for(let i in this.pictures){
      //Adding pictures to products arrays
      for(let key in this.products){
        if(this.pictures[i].productID === this.products[key].productID){
          console.log('ddsfds');
          this.products[key].pictures = {link: this.pictures[i].link}
          console.log(this.products[key])
        }
      }
    }
  }
​
}