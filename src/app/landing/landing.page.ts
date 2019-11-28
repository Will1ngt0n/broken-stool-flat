import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-services/auth.service';
import { ProductsService } from '../services/products-services/products.service';
import * as moment from 'moment';
import { NavController } from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  sales : Array<any> = []
  brands : Array<any> = []
  allSales : Array<any> = []
  allProducts : Array<any> = []
  addForm : boolean 
  formHasValues : boolean 
  department : any
  departmentOptions : Array<any> = ['Select Department', 'Dankie Jesu', 'Kwanga']
  summer : boolean;
  winter : boolean = false
  kwanga : boolean = false
  categoryOptions: Array<any> = ['Select Category']
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
  seasonalWear : Array<any> = []
  blackAvailable; blackPic
  brownAvailable;  brownPic
  orangeAvailable; orangePic
  yellowAvailable;  yellowPic
  whiteAvailable; whitePic
  constructor(public navCtrl : NavController , public route: Router, public authService: AuthService, public productService: ProductsService) {
    console.log(this.department);
    this.productService.getCategories()
    this.colors = { red: '' }
    this.accessory = false;
    this.summer = false;
    this.department = undefined
    this.addForm = false
    this.formHasValues = false
    let date = moment(new Date()).format('LLLL');
    console.log(date);
    //this.loadSummerItems()

    //this.loadBrandProducts()

    //this.getSummerItems()
    console.log(this.department);
    this.getAllItems()
  }
  changeDepartment(event) {
    console.log('Accessory ', this.accessory);

    console.log(event.target['value']);
    this.department = event.target['value']
    if (this.department === 'Dankie Jesu') {
      this.categoryOptions = ['Select Category', 'Vests', 'Caps ', 'Bucket Hats', 'Shorts', 'Crop Tops', 'T-Shirts', 'Sweaters', 'Hoodies', 'Track Suits', 'Winter Hats', 'Beanies']
    }
    if (this.department === 'Kwanga') {
      this.categoryOptions = ['Select Category', 'Formal', 'Tradition ', 'Smart Casual', 'Sports wear']
    }
    if(this.department === 'Select Department'){
      this.department = undefined
    }
    this.checkValidity()
  }
  isSummer(data) {
    if (data.target.checked === true) {
      // console.log('Accessory');
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
  ngOnInit() {
  }

  ionViewDidEnter() {

  }
  isAccessory(data) {
    //console.log('My data ', data.target.checked);
    if (data.target.checked === true) {
      // console.log('Accessory');
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
    console.log(this.department);
    console.log(this.selectedCategory);
    console.log(this.itemName);
    console.log(this.description);
    console.log(this.price);
    console.log(this.size);
    let date = moment(new Date()).format('LLLL');
    console.log(date);

      return this.productService.addItem(this.department, this.selectedCategory, this.itemName, this.description, this.price, this.size, this.accessory, this.summer, this.color).then(result => {
        this.clearForm();
      })
    

  }

  //Clearing all form variables and form inputs respectively
  clearForm() {
    this.departmentOptions = ['Select Department']
    this.departmentOptions = ['Select Department', 'Dankie Jesu', 'Kwanga']
    this.categoryOptions = ['Select Category']
    this.selectedCategory = ''
    this.itemName = ''
    this.price = ''
    this.description = ''
    this.size = [];
    document.getElementById('accessory')['checked'] = false;
    document.getElementById('summer')['checked'] = false;
    let checkboxes : Array<any> = ['checkboxXS', 'checkboxS', 'checkboxM', 'checkboxL', 'checkboxXL', 'checkboxXXL', 'checkboxXXXL', 'checkboxBlack', 'checkboxBrown', 'checkboxOrange', 'checkboxYellow', 'checkboxWhite']
    for(let i = 0; i < checkboxes.length; i++){
      document.getElementsByName(checkboxes[i])[0]['checked'] = false
    }
    this.formHasValues = false
    this.department = undefined
    this.selectedCategory = undefined
  }

  //Routing to sales page
  viewSales(query){
    console.log(query);
    let navOptions = {
      queryParams : {query : query}
    }
    this.navCtrl.navigateForward(['sales-specials'], navOptions)    
  }
  // loadSummerItems(){
  //   return this.productService.getRecentSummerItems().then(result => {
  //     this.summerGear = result
  //     console.log(this.summerGear);
  //     console.log(result);
      
  //   })
  // }
  loadWinterItems(){
    return this.productService.getRecentWinterItems().then(result => {
      this.winterGear = result
      console.log(this.winterGear);
      console.log(result);
      
    })
  }
  loadKwangaItems(){
    return this.productService.getKwangaRecentItems().then(result => {
      this.kwangaGear = result
      console.log(this.kwangaGear);
      console.log(result);
    })
  }
  getWinterItems(){
    return this.productService.getSeasonalRecentItems('Winter').then(result => {
      console.log(result);
      //this.seasonalWear = result
      let array : Array<any> = []
      for(let key in result){
            array.push(result[key])
  
        
        console.log(key);
        console.log(result[key]);
        
      }
      console.log(array);
      for(let i in array){
        for(let j in this.allProducts){
          console.log(this.allProducts[j].productID);
          if(array[i] === this.allProducts[j].productID){
            console.log(this.allProducts[j].productID);
            this.winterGear.push(this.allProducts[j])
        }
      }
    }
    console.log(this.winterGear);
    

  })
  }
  viewMore(query){
    this.route.navigate(['/'+ query])
  }
  getSummerItems(){
    return this.productService.getSeasonalRecentItems('Summer').then(result => {
      console.log(result);
      // = result
      let array : Array<any> = []
      for(let key in result){
        
            array.push(result[key])
          
        
        console.log(key);
        console.log(result[key]);
        
      }
      console.log(array);
      for(let i in array){
        for(let j in this.allProducts){
          console.log(this.allProducts[j].productID);
          if(array[i] === this.allProducts[j].productID){
            console.log(this.allProducts[j].productID);
            this.summerGear.push(this.allProducts[j])
        }
      }
    }
    console.log(this.summerGear);
    

  })
}
  getKwangaItems(){
    this.productService.getKwangaPopularItems().then(result => {
      console.log(result);
      let array : Array<any> = []
      for(let key in result){
        for(let j in this.allProducts){
          console.log(this.allProducts[j].productID);
          if(result[key].productID === this.allProducts[j].productID){
            console.log(this.allProducts[j].productID);
            this.kwangaGear.push(this.allProducts[j])
        }
      }        
      }
      console.log(this.kwangaGear);
      
    })
  }
  getAllItems(){
    this.productService.getProducts().then(result => {
      console.log(result);
      this.allProducts = []
      this.allProducts = result
      this.getSummerItems()
      this.getWinterItems()
      this.getKwangaItems()
    })
  }
}
