import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products-services/products.service';
import { AuthService } from '../services/auth-services/auth.service';
import { AlertController } from '@ionic/angular';
declare var window
@Component({
  selector: 'app-pending-order',
  templateUrl: './pending-order.page.html',
  styleUrls: ['./pending-order.page.scss'],
})
export class PendingOrderPage implements OnInit {
  item : Object = {}
  refNo : String = ''
  name : String = ''
  products : Array<any> = []
  userID
  totalPrice
  quantity
  pictures : Array<any> = []
  cell
  totalQuantity : Number
  routingPage
  constructor(private alertController : AlertController, private authService : AuthService, private route : Router, private activatedRoute : ActivatedRoute, private productsService: ProductsService) { }

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
          let name = result.user
          this.userID = result.userID
          console.log(name);
          this.cell = result.cell
          console.log(this.cell);
          this.routingPage = result.currentPage
          console.log(this.routingPage);
          
          this.getOrder(this.refNo, name)
          this.loadPictures().then(result => {
            console.log(result);
            
          })
        })
      }
    })

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

    await alert.present();
  }
  signOut(){
    return this.authService.signOut().then(result => {
      console.log(result);
    })
  }
getOrder(refNo, name){
 return this.productsService.getOrderDetails(refNo).then(result => {
    this.item = result[0]
    this.item['details'].name = name
    console.log(this.item);
    this.products = this.item['details']['product']
    this.quantity = this.products.length
    this.totalPrice = this.item['details']['totalPrice']
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

cancelOrder(){
  let status = 'cancelled'
  return this.productsService.cancelOrder(this.refNo, status, this.userID, this.products).then(result => {
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
  })

}
orderReady(){
  let status = 'ready'
  return this.productsService.processOrder(this.refNo, status).then(result => {
    window.location.reload()
  })
}
orderCollected(){
  let status = 'collected'
  return this.productsService.processOrder(this.refNo, status).then(result => {
    this.route.navigate([this.routingPage])
  })
}
}
