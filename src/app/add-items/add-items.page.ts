import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-services/auth.service';
import { LoginPageModule } from '../login/login.module';
import { VirtualTimeScheduler } from 'rxjs';
import { ProductsService } from '../services/products-services/products.service';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.page.html',
  styleUrls: ['./add-items.page.scss'],
})
export class AddItemsPage implements OnInit {
  department: any
  departmentOptions: Array<any> = ['Department', 'Dankie Jesu', 'Kwanga']
  summer: boolean;
  winter: boolean = false
  kwanga: boolean = false
  categoryOptions: Array<any> = ['Category']
  selectedCategory: any
  itemName: String
  price: String
  description: String
  size: Array<any> = []
  colors: Object = {};
  accessory: boolean;

  constructor(public route: Router, public authService: AuthService, public productService: ProductsService) {
    console.log(this.department);
    this.productService.getCategories()
    this.colors = { red: '' }
    this.accessory = false;
    this.summer = false;
  }
  changeDepartment(event) {
    console.log('Accessory ', this.accessory);

    console.log(event.target['value']);
    this.department = event.target['value']
    if (this.department === 'Dankie Jesu') {
      this.categoryOptions = ['Vests', 'Caps ', 'Bucket Hats', 'Shorts', 'Crop Tops', 'T-Shirts',
        'Sweaters', 'Hoodies', 'Track Suits', 'Winter Hats', 'Beanies']
    }
    /*    if(this.department === 'Winter'){
         this.categoryOptions = ['Sweaters', 'Hoodies', 'Track Suits', 'Winter Hats']
       } */
    if (this.department === 'Kwanga') {
      this.categoryOptions = ['Formal', 'Tradition ', 'Smart Casual', 'Sports wear']
    }
    /*   if(this.department === 'Bags'){
        this.categoryOptions = ['Side Bag', 'Back pack']
      } */
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
    return this.productService.addItem(this.department, this.selectedCategory, this.itemName, this.description, this.price, this.size
      , this.accessory, this.summer).then(result => {
      this.clearForm();
    })
  }

  //Clearing all form variables and form inputs respectively
  clearForm() {
    this.departmentOptions = ['Dankie Jesu', 'Kwanga']
    this.categoryOptions = ['Vests', 'Caps ', 'Bucket Hats', 'Shorts', 'Crop Tops', 'T-Shirts',
    'Sweaters', 'Hoodies', 'Track Suits', 'Winter Hats', 'Beanies']
    this.selectedCategory = ''
    this.itemName = ''
    this.price = ''
    this.description = ''
    this.size = [];
    document.getElementById('accessory')['checked'] = false;
    document.getElementById('summer')['checked'] = false;
    document.getElementsByName('checkboxXS')[0]['checked'] = false
    document.getElementsByName('checkboxS')[0]['checked'] = false
    document.getElementsByName('checkboxM')[0]['checked'] = false
    document.getElementsByName('checkboxL')[0]['checked'] = false
    document.getElementsByName('checkboxXL')[0]['checked'] = false
    document.getElementsByName('checkboxXXL')[0]['checked'] = false
    document.getElementsByName('checkboxXXXL')[0]['checked'] = false
  }
}
