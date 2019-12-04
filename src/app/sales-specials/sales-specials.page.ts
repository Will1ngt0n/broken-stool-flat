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
  ///////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////
  searchInput
  searchArray : Array<any> = []
  allProducts : Array<any> = []
  inventory : Array<any> = []
  history : Array<any> = []
  pendingOrders : Array<any> = []
  readyOrders : Array<any> = []
  addForm : boolean 
  formHasValues : boolean 
  department : any
  picture
  departmentOptions : Array<any> = ['Select Department', 'Dankie Jesu', 'Kwanga']
  categoryOptions: Array<any> = ['Select Category']
  inventoryItems :  Array<any> = []
  summer : boolean;
  winter : boolean = false
  kwanga : boolean = false
  selectedCategory: any
  itemName : String
  price : String
  description: String
  size : Array<any> = []
  color : Array<any> = []
  colors : Object = {};
  accessory : boolean;
  summerGear : Array<any> = []
  winterGear : Array<any> = []
  kwangaGear : Array<any> = []
  kwangaProducts : Array<any> = []
  dankieJesuProducts : Array<any> = []
  summerProducts : Array<any> = []
  winterProducts : Array<any> = []
  orderedWinterProducts : Array<any> = []
  orderedSummerProducts : Array<any> = []
  seasonalWear : Array<any> = []
  blackAvailable; blackPic
  brownAvailable;  brownPic
  orangeAvailable; orangePic
  yellowAvailable;  yellowPic
  whiteAvailable; whitePic
  constructor(public route : Router, public activatedRoute : ActivatedRoute, public productsService : ProductsService) {

    //this.getDankieJesuSales('Dankie Jesu')




    this.loadAll()
    //this.getKwangaSales('Kwanga')
    this.iterateThrough()


    console.log(this.department);
    //this.productsService.getCategories()
    this.loadDankieJesuItems()
    this.loadKwangaItems()
    this.colors = { red: '' }
    this.accessory = false;
    this.summer = false;
    this.department = undefined
    this.addForm = false
    this.formHasValues = false
    //this.loadSummerItems()

    //this.loadBrandProducts()

    //this.getSummerItems()
    console.log(this.department);
    // this.getAllItems()
   // this.orderItems()

    this.getPendingOrders()
    this.getReadyOrders()
    this.getClosedOrders()
    this.getInventory()
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
    //console.log(document.getElementById('dankie'));
    console.log(this.allSales);
    console.log(this.kwangaSales);
    console.log(this.DJSales);
    console.log(this.allBrandSales);
    console.log(this.dankieJesuSales);
    console.log(this.kwangaFullSales);
    

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
    console.log(this.allSales);
    console.log(this.kwangaSales);
    console.log(this.DJSales);
    console.log(this.allBrandSales);
    console.log(this.dankieJesuSales);
    console.log(this.kwangaFullSales);
    
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
    console.log(this.allSales);
    console.log(this.kwangaSales);
    console.log(this.DJSales);
    console.log(this.allBrandSales);
    console.log(this.dankieJesuSales);
    console.log(this.kwangaFullSales);
    
    
    
    
    
    
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
    }
    for(let key in this.kwangaCategories){
      this.loadCategoryItems('Kwanga', this.kwangaCategories[key])
    }
  }
  loadCategoryItems(brand, category){
    return this.productsService.getAllSales(brand, category).then(result => {
      let array = []
      array = result
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
        //console.log(this.kwangaSales);
        //console.log(this.sales);
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
    })
  }
  loadProducts(brand, category, productID, item){
    this.productsService.getProduct(brand, category, productID, item).then(result => {
      //console.log(result);
      let array = []
      if(result.length !== 0){
        array = result
        console.log(array);
        if(brand === 'Dankie Jesu' && array.length !== 0){
          this.DJSales.push(result[0])
          this.allBrandSales.push(result[0])
        }else if(brand === 'Kwanga' && array.length !== 0){
          this.kwangaFullSales.push(result[0])
          this.allBrandSales.push(result[0])
        }
        console.log(this.DJSales);     
      }

    })
  }

deleteItem(productID){
  console.log(productID);
  
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
/////////Adding product form (validation and data retrieval)
changeDepartment(event) {
  console.log('Accessory ', this.accessory);

  console.log(event.target['value']);
  this.department = event.target['value']
  if (this.department === 'Dankie Jesu') {
    this.categoryOptions = ['Select Category', 'Vests', 'Caps ', 'Bucket Hats', 'Shorts', 'Crop Tops', 'T-Shirts', 'Sweaters', 'Hoodies', 'Track Suits', 'Winter Hats', 'Beanies', 'Bags']
  }
  if (this.department === 'Kwanga') {
    this.categoryOptions = ['Select Category', 'Formal', 'Traditional', 'Smart Casual', 'Sports wear']
  }
  if(this.department === 'Select Department'){
    this.department = undefined
  }
  this.checkValidity()
}
isSummer(data) {
  if (data.target.checked === true) {
    this.summer = true;
  } else {
    this.summer = false;
  }
}
changeCategory() {
  console.log(event.target['value']);
  this.selectedCategory = event.target['value']
  if(this.selectedCategory === 'Select Category'){
    this.selectedCategory = undefined
  }
  this.checkValidity()
}

ionViewDidEnter() {

}
isAccessory(data) {
  if (data.target.checked === true) {
    this.accessory = true;
  } else {
    this.accessory = false;
  }

}
check(event, size) {
  console.log(size);
  console.log(this.size);
  let checkbox = event.target['name']
  if (checkbox) {
    if (event.target.checked === true) {
      this.size.push(size)
      console.log(this.size);
    } else if (event.target.checked === false) {
      let index = this.size.indexOf(size)
      console.log(index);
      this.size.splice(index, 1)
      console.log(this.size);
    }
  }
  console.log(event.target.checked);
  console.log(event.target['name']);
  this.checkValidity()
}
checkValidity(){
  console.log(this.department);
  console.log(this.selectedCategory);
  console.log(this.itemName);
  console.log(this.description);
  console.log(this.price);
  console.log(this.size);
  console.log(this.color);

  if(this.selectedCategory === undefined || this.department === undefined || this.size.length === 0 || this.color.length === 0 || this.itemName === '' || this.description === '' || this.price === ''){
    this.addForm = false
    console.log(this.addForm);
    
  }else{
    this.addForm = true
    console.log(this.addForm);
  }
  if(this.department !== undefined || this.selectedCategory !== undefined||  this.size.length !== 0 || this.color.length !== 0 || this.itemName !== '' || this.description !== '' || this.price !== ''){
    this.formHasValues = true
    console.log(this.formHasValues);
    
  }else{
    this.formHasValues = false
    console.log(this.formHasValues);
  }
}
checkColor(event, color){
  this.checkValidity()
  console.log(color);
  console.log(this.size);
  let checkbox = event.target['name']
  if (checkbox) {
    if (event.target.checked === true) {
      this.color.push(color)
      console.log(this.color);
      // if(color === 'Black'){
      //   this.blackAvailable = true
      // }else if(color === 'Brown'){
      //   this.brownAvailable = true
      // }else if(color === 'Orange'){
      //   this.orangeAvailable = true
      // }else if(color === 'Yellow'){
      //   this.yellowAvailable = true
      // }else{
      //   this.whiteAvailable = true
      // }
    } else if (event.target.checked === false) {
      let index = this.color.indexOf(color)
      console.log(index);
      this.color.splice(index, 1)
      console.log(this.color);
    }
  }
  console.log(event.target.checked);
  console.log(event.target['name']);
  this.checkValidity()
}

addItem() {
  this.route.navigate(['/'])
}
addProduct() {
    return this.productsService.addItem(this.department, this.selectedCategory, this.itemName, this.description, this.price, this.size, this.accessory, this.summer, this.color, this.picture).then(result => {
      this.clearForm();
    })
}

//Clearing all form variables and form inputs respectively
clearForm() {
  this.departmentOptions = ['Select Department']
  this.departmentOptions = ['Select Department', 'Dankie Jesu', 'Kwanga']
  this.categoryOptions = ['Select Category']
  this.selectedCategory = '';  this.itemName = '';  this.price = '';  this.description = ''
  this.size = [];
  document.getElementById('accessory')['checked'] = false;
  document.getElementById('summer')['checked'] = false;
  let checkboxes : Array<any> = ['checkboxXS', 'checkboxS', 'checkboxM', 'checkboxL', 'checkboxXL', 'checkboxXXL', 'checkboxXXXL', 'checkboxBlack', 'checkboxBrown', 'checkboxOrange', 'checkboxYellow', 'checkboxWhite']
  for(let i = 0; i < checkboxes.length; i++){
    document.getElementsByName(checkboxes[i])[0]['checked'] = false
  }
  this.formHasValues = false;  this.department = undefined;  this.selectedCategory = undefined
}

viewMore(query){
  this.route.navigate(['/'+ query])
}

loadKwangaItems(){
  let category : String
  console.log(this.kwangaCategories);
  console.log('run this shixt again');
  
  
  for(let key in this.kwangaCategories){
    category  = this.kwangaCategories[key]
    this.loadItems(category, 'Kwanga')
    console.log(this.kwangaCategories[key]);
    console.log('kwanga is here');
    
  }
}
loadDankieJesuItems(){
  let category : String
  console.log('fgdfgdfggdgdg');
  
  for(let key in this.dankieJesuCategories){
    category = this.dankieJesuCategories[key]
    this.loadItems(category, 'Dankie Jesu')
  }
}
loadViewedCategory(){
  
}
loadItems(category, brand){
  let data : Array<any> = []
  return this.productsService.loadCategoryItems(category, brand).then(result => {
    if(result !== undefined){
      //console.log(result);
    }
    for(let key in result){
      if(brand === 'Kwanga'){
        this.kwangaProducts.push(result[key])
       // console.log(this.kwangaProducts);
        this.allProducts.push(result[key])
      }else if(brand === 'Dankie Jesu'){
        //console.log('I belong to Dankie Jesu');
        this.dankieJesuProducts.push(result[key])
        this.allProducts.push(result[key])
        console.log(this.allProducts, 'I think i am running perfectly');
        }
      }
    })
    }
  orderItems(){
      this.summerProducts.sort(( a , b  ) => a.data.dateAdded > b.data.dateAdded ? 1 : 0 )
      this.winterProducts.sort(( a , b  ) => a.data.dateAdded > b.data.dateAdded ? 1 : 0 )
      for(let i = 0; i < 5; i++){this.summerGear.push(this.summerProducts[i])}
      for(let i = 0; i < 5; i++){this.winterGear.push(this.winterProducts[i])}
    }
getInventory(){
  console.log(this.allProducts, 'inventory')
  
}
getPendingOrders(){
  return this.productsService.getPendingOrders().then(result => {
    if(result.length !== 0){
      this.pendingOrders = result
      console.log(this.pendingOrders, 'pending orders');      
    }
  })
}
getReadyOrders(){
  return this.productsService.getReadyOrders().then(result => {
    this.readyOrders = result
    console.log(this.readyOrders, 'ready orders');
  })
}
getClosedOrders(){
  return this.productsService.getClosedOrders().then(result => {
    if(result.length !== 0){
      this.history = result
      console.log(this.history, 'closed orders');
    }
  })
}
closeOrder(docID){
  return this.productsService.closedOrder(docID).then(result => {
    console.log(result);
    
  })
}

search(query){
  this.filterItems(query, this.allProducts)
  this.searchArray = []
}
filterItems(query, array){
  let queryFormatted = query.toLowerCase();
  console.log(queryFormatted);
  console.log(array);
  if(queryFormatted !== ''){
    //console.log(array.filter(item => item.brand.toLowerCase().indexOf(queryFormatted) >= 0) || array.filter(item => item.category.toLowerCase().indexOf(queryFormatted) >= 0) || array.filter(item => item.data.name.toLowerCase().indexOf(queryFormatted) >= 0));
    // console.log(array.filter(item => item.category.toLowerCase().indexOf(queryFormatted) >= 0));
    // console.log(array.filter(item => item.data.name.toLowerCase().indexOf(queryFormatted) >= 0));
    let brandResult = array.filter(item => item.brand.toLowerCase().indexOf(queryFormatted) >= 0) 
    let categoryResult = array.filter(item => item.category.toLowerCase().indexOf(queryFormatted) >= 0)
    let nameResult = array.filter(item => item.data.name.toLowerCase().indexOf(queryFormatted) >= 0)
    let addBrand : boolean
    let addCategory : boolean
    let addName : boolean
    addName = false
    addCategory = false
    addBrand = false
    console.log(brandResult);
    console.log(categoryResult);
    console.log(nameResult);
    if(brandResult.length !== 0){
      for(let key in brandResult){
        if(this.searchArray.length !== 0){
          for(let i in this.searchArray){
            if(this.searchArray[i].productID !== brandResult[key].productID){
              // this.searchArray.push(brandResult[key])
              addBrand = true
            }else if(this.searchArray[i].productID === brandResult[key].productID){
              console.log(this.searchArray[i].productID, '=', brandResult[key].productID, 'found a match');
              addBrand = false
              console.log(addBrand);
              
            }
          }
          if(addBrand === true){
            this.searchArray.push(brandResult[key])
          }
        }else if(this.searchArray.length === 0){
        this.searchArray.push(brandResult[key])
        }
      }
    }
    if(categoryResult.length !== 0){
      for(let key in categoryResult){
        if(this.searchArray.length !== 0){
          for(let i in this.searchArray){
            if(this.searchArray[i].productID !== categoryResult[key].productID){
             // this.searchArray.push(categoryResult[key])
             addCategory = true
            }else if(this.searchArray[i].productID === categoryResult[key].productID){
              console.log(this.searchArray[i].productID,'=', categoryResult[key].productID, 'found a match');
              addCategory = false
              console.log(addCategory);
              
            }
          }
          if(addCategory === true){
            this.searchArray.push(categoryResult[key])
          }
        }else if(this.searchArray.length === 0){
         this.searchArray.push(categoryResult[key])
        }


      }
    }
    if(nameResult.length !== 0){
      for(let key in nameResult){
        if(this.searchArray.length !== 0){
          for(let i in this.searchArray){
            if(this.searchArray[i].productID !== nameResult[key].productID){
              
              
              // this.searchArray.push(nameResult[key])
              addName = true
            }else if(this.searchArray[i].productID === nameResult[key].productID){
              console.log(this.searchArray[i].productID,'=', nameResult[key].productID, 'found a match');
              
              addName = false
              console.log(addName);
              
            }
          }
          if(addName === true){
            this.searchArray.push(nameResult[key])
          }
        }else if(this.searchArray.length === 0){
         this.searchArray.push(nameResult[key])
        }

      }
    }
    console.log(this.searchArray);
    
  }else if(queryFormatted === ''){
    this.searchArray = []
  }

  

    //return array.filter(item => item.toLowerCase().indexOf(query) >= 0);
    //return queryFormatted
}
}
