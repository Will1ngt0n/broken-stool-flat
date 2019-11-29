import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products-services/products.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.page.html',
  styleUrls: ['./items-list.page.scss'],
})
export class ItemsListPage implements OnInit {
  currentCategory
  kwangaCategories : Array<any> = ['Formal', 'Traditional', 'Smart Casual', 'Sports Wear']
  dankieJesuCategories : Array<any> = ['Vests', 'Caps', 'Bucket Hats', 'Shorts', 'Crop Tops', 'T-Shirts', 'Bags', 'Sweaters', 'Hoodies', 'Track Suits', 'Winter Hats', 'Beanies']
  //summerCategories : Array<any> = ['Vests', 'Caps', 'Bucket Hats', 'Shorts', 'Crop Tops', 'T-Shirts', 'Bags']
  //winterCategories : Array<any> = ['Sweaters', 'Hoodies', 'Track Suits', 'Winter Hats', 'Beanies']
  allItems : Array<any> = []
  currentViewedItems : Array<any> = []
  price
  description
  quantity
  name
  constructor(private activatedRoute : ActivatedRoute, private productsService : ProductsService) {
    //this.loadKwangaItems()
    //this.loadDankieJesuItems()
    //this.loadViewedCategory()
  }
  
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(result => {
      console.log(result);
      let currentCategory = result.category
      let brand = result.brand
      console.log(brand);
      console.log(currentCategory);
      console.log(this.currentCategory);
      this.loadItems(currentCategory, brand)
    })
  }
  // loadKwangaItems(){
  //   let category : String
  //   for(let key in this.kwangaCategories){
  //     category  = this.kwangaCategories[key]
  //     this.loadItems(category, 'Kwanga').then(result => {
  //       console.log(result);
        
  //     })
  //   }
  // }
  // loadDankieJesuItems(){
  //   let category : String
  //   for(let key in this.dankieJesuCategories){
  //     category = this.dankieJesuCategories[key]
  //     this.loadItems(category, 'Dankie Jesu')
  //   }
  // }
  // loadViewedCategory(){
    
  // }
  loadItems(category, brand){
    //console.log(1234);
    let data : Array<any> = []
    return this.productsService.loadCategoryItems(category, brand).then(result => {
      console.log(result);
      for(let key in result){
        console.log(result);
        //this.allItems.push(result[key])
        this.currentViewedItems.push(result[key])
      }
      //console.log(this.allItems);
    })
  }
  promoteItem(productID){
    
  }
  deleteItem(productID, brand, category){
    return this.productsService.deleteItemFromInventory(productID, brand, category).then(result => {
      console.log(result);
    })
  }
  hideItem(productID, brand, category){
    return this.productsService.hideProduct(productID, brand, category).then(result => {
      console.log(result);
    })
  }
  showItem(productID, brand, category){
    return this.productsService.showProduct(productID, brand, category).then(result => {
      console.log(result);
    })
  }
  updateItem(productID, brand, category){

  }
  submitUpdatedItem(productID, brand, category){
    return this.productsService.updateItem(productID, brand, category, this.price, this.description, this.name, this.quantity).then(result => {
      console.log(result);
      
    })
  }
}
