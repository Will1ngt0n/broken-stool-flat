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
  DJSales : Array<any> = []
  kwangaFullSales : Array<any> = []
  allBrandSales : Array<any> = []
  query
  kwangaSales : Array<any> = []
  dankieJesuSales : Array<any> = []
  allSales : Array<any> = []
  kwangaCategories : Array<any> = ['Formal', 'Traditional', 'Smart Casual', 'Sports Wear']
  dankieJesuCategories : Array<any> = ['Vests', 'Caps', 'Bucket Hats', 'Shorts', 'Crop Tops', 'T-Shirts', 'Bags', 'Sweaters', 'Hoodies', 'Track Suits', 'Winter Hats', 'Beanies']
  
  constructor(public route : Router, public activatedRoute : ActivatedRoute, public productsService : ProductsService) {

    //this.getDankieJesuSales('Dankie Jesu')




    this.loadAll()
    //this.getKwangaSales('Kwanga')
    this.iterateThrough()
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.query = params['query']
      console.log(this.query);
      if(this.query === 'viewAll'){
        //this.toggleAll()
      }else if(this.query === 'Dankie Jesu'){
       // this.toggleDankie()
      }else{
        ///this.toggleKwanga()
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
    console.log(document.getElementById('dankie'));
    

    alert("dankie")
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
    
    alert("Kwanga")
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
    
    alert("All")
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
  
  loadAll(){}

  iterateThrough(){
    console.log(this.kwangaCategories);
    
    for(let key in this.dankieJesuCategories){
      console.log(this.dankieJesuCategories[key]);
      
      this.loadCategoryItems('Dankie Jesu', this.dankieJesuCategories[key])
      
      //focus on me. 
    }
    for(let key in this.kwangaCategories){
      this.loadCategoryItems('Kwanga', this.kwangaCategories[key])
    }
  }
  loadCategoryItems(brand, category){
    return this.productsService.getAllSales(brand, category).then(result => {
      //console.log(result);
      let array = []
      array = result
      //this.sales
      //this.sales = result
      if(array.length !== 0){
        for(let key in result){
          console.log(result[key]);
          
          if(brand === 'Dankie Jesu'){
            this.dankieJesuSales.push(result[key])
            
          }else if(brand === 'Kwanga'){
            this.kwangaSales.push(result[key])
          }
        }

        console.log(this.dankieJesuSales);
        console.log(this.kwangaSales);
        
        
        console.log(this.sales);
       
        for(let key in this.dankieJesuSales){
          console.log(this.dankieJesuSales[key].productID)
          let productID = this.dankieJesuSales[key].productID
          let item = this.dankieJesuSales[key]
          this.loadProducts(brand, category, productID, item)
        }
        for(let key in this.kwangaSales){
          console.log(this.kwangaSales[key]);
          let productID = this.kwangaSales[key].productID
          let item = this.dankieJesuSales[key]
          this.loadProducts(brand, category, productID, item)
        }
      }

      //this.loadProducts(brand, category, )
    })
    //   console.log(result);
      
    //})
  }
  loadProducts(brand, category, productID, item){
    this.productsService.getProduct(brand, category, productID, item).then(result => {
      console.log(result);
      let array = []
      array = result
      console.log(array);
      if(brand === 'Dankie Jesu' && array.length !== 0){
        this.DJSales.push(result[0])
        this.allBrandSales.push(result[0])
      }else if(brand === 'Kwanga' && array.length !== 0){
        this.kwangaFullSales.push(result[0])
        this.allBrandSales.push(result[0])
      }
      
      //this.loadProducts()
      console.log(this.DJSales);
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
