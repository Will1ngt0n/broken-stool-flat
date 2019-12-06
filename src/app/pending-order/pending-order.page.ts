import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginPageModule } from '../login/login.module';
import { ProductsService } from '../services/products-services/products.service';

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
  totalPrice
  quantity
  cell
  totalQuantity : Number
  routingPage
  status = ""
  constructor(private route : Router, private activatedRoute : ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(result => {
      //this.item = result.item
      //console.log(this.item);
      console.log(result);
      this.refNo = result.refNo
      let name = result.user
      console.log(name);
      this.cell = result.cell
      console.log(this.cell);
      this.routingPage = result.currentPage
      console.log(this.routingPage);
      
      this.getOrder(this.refNo, name)
    })
  }
getOrder(refNo, name){
 return this.productsService.getOrderDetails(refNo).then(result => {
    this.item = result[0]
    this.item['details'].name = name
    console.log(this.item);
    this.products = this.item['details']['product']
    this.status = this.item['details']['status'] // edited
    console.log("Order Status: ",this.status);
    
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
  alert("clicked")
  this.route.navigate([this.routingPage])
}

cancelOrder(){
  let status = 'cancelled'
  return this.productsService.processOrder(this.refNo, status).then(result => {

  })
}
processOrder(){
  alert("clicked")
  let status
  // if(this.item['details']['status'] === 'Order recieved' || this.item['details']['status'] === 'received'){
    status = 'processed'
  // }
  return this.productsService.processOrder(this.refNo, status).then(result => {

  })

}
orderReady(){
  let status = 'ready'
  return this.productsService.processOrder(this.refNo, status).then(result => {
    
  })
}
orderCollected(){
  let status = 'collected'
  return this.productsService.processOrder(this.refNo, status).then(result => {
    window.location.reload()
  })
}

btnNext: string = "";
showNext(){
  if(this.btnNext == ""){
    this.btnNext = "processed"
  }
  else if(this.btnNext == "processed"){
    this.btnNext = "ready"
  }
}
}
