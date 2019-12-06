import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { ProductsService } from '../services/products-services/products.service';
import { AuthService } from '../services/auth-services/auth.service';

@Component({
  selector: 'app-summer-gear',
  templateUrl: './summer-gear.page.html',
  styleUrls: ['./summer-gear.page.scss'],
})
export class SummerGearPage implements OnInit {
  sales : Array<any> = []
  brands : Array<any> = []
  allSales : Array<any> = []
  allProducts : Array<any> = []
  inventory : Array<any> = []
  history : Array<any> = []
  pendingOrders : Array<any> = []
  addForm : boolean 
  formHasValues : boolean 
  department : any
  picture
  searchArray
  searchInput
  departmentOptions : Array<any> = ['Select Department', 'Dankie Jesu', 'Kwanga']
  kwangaCategories : Array<any> = ['Formal', 'Traditional', 'Smart Casual', 'Sports Wear']
  dankieJesuCategories : Array<any> = ['Vests', 'Caps', 'Bucket Hats', 'Shorts', 'Crop Tops', 'T-Shirts', 'Bags', 'Sweaters', 'Hoodies', 'Track Suits', 'Winter Hats', 'Beanies']
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
  status = ['ready', 'recieved', 'collected', 'processed', 'cancelled']
  blackAvailable; blackPic
  brownAvailable;  brownPic
  orangeAvailable; orangePic
  yellowAvailable;  yellowPic
  whiteAvailable; whitePic
  miniSearchBarState: boolean = false;
  constructor(private alertController : AlertController, private authService : AuthService, private navCtrl : NavController, public route : Router, public productService : ProductsService) {
    console.log(this.department);
    //this.productService.getCategories()
    this.loadDankieJesuItems()
    this.loadKwangaItems()
    this.colors = { red: '' }
    this.accessory = false;
    this.summer = false;
    this.department = undefined
    this.addForm = false
    this.formHasValues = false
    // let date = moment(new Date()).format('LLLL');
    // let tee = moment(new Date('10/12/2019')).format('LLLL')
    // console.log(date);
    // console.log(tee);
    // if(date > tee){
    //   console.log(date);
      
    // }
    this.orderItems()

    for(let key in this.status){
      this.getPendingOrders(this.status[key])
    }
    this.getReadyOrders()
    this.getClosedOrders()
    this.getInventory()
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
  ngOnInit() {
    return this.authService.checkingAuthState().then( result => {
      if(result == null){
        this.route.navigate(['/login'])
      }else{
        //this.loadPictures()
      }
    })
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
    // let date = moment(new Date()).format('LLLL');
    // console.log(date);

      return this.productService.addItem(this.department, this.selectedCategory, this.itemName, this.description, this.price, this.size, this.accessory, this.summer, this.color, this.picture).then(result => {
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

  viewMore(query){
    this.route.navigate(['/'+ query])
  }
  
  loadKwangaItems(){
    let category : String
    for(let key in this.kwangaCategories){
      category  = this.kwangaCategories[key]
      this.loadItems(category, 'Kwanga')
      
    }
  }
  loadDankieJesuItems(){
    let category : String
    for(let key in this.dankieJesuCategories){
      category = this.dankieJesuCategories[key]
      this.loadItems(category, 'Dankie Jesu')
    }
  }
  loadViewedCategory(){
    
  }
  loadItems(category, brand){
    let data : Array<any> = []
    return this.productService.loadCategoryItems(category, brand).then(result => {
      if(result !== undefined){
      }
      for(let key in result){
        if(brand === 'Kwanga'){
          this.kwangaProducts.push(result[key])
          this.allProducts.push(result[key])
        }else if(brand === 'Dankie Jesu'){
          this.dankieJesuProducts.push(result[key])
          this.allProducts.push(result[key])
          if(result[key].data.isSummer === true){
            this.summerProducts.push(result[key])
          }else if(result[key].data.isSummer === false){
            this.winterProducts.push(result[key])
          }
        }
      }
      if(this.summerProducts.length > 0 ){
      }else if(this.winterProducts.length > 0){   
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
    console.log(this.allProducts, 'yugfg7g76gyg6gt7677');
    
  }
  getPendingOrders(status){
    return this.productService.getPendingOrders(status).then(result => {
      console.log(result);
      let array = result
      if(result.length !== 0){
        for(let key in result){
          this.pendingOrders.push(result[key])
          console.log(this.pendingOrders);
        }
        for(let key in this.pendingOrders){
          this.loadUserName(this.pendingOrders[key].details.userID)
        }
      }
    })
  }
  loadUserName(data){

    // return this.productService.loadUser(ID).then(result => {
    //   this.pendingOrders[key].name = result
    //   console.log(this.pendingOrders);
    // })
  return this.productService.loadUser(data).then(result => {
    console.log(result);
    for(let key in this.pendingOrders){
      if(this.pendingOrders[key].details.userID === result.userID){
        this.pendingOrders[key].details.name = result.name
        this.pendingOrders[key].details.cell = result.cell
      }
    }
    console.log(this.pendingOrders);
    
  })
  //thisgffdsg

  
}
  getReadyOrders(){
    return this.productService.getReadyOrders().then(result => {
    })
  }

  // get orders that are closed, history, status == closed
  getClosedOrders(){
    return this.productService.getOrderHistory().then(result => {
      
    })
  }
  closeOrder(docID){
    return this.productService.closedOrder(docID).then(result => {
      
    })
  }
  navigateForward(value){
    console.log(value);
    //let parameter = [{category: value, brand: 'Kwanga'}]
    //this.route.navigate(['/items-list', value], parameter)
    let parameter : NavigationExtras = {queryParams : {category: value, brand: 'Dankie Jesu', title: 'Summer Gear', link: 'summer-gear'}}
    this.navCtrl.navigateForward(['items-list', value], parameter);
  }

  //Search functionality
  search(query){
    this.filterItems(query, this.allProducts)
    this.searchArray = []
  }
  filterItems(query, array){
    let queryFormatted = query.toLowerCase();
    console.log(queryFormatted);
    console.log(array);
    if(queryFormatted !== ''){
      let nameResult = array.filter(item => item.data.name.toLowerCase().indexOf(queryFormatted) >= 0)
      let addBrand : boolean
      let addCategory : boolean
      let addName : boolean
      addName = false
      addCategory = false
      addBrand = false
      //console.log(brandResult);
      //console.log(categoryResult);
      console.log(nameResult);
      this.searchArray = nameResult
    }else if(queryFormatted === ''){
      this.searchArray = []
    }
  }


  back(){
    this.route.navigate(['/landing'])
  }
  
  showPendingList() {
    var historyItems = document.getElementsByClassName("pending-items") as HTMLCollectionOf<HTMLElement>;
    historyItems[0].style.display = "block"
  }
  showHistoryList() {
    var pendingItems = document.getElementsByClassName("history-items") as HTMLCollectionOf<HTMLElement>;
    pendingItems[0].style.display = "block"
  }
  showInventoryList() {
    var inventoryItems = document.getElementsByClassName("inventory-items") as HTMLCollectionOf<HTMLElement>;
    inventoryItems[0].style.display = "block"
  }
  dismissList() {
    var historyItems = document.getElementsByClassName("history-items") as HTMLCollectionOf<HTMLElement>;
    historyItems[0].style.display = "none";
    var pendingItems = document.getElementsByClassName("pending-items") as HTMLCollectionOf<HTMLElement>;
    pendingItems[0].style.display = "none";
    var inventoryItems = document.getElementsByClassName("inventory-items") as HTMLCollectionOf<HTMLElement>;
    inventoryItems[0].style.display = "none"

  }

  showLeftSide() {
    console.log("Showing left side menu");
    document.getElementById("left-items-list").style.left = "0"

  }
  searchButtonState:string = "search"
  showSearchBar() {
    console.log("Showing searchbar");
    if (this.miniSearchBarState == true) {
      this.miniSearchBarState = false;
      console.log(this.miniSearchBarState);
      this.searchButtonState = "search"
    }
    else {
      this.miniSearchBarState = true;
      console.log(this.miniSearchBarState);
      this.searchButtonState = "close"
    }
  }
  showRightSide() {
    console.log("Showing right side menu");
    document.getElementById("right-items-list").style.right = "0"

  }

  sideMenuButtons: boolean = true;
  hideSideMenu() {
    this.sideMenuButtons = true
    document.getElementById("left-items-list").style.left = "-100%"
    document.getElementById("right-items-list").style.right = "-100%"
  }
  listOfItems: number = 0
  showPendingListSmall(){
    this.sideMenuButtons = false;
    this.listOfItems = 1;
  }
  showHistoryListSmall(){
    this.sideMenuButtons = false;
    this.listOfItems = 2;
  }
  showInventoryListSmall(){
    this.sideMenuButtons = false;
    this.listOfItems = 3;
  }
  stepBackToBtns(){
    this.sideMenuButtons = true;
    this.listOfItems = 0;
  }
}
