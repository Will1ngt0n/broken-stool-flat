import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products-services/products.service';

@Component({
  selector: 'app-sales-specials',
  templateUrl: './sales-specials.page.html',
  styleUrls: ['./sales-specials.page.scss'],
})
export class SalesSpecialsPage implements OnInit {
  sales : Array<any> = []
  brands : Array<any> = []
  query
  kwangaSales : Array<any> = []
  dankieJesuSales : Array<any> = []
  allSales : Array<any> = []
  constructor(public route : Router, public activatedRoute : ActivatedRoute, public productsService : ProductsService) {

    //this.getDankieJesuSales('Dankie Jesu')




    this.loadAll()
    //this.getKwangaSales('Kwanga')
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.query = params['query']
      console.log(this.query);
      if(this.query === 'viewAll'){
        this.toggleAll()
      }else if(this.query === 'Dankie Jesu'){
        this.toggleDankie()
      }else{
        this.toggleKwanga()
      }
    })
  }
  getKwangaSales(query){
    for(let i in this.allSales){
      if(this.allSales[i].brand === query){
        this.kwangaSales.push(this.allSales[i])
      }
    }
    console.log(this.kwangaSales);
  }
  getDankieJesuSales(query){
    for(let i in this.allSales){
      if(this.allSales[i].brand === query){
        this.dankieJesuSales.push(this.allSales[i])
      }
    }
    console.log(this.dankieJesuSales);
  }

  // getAllSales(){
  //   return this.productsService.getAllSales().then(result => {
  //     console.log(result);
  //     this.allSales = result
  //     console.log(this.allSales);
  //     // for(let i = 0; i < this.allSales.length; i++){
  //     //   if(this.allSales[i].brand === 'Kwanga'){
  //     //     console.log('Kwanga');
  //     //     this.kwangaSales.push(this.allSales[i])
  //     //   }else if(this.allSales[i].brand === 'Dankie Jesu'){
  //     //     console.log('Dankie Jesu');
  //     //     this.dankieJesuSales.push(this.allSales[i])
  //     //   }
  //     // }
  //     // console.log(this.kwangaSales);
  //     // console.log(this.dankieJesuSales);
  //     return result
  //   })
  // }
  toggleDankie(){
    var kwa = document.getElementById("kwanga").style.background = "white";
    var kwa = document.getElementById("kwanga").style.color = "#7c0000";
    var kwaCat = document.getElementById("kwangaSubcat").style.display = "none";

    var dan = document.getElementById("dankie").style.background = "#7c0000";
    var dan = document.getElementById("dankie").style.color = "white";
    var danCat = document.getElementById("DankieSubcat").style.display = "block";

    var allSubs = document.getElementById("allSubs").style.background = "white";
    var allSubs = document.getElementById("allSubs").style.color = "#7c0000";
    var allSubsCat = document.getElementById("AllSubcat").style.display = "none";
  }
  toggleKwanga(){
    var kwa = document.getElementById("kwanga").style.background = "#7c0000";
    var kwa = document.getElementById("kwanga").style.color = "white";
    var kwaCat = document.getElementById("kwangaSubcat").style.display = "block";

    var dan = document.getElementById("dankie").style.background = "white";
    var dan = document.getElementById("dankie").style.color = "#7c0000";
    var danCat = document.getElementById("DankieSubcat").style.display = "none";

    var allSubs = document.getElementById("allSubs").style.background = "white";
    var allSubs = document.getElementById("allSubs").style.color = "#7c0000";
    var allSubsCat = document.getElementById("AllSubcat").style.display = "none";

  }
  toggleAll(){
    var kwa = document.getElementById("kwanga").style.background = "white";
    var kwa = document.getElementById("kwanga").style.color = "#7c0000";
    var kwaCat = document.getElementById("kwangaSubcat").style.display = "none";

    var dan = document.getElementById("dankie").style.background = "white";
    var dan = document.getElementById("dankie").style.color = "#7c0000";
    var danCat = document.getElementById("DankieSubcat").style.display = "none";
    
    var allSubs = document.getElementById("allSubs").style.background = "#7c0000";
    var allSubs = document.getElementById("allSubs").style.color = "white";
    var allSubsCat = document.getElementById("AllSubcat").style.display = "block";

  }
  back(){
    this.route.navigate(['/landing'])
  }
  
  loadAll(){
    this.productsService.getAllSales().then(result => {
      console.log(result);
      this.sales
      this.sales = result
      this.loadBrandProducts()
    })
    //   console.log(result);
      
    //})
  }
  loadBrandProducts(){
    this.productsService.getBrandProducts().then(result => {
      console.log(result);
      this.brands = result
      this.loadProducts()
    })
  }
  loadProducts(){
    this.productsService.getProducts().then(result => {
      console.log(result);
      let data : Array<any> = result
      console.log(data);
      for(let i in this.sales){
        console.log(this.sales[i].productID);
        for(let j in data){
          console.log(data[j].productID);
          if(this.sales[i].productID === data[j].productID){
            console.log(data[j]);
            this.sales[i].name = data[j].product.name
            this.sales[i].description = data[j].product.description
            this.sales[i].normalPrice = data[j].product.price
        }
      }
      console.log(this.sales);
      for(let l in this.brands){
        for(let n in this.brands[l].products){
          if(this.sales[i].productID === this.brands[l].products[n]){
            console.log('match');
            this.sales[i].brand = this.brands[l].id
          }
        }
        console.log(this.sales);
      }
      }
      this.allSales = this.sales
      console.log(this.allSales);
      this.getDankieJesuSales('Dankie Jesu')
      this.getKwangaSales('Kwanga')
  })
}

deleteItem(productID){
  return this.productsService.deleteSpecialsItem(productID).then(result => {
    console.log(result);
    
  })
}

hideItem(productID){
  return this.productsService.hideItem(productID).then(result => {
    console.log(result);
    
  })
}

updateItem(){
  
}
}
