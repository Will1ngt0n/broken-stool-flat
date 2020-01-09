import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { ProductsService } from '../services/products-services/products.service';
import { AuthService } from '../services/auth-services/auth.service';

@Component({
  selector: 'app-winter-gear',
  templateUrl: './winter-gear.page.html',
  styleUrls: ['./winter-gear.page.scss'],
})
export class WinterGearPage implements OnInit {
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
  picture : File
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

  @ViewChild('fileInput', {static:true}) fileInput : ElementRef
  @ViewChild('departmentCombo', {static : true}) departmentCombo : ElementRef
  @ViewChild('nativeCategory', {static : true}) nativeCategory : ElementRef
  @ViewChild('checkboxXS', {static : true}) checkboxXS : ElementRef
  @ViewChild('checkboxS', {static : true}) checkboxS : ElementRef
  @ViewChild('checkboxM', {static : true}) checkboxM : ElementRef
  @ViewChild('checkboxL', {static : true}) checkboxL : ElementRef
  @ViewChild('checkboxXL', {static : true}) checkboxXL : ElementRef
  @ViewChild('checkboxXXL', {static : true}) checkboxXXL : ElementRef
  @ViewChild('checkboxXXXL', {static : true}) checkboxXXXL : ElementRef
  @ViewChild('checkboxBlack', {static : true}) checkboxBlack : ElementRef
  @ViewChild('checkboxBrown', {static : true}) checkboxBrown : ElementRef
  @ViewChild('checkboxOrange', {static : true}) checkboxOrange : ElementRef
  @ViewChild('checkboxYellow', {static : true}) checkboxYellow : ElementRef
  @ViewChild('checkboxWhite', {static : true}) checkboxWhite : ElementRef
  @ViewChild('btnClearForm', {static : true}) btnClearForm : ElementRef
  constructor(private alertController : AlertController, private authService : AuthService, private navCtrl : NavController, public route : Router, public productsService : ProductsService ) {
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
    //let date = moment(new Date()).format('LLLL');
    //let tee = moment(new Date('10/12/2019')).format('LLLL')
    // console.log(date);
    // console.log(tee);
    // if(date > tee){
    //   console.log(date);
      
    // }
    // this.orderItems()

    // for(let key in this.status){
    //   this.getPendingOrders(this.status[key])
    // }
    this.getReadyOrders()
    this.getClosedOrders()
    this.getInventory()
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
    if (this.department === 'Select Department') {
      this.department = undefined
      this.nativeCategory.nativeElement.disabled = true
    }else{
      this.nativeCategory.nativeElement.disabled = false
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
    if (this.selectedCategory === 'Select Category') {
      this.selectedCategory = undefined
    }
    this.checkValidity()
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
  checkValidity() {
    if (this.selectedCategory === undefined || this.selectedCategory === 'Select Category' || this.department === undefined || this.department === 'Select Department' || this.size.length === 0 || this.color.length === 0 || this.itemName === '' || this.description === '' || this.price === '' || this.fileInput.nativeElement.value === '' || this.picture === undefined) {
      this.addForm = false
      console.log(this.addForm);

    } else {
      this.addForm = true
      console.log(this.addForm);
    }
    if (this.department !== undefined || this.department !== 'Select Department' || this.selectedCategory !== 'Select Category' || this.selectedCategory !== undefined || this.size.length !== 0 || this.color.length !== 0 || this.itemName !== '' || this.description !== '' || this.price !== '' || this.fileInput.nativeElement.value !== '' || this.picture !== undefined) {
      this.formHasValues = true
      console.log(this.formHasValues, 'form has values');
     // this.btnClearForm.nativeElement.disabled = false
    } 
    // else {
    //   this.formHasValues = false
    //   console.log(this.formHasValues, 'form has values');
    //   //this.btnClearForm.nativeElement.disabled = true
    // }
  }
  checkColor(event, color) {
    this.checkValidity()
    console.log(color);
    console.log(this.size);
    let checkbox = event.target['name']
    if (checkbox) {
      if (event.target.checked === true) {
        this.color.push(color)
        console.log(this.color);
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
  addPicture(event){
    this.picture = <File>event.target.files[0]
    // let name = event.target.name
    // let pictureName = name
    // this.itemName = pictureName.replace('-', ' ')
    // this.description = this.itemName
  }
  // addItem() {
  //   this.route.navigate(['/'])
  // }
  // addProduct() {
  //   return this.productsService.addItem(this.department, this.selectedCategory, this.itemName, this.description, this.price, this.size, this.accessory, this.summer, this.color, this.picture).then(result => {
  //     this.clearForm();
  //     console.log('added to first firebase')
  //   }).then(result => {
  //   })
  // }

  //Clearing all form variables and form inputs respectively
  clearForm() {
    this.departmentOptions = ['Select Department', 'Dankie Jesu', 'Kwanga']
    this.categoryOptions = ['Select Category']
    this.selectedCategory = ''
    this.itemName = ''
    this.price = ''
    this.description = ''
    this.size = [];
    this.picture = undefined
    document.getElementById('accessory')['checked'] = false;
    document.getElementById('summer')['checked'] = false;
    this.fileInput.nativeElement.value = ''
    this.departmentCombo.nativeElement.value ='Select Department'
    let checkboxes: Array<any> = ['checkboxXS', 'checkboxS', 'checkboxM', 'checkboxL', 'checkboxXL', 'checkboxXXL', 'checkboxXXXL', 'checkboxBlack', 'checkboxBrown', 'checkboxOrange', 'checkboxYellow', 'checkboxWhite']
    let checkboxesNative : Array<any> = [this.checkboxXS, this.checkboxS, this.checkboxM, this.checkboxL, this.checkboxXL, this.checkboxXXL, this.checkboxXXXL, this.checkboxBlack, this.checkboxBrown, this.checkboxOrange, this.checkboxYellow, this.checkboxWhite]
    for (let i = 0; i < checkboxes.length; i++) {
      document.getElementsByName(checkboxes[i])[0]['checked'] = false
      checkboxesNative[i].nativeElement.checked = false
    }
    this.formHasValues = false
    this.addForm = false
    this.department = 'Select Department'
    this.selectedCategory = 'Select Category'
  }

  //Routing to sales page
  viewSales(query){
    console.log(query);
    let navOptions = {
      queryParams : {query : query}
    }
    this.navCtrl.navigateForward(['sales-specials'], navOptions)    
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
    return this.productsService.loadCategoryItems(category, brand).then(result => {
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
  getPendingOrders(){
    return this.productsService.getPendingOrders().then(result => {
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
  return this.productsService.loadUser(data).then(result => {
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
    return this.productsService.getReadyOrders().then(result => {
    })
  }

  // get orders that are closed, history, status == closed
  getClosedOrders(){
    // return this.productsService.getClosedOrders().then(result => {
      
    // })
  }
  closeOrder(docID){
    return this.productsService.closedOrder(docID).then(result => {
      
    })
  }

  back(){
    this.route.navigate(['/landing'])
  }
  navigateForward(value){
    console.log(value);
    //let parameter = [{category: value, brand: 'Kwanga'}]
    //this.route.navigate(['/items-list', value], parameter)
    let parameter : NavigationExtras = {queryParams : {category: value, brand: 'Dankie Jesu', title: 'Winter Gear', link: 'winter-gear'}}
    this.navCtrl.navigateForward(['items-list', value], parameter);
  }

    //Search functionality
    search(query){
      this.filterItems(query, this.allProducts)
      //this.searchArray = []
    }
    filterItems(query, array){
      let queryFormatted = this.searchInput.toLowerCase()
      if(queryFormatted !== '' && queryFormatted !== '*'){
        let nameResult = array.filter(item => item.data.name.toLowerCase().indexOf(queryFormatted) >= 0)
        console.log(nameResult);
        this.searchArray = nameResult
        console.log(this.searchArray);
        
      }else if(queryFormatted === '*'){
      this.searchArray = this.allProducts
      console.log(this.searchArray);
      
      }
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
