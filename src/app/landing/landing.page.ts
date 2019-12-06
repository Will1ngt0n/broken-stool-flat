import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../services/auth-services/auth.service';
import { ProductsService } from '../services/products-services/products.service';
import * as moment from 'moment';
import { NavController, AlertController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';

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
  inventory : Array<any> = []
  history : Array<any> = []
  readyOrders : Array<any> = []
  pendingOrders : Array<any> = []
  addForm : boolean 
  formHasValues : boolean 
  department : any
  picture : File
  searchArray
  pictures : Array<any> = []
  departmentOptions : Array<any> = ['Select Department', 'Dankie Jesu', 'Kwanga']
  kwangaCategories : Array<any> = ['Formal', 'Traditional', 'Smart Casual', 'Sports Wear']
  dankieJesuCategories : Array<any> = ['Vests', 'Caps', 'Bucket Hats', 'Shorts', 'Crop Tops', 'T-Shirts', 'Bags', 'Sweaters', 'Hoodies', 'Track Suits', 'Winter Hats', 'Beanies']
  categoryOptions: Array<any> = ['Select Category']
  inventoryItems :  Array<any> = []
  summer : boolean;
  winter : boolean = false
  kwanga : boolean = false
  selectedCategory: any
  itemName: String
  price: String
  description: String
  size: Array<any> = []
  color: Array<any> = []
  colors: Object = {};
  accessory: boolean;
  summerGear: Array<any> = []
  winterGear: Array<any> = []
  kwangaGear: Array<any> = []
  kwangaProducts: Array<any> = []
  dankieJesuProducts: Array<any> = []
  summerProducts: Array<any> = []
  winterProducts: Array<any> = []
  orderedWinterProducts: Array<any> = []
  orderedSummerProducts: Array<any> = []
  seasonalWear: Array<any> = []
  status = ['ready', 'recieved', 'collected', 'processed', 'cancelled']
  blackAvailable; blackPic
  brownAvailable; brownPic
  orangeAvailable; orangePic
  yellowAvailable; yellowPic
  whiteAvailable; whitePic
  dankieJesuPic : object = {}
  kwangaPic  : object = {}
  AllCatpic : object = {}
  miniSearchBarState: boolean = false;
  @ViewChild('sliderRef', { static: false }) slides: IonSlides;
  @ViewChild('sliderRefSmall', { static: true }) mySlides: IonSlides;
  @ViewChild('fileInput', {static:true}) fileInput : ElementRef
  @ViewChild('departmentCombo', {static : true}) departmentCombo : ElementRef





  sliderConfig = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    spaceBetween: 10,
    slidesPerView: 1.8, //use any number 1.8 or 4.2 or 7.3 etc..
    direction: 'horizontal',
    parallax: true,
    freeMode: false,
    allowSwipeToPrev: true,
    roundLengths: false,
    effect: 'fade'
  }
  sliderConfigSmall = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    spaceBetween: 10,
    slidesPerView: 2.32, //use any number 1.8 or 4.2 or 7.3 etc..
    direction: 'horizontal',
    parallax: true,
    freeMode: false,
    allowSwipeToPrev: true,
    roundLengths: false,
    effect: 'fade'
  }
  constructor(private alertController : AlertController, public navCtrl: NavController, public route: Router, public authService: AuthService, public productService: ProductsService) {
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
    let date = moment(new Date()).format('LLLL');
    let tee = moment(new Date('10/12/2019')).format('LLLL')
    console.log(date);
    console.log(tee);
    if (date > tee) {
      console.log(date);

    }

    for(let key = 0; key < this.status.length; key++){
      this.getPendingOrders(this.status[key])
      if(key === this.status.length -1){
        this.orderItems()
      }
    }
 
    this.getReadyOrders()
    this.getOrderHistory()
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
      this.route.navigate(['/login'])
    })
  }

  // ionViewCanEnter() : Promise<any> {
  //   return this.authService.checkingAuthState().then(result => {
  //     if(result === null){
  //        //return this.route.navigate(['/login'])
  //        return false
  //     }else{
  //       return true
  //     }
  //   }).catch(error => {
  //     return this.route.navigate(['/login'])
  //   })
  // }

  
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
  ngOnInit() {
    return this.authService.checkingAuthState().then( result => {
      if(result == null){
        this.route.navigate(['/login'])
      }else{
        this.loadPictures()
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
  checkValidity() {
    console.log(this.department);
    console.log(this.selectedCategory);
    console.log(this.itemName);
    console.log(this.description);
    console.log(this.price);
    console.log(this.size);
    console.log(this.color);

    if (this.selectedCategory === undefined || this.department === undefined || this.size.length === 0 || this.color.length === 0 || this.itemName === '' || this.description === '' || this.price === '') {
      this.addForm = false
      console.log(this.addForm);

    } else {
      this.addForm = true
      console.log(this.addForm);
    }
    if (this.department !== undefined || this.selectedCategory !== undefined || this.size.length !== 0 || this.color.length !== 0 || this.itemName !== '' || this.description !== '' || this.price !== '') {
      this.formHasValues = true
      console.log(this.formHasValues);

    } else {
      this.formHasValues = false
      console.log(this.formHasValues);
    }
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
    console.log(this.picture);

  //   let fullPath = this.picture
  //   let format 
  //  // let split = this.picture.split('\\')
  //   console.log(split);
  //   let imageData = split[split.length -1]
  //   let split2 = imageData.split('.')
  //   let imageFormat = split2[1]
  //   console.log(split2);
  //   let imageName = split2[0]
  //   console.log(imageFormat);
  //   console.log(imageName);
    
    
  //   new File(['fijRKjhudDjiokDhg1524164151'],
  //                    '../img/Products/fijRKjhudDjiokDhg1524164151.jpg', 
  //                    {type:'image/jpg'});


  //   new File([imageName], fullPath, {type:'image/' + imageFormat});
  //   let parts = [
  //     new Blob([this.picture], {type: 'image/' + imageFormat})
  //   ];
  //   let picture = new File(parts, imageName, {
  //     lastModified: Number(new Date()), // optional - default = now
  //     type: '"image/jpeg"' // optional - default = ''
  // })
  //console.log(picture);
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
    this.picture = undefined
    document.getElementById('accessory')['checked'] = false;
    document.getElementById('summer')['checked'] = false;
    this.fileInput.nativeElement.value = ''
    this.departmentCombo.nativeElement.value ='Select Category'
    let checkboxes: Array<any> = ['checkboxXS', 'checkboxS', 'checkboxM', 'checkboxL', 'checkboxXL', 'checkboxXXL', 'checkboxXXXL', 'checkboxBlack', 'checkboxBrown', 'checkboxOrange', 'checkboxYellow', 'checkboxWhite']
    for (let i = 0; i < checkboxes.length; i++) {
      document.getElementsByName(checkboxes[i])[0]['checked'] = false
    }
    this.formHasValues = false
    this.department = undefined
    this.selectedCategory = undefined
  }

  //Routing to sales page
  viewSales(query) {
    console.log(query);
    let navOptions = {
      queryParams: { query: query }
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
  loadDankieJesuItems() {
    let category: String
    for (let key in this.dankieJesuCategories) {
      category = this.dankieJesuCategories[key]
      this.loadItems(category, 'Dankie Jesu')
    }
  }
  loadViewedCategory() {

  }
  loadItems(category, brand){
    let data : Array<any> = []
    return this.productService.loadCategoryItems(category, brand).then(result => {
      if(result !== undefined){
        for(let key in result){
        if(brand === 'Kwanga'){
          this.kwangaProducts.push(result[key])
          this.allProducts.push(result[key])
          console.log(this.allProducts);
          if(this.kwangaGear.length < 4){
            this.kwangaGear.push(result[key])
          }
        }else if(brand === 'Dankie Jesu'){
          this.dankieJesuProducts.push(result[key])
          this.allProducts.push(result[key])
          if(result[key].data.isSummer === true){
            this.summerProducts.push(result[key])
            if(this.summerGear.length < 5){
              this.summerGear.push(result[key])
            }
          } else if (result[key].data.isSummer === false) {
            this.winterProducts.push(result[key])
            if(this.winterGear.length < 5){
              this.winterGear.push(result[key])
            }
          }
        }
      }
      }

      if(this.summerProducts.length > 0 ){
      }else if(this.winterProducts.length > 0){   
      }
      console.log(this.kwangaGear, this.summerGear, this.winterGear)
        this.summerGear.sort(( a , b  ) => a.data.dateAdded > b.data.dateAdded ? 1 : 0 )
        this.winterGear.sort(( a , b  ) => a.data.dateAdded > b.data.dateAdded ? 1 : 0 )
        this.kwangaGear.sort(( a , b  ) => a.data.dateAdded > b.data.dateAdded ? 1 : 0 )
        console.log(this.kwangaGear, this.summerGear, this.winterGear)
      })
      }
      orderItems(){
        // this.summerProducts.sort(( a , b  ) => a.data.dateAdded > b.data.dateAdded ? 1 : 0 )
        // this.winterProducts.sort(( a , b  ) => a.data.dateAdded > b.data.dateAdded ? 1 : 0 )
        // console.log(this.summerProducts);
        
        // for(let i = 0; i < 5; i++){this.summerGear.push(this.summerProducts[i])}
        // for(let i = 0; i < 5; i++){this.winterGear.push(this.winterProducts[i])}
        // console.log(this.summerGear);
        // console.log(this.winterGear);
        
        
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
      this.readyOrders = result
    })
  }

  // get orders that are closed, history, status == closed
  getOrderHistory(){
    return this.productService.getOrderHistory().then(result => {
      this.history = result
      let totalPrice : Number = 0
      let numberOfItems : Number = 0
      console.log(this.history);
      for(let key in this.history){
        totalPrice = 0
        numberOfItems = 0
        for(let i in this.history[key].details.orders){
          console.log(this.history[key].details.orders[i]);
          totalPrice = +totalPrice + +this.history[key].details.orders[i].cost * +this.history[key].details.orders[i].quantity
          numberOfItems = +numberOfItems + +this.history[key].details.orders[i].quantity
          console.log(totalPrice);
          console.log(numberOfItems);
        }
        this.history[key].details.totalPrice = totalPrice
        this.history[key].details.numberOfItems = numberOfItems
        console.log(this.history[key]);
        
      }
    })
  }
  viewOrderHistory(item){
    console.log(item);
    let parameter : NavigationExtras = {queryParams : {category: item, link: '/landing', refNo: item.refNo, userID: item.details.uid}}
    this.navCtrl.navigateForward(['order-receipt'], parameter);
  }
  closeOrder(docID){
    return this.productService.closedOrder(docID).then(result => {
      
    })
  }

  //console.log(this.allItems);

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
  subtract(item){
    console.log(item.productID);
    for(let key in this.allProducts){
      if(this.allProducts[key].productID === item.productID){
        this.allProducts[key].data.quantity = this.allProducts[key].data.quantity - 1
      }
    }
  }
  add(item){
    console.log(item);
    for(let key in this.allProducts){
      if(this.allProducts[key].productID === item.productID){
        this.allProducts[key].data.quantity = this.allProducts[key].data.quantity + 1
      }
    }
  }
  changePrice(event, item){
    console.log(item);
    //console.log(event);
    let number = document.getElementById(item.productID)['value']
    console.log(number)
    for(let key in this.allProducts){
      if(this.allProducts[key].productID === item.productID){
        this.allProducts[key].data.quantity = number
      }
    }
    
  }
  saveQuantity(brand, category, productID, quantity){
    console.log(brand, category, productID, quantity);
    if(quantity === ''){
      quantity = 0
    }
    return this.productService.updateQuantity(brand, category, productID, quantity).then(result => {
      console.log(result);
    })
  }
  viewPendingOrder(item){
    console.log(item);
    let parameter : NavigationExtras = {queryParams : {refNo: item.refNo, userID: item.details.userID, user: item.details.name, cell: item.details.cell, currentPage: '/landing'}}
    this.navCtrl.navigateForward(['pending-order'], parameter);
  }
 
  addPicture(event){
    this.picture = <File>event.target.files[0]
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

  async loadPictures(){
    return this.productService.getPictures().then(result => {
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
    console.log(this.pictures);
    console.log(this.winterGear);
    console.log(this.summerGear);
    
    
    for(let i in this.pictures){
      //Adding pictures to products arrays
      for(let key in this.allProducts){
        if(this.pictures[i].productID === this.allProducts[key].productID){
          console.log('ddsfds');
          this.allProducts[key].pictures = {link: this.pictures[i].link}
          console.log(this.allProducts[key])
        }

      }
      for(let key in this.kwangaProducts){
        if(this.pictures[i].productID === this.kwangaProducts[key].productID){
          console.log('ddsfds');
          this.kwangaProducts[key].pictures = {link: this.pictures[i].link}
          console.log(this.kwangaProducts[key])
        }
        this.kwangaPic = this.kwangaProducts[0]
      }
      for(let key in this.summerGear){
        if(this.pictures[i].productID === this.summerGear[key].productID){
          console.log('ddsfds');
          this.summerGear[key].pictures = {link: this.pictures[i].link}
          console.log(this.summerGear[key])
        }
        this.dankieJesuPic = this.summerProducts[0]
      }
      for(let key in this.winterGear){
        if(this.pictures[i].productID === this.winterGear[key].productID){
          console.log('ddsfds');
          this.winterGear[key].pictures = {link: this.pictures[i].link}
          console.log(this.winterGear[key])
        }
        this.AllCatpic = this.winterProducts[0]
      }
    }
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
