import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../services/auth-services/auth.service';
import { ProductsService } from '../services/products-services/products.service';
import * as moment from 'moment';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import * as firebase from 'firebase'
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
  pendingOrdersLength = 0;
  orderHistoryLength = 0;
  inventoryLength = 0;
  addForm : boolean 
  formHasValues : boolean 
  department : any 
  picture : File
  searchArray
  pictures: Array<any> = []
  departmentOptions: Array<any> = ['Select Department', 'Dankie Jesu', 'Kwanga']
  kwangaCategories: Array<any> = ['Formal', 'Traditional', 'Smart Casual', 'Sports']
  dankieJesuCategories: Array<any> = ['Vests', 'Caps', 'Bucket Hats', 'Shorts', 'Crop Tops', 'T-Shirts', 'Bags', 'Sweaters', 'Hoodies', 'Track Suits', 'Beanies']
  newNumberOfProducts : number
  currentNumberOfProducts : number
  categoryOptions: Array<any> = ['Select Category']
  inventoryItems: Array<any> = []
  summer: boolean;
  winter: boolean = false
  kwanga: boolean = false
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
  //status = ['ready', 'received', 'processed', 'cancelled']
  blackAvailable; blackPic
  brownAvailable; brownPic
  orangeAvailable; orangePic
  yellowAvailable; yellowPic
  whiteAvailable; whitePic
  dankieJesuPic: object = {}
  kwangaPic: object = {}
  AllCatpic: object = {}
  miniSearchBarState: boolean = false;
  @ViewChild('sliderRef', { static: false }) slides: IonSlides;
  @ViewChild('sliderRefSmall', { static: true }) mySlides: IonSlides;
  @ViewChild('fileInput', {static:true}) fileInput : ElementRef
  @ViewChild('departmentCombo', {static : false}) departmentCombo : ElementRef
  
  @ViewChild('mbdepartmentCombo', {static : true}) mbdepartmentCombo : ElementRef
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

  //mobile view
  @ViewChild('mbcheckboxXS', {static : true}) mbcheckboxXS : ElementRef
  @ViewChild('mbcheckboxS', {static : true}) mbcheckboxS : ElementRef
  @ViewChild('mbcheckboxM', {static : true}) mbcheckboxM : ElementRef
  @ViewChild('mbcheckboxL', {static : true}) mbcheckboxL : ElementRef
  @ViewChild('mbcheckboxXL', {static : true}) mbcheckboxXL : ElementRef
  @ViewChild('mbcheckboxXXL', {static : true}) mbcheckboxXXL : ElementRef
  @ViewChild('mbcheckboxXXXL', {static : true}) mbcheckboxXXXL : ElementRef
  @ViewChild('mbcheckboxBlack', {static : true}) mbcheckboxBlack : ElementRef
  @ViewChild('mbcheckboxBrown', {static : true}) mbcheckboxBrown : ElementRef
  @ViewChild('mbcheckboxOrange', {static : true}) mbcheckboxOrange : ElementRef
  @ViewChild('mbcheckboxYellow', {static : true}) mbcheckboxYellow : ElementRef
  @ViewChild('mbcheckboxWhite', {static : true}) mbcheckboxWhite : ElementRef
  kwangaSpecialsPicture
  dankieJesuSpecialsPicture
  allSpecialsPicture

  sliderConfig = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    spaceBetween: 0,
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
    spaceBetween: 0,
    slidesPerView: 2.32, //use any number 1.8 or 4.2 or 7.3 etc..
    direction: 'horizontal',
    parallax: true, 
    freeMode: false,
    allowSwipeToPrev: true,
    roundLengths: false,
    effect: 'fade'
  }
  itemPrice; itemDescription; itemBrand; itemCategory; itemID; itemImageLink; itemSizes; itemColors
  editName; editPrice; editDescription; editBrand; editCategory; editID; editPercentage; editStartDate; editEndDate
  searchedProductStatus
  popCheckboxXS : boolean; popCheckboxS : boolean; popCheckboxM : boolean; popCheckboxL : boolean; popCheckboxXL : boolean; popCheckboxXXL : boolean; popCheckboxXXXL : boolean ;
  checkBlack: boolean; checkBrown : boolean; checkOrange : boolean; checkYellow : boolean; checkWhite : boolean
  updateName; updatePrice; updateDescription; updateColors: Array<any> = []; updateSizes: Array<any> = []
  pictureUpdate : File

  constructor(private alertController: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, public route: Router, public authService: AuthService, public productService: ProductsService) {
    //console.log(this.department);

    this.kwangaSpecialsPicture = undefined
    this.dankieJesuSpecialsPicture = undefined
    this.allSpecialsPicture = undefined
    this.allProducts = []
    this.pendingOrders = []
    this.history = []
    //this.productService.getCategories()
    this.loadTotalNumberOfProducts()
    this.getPendingOrders()


    this.colors = { red: '' }
    this.accessory = false;
    this.summer = false;
    this.department = 'Select Department'
    this.selectedCategory = 'Select Category'
    this.addForm = false
    this.formHasValues = false
    this.itemName = ''
    this.price = ''
    this.description = ''
    this.size = []
    this.color = []
    this.picture = undefined
    let date = moment(new Date()).format('LLLL');
    let tee = moment(new Date('10/12/2019')).format('LLLL')
    //console.log(date);
    //console.log(tee);
    if (date > tee) {
      //console.log(date);

    }

    this.getReadyOrders()
    this.getOrderHistory()
    this.getInventory()
    this.loader()
  }
  signOutPopup() {
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
            console.log('User clicked "cancel"');
          }
        }, {
          text: 'Okay',
          handler: (okay) => {
            console.log('User clicked "okay"');
            return this.signOut()
          }
        }
      ]
    });

    await alert.present();
  }
  signOut() {
    return this.authService.signOut().then(result => {
      //console.log(result);
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

  
  loader(){
    
  }
  ngOnInit() { ////copy

    this.testingEmail()
    this.loadFormal('Kwanga', 'Formal')
    this.loadTraditional('Kwanga', 'Traditional')
    this.loadSmartCasual('Kwanga', 'Smart Casual')
    this.loadSportsWear('Kwanga', 'Sports')
    this.loadVests('Dankie Jesu', 'Vests')
    this.loadCaps('Dankie Jesu', 'Caps')
    this.loadBucketHats('Dankie Jesu', 'Bucket Hats')
    this.loadShorts('Dankie Jesu', 'Shorts')
    this.loadCropTops('Dankie Jesu', 'Crop Tops')
    this.loadTShirts('Dankie Jesu', 'T-Shirts')
    this.loadBags('Dankie Jesu', 'Bags')
    this.loadSweaters('Dankie Jesu', 'Sweaters')
    this.loadHoodies('Dankie Jesu', 'Hoodies')
    this.loadTrackSuits('Dankie Jesu', 'Track Suits')
    this.loadBeanies('Dankie Jesu', 'Beanies')
    // this.loadPictures()
    //this.load16CategoryItems()
    // return this.authService.checkingAuthState().then( result => {
    //   if(result === null){
    //     this.route.navigate(['/login'])
    //   }else{
    //     //return this.loadPictures()

    //   }
    // })
  }
  load16CategoryItems(){
    return this.productService.load16CategoryItems().then((result : any) => {
      console.log(result)
      if(result !== null && result.length > 0){
        //console.log(result);
          this.allProducts = result
        console.log(this.allProducts);
      
      this.inventoryLength = this.allProducts.length
      this.sortProducts()
    }
      this.loadingCtrl.dismiss()
    })
  }
  loadPictures(){
    // firebase.storage().ref('/clothes').
  }
  loadFormal(brand, category){
    firebase.firestore().collection('Products').doc(brand).collection(category).onSnapshot(result => {
      //console.log('Running formal snapshots');
      // this.modifyLocalObjects(result, brand, category)
      if(result.docChanges().length !== 0 && (result.docChanges()[0].type === 'modified' || result.docChanges()[0].type === 'removed')){
        this.modifyLocalObjectsVests(result, brand, category)
      }else{
        console.log('result is empty : ' + result.empty)
      }
    })
  }
  loadTraditional(brand, category){
    firebase.firestore().collection('Products').doc(brand).collection(category).onSnapshot(result => {
     // console.log('Running traditional snapshots');
     if(result.docChanges().length !== 0 && (result.docChanges()[0].type === 'modified' || result.docChanges()[0].type === 'removed')){
      this.modifyLocalObjectsVests(result, brand, category)
    }else{
      console.log('result is empty : ' + result.empty)
    }
    })
  }
  loadSmartCasual(brand, category){
    firebase.firestore().collection('Products').doc(brand).collection(category).onSnapshot(result => {
      //console.log('Running smart casual snapshots');
      if(result.docChanges().length !== 0 && (result.docChanges()[0].type === 'modified' || result.docChanges()[0].type === 'removed')){
        this.modifyLocalObjectsVests(result, brand, category)
      }else{
        console.log('result is empty : ' + result.empty)
      }
    })
  }
  loadSportsWear(brand, category){
    firebase.firestore().collection('Products').doc(brand).collection(category).onSnapshot(result => {
      //console.log('Running sports wear snapshots');
      if(result.docChanges().length !== 0 && (result.docChanges()[0].type === 'modified' || result.docChanges()[0].type === 'removed')){
        this.modifyLocalObjectsVests(result, brand, category)
      }else{
        console.log('result is empty : ' + result.empty)
      }
    })
  }
  loadVests(brand, category){
    firebase.firestore().collection('Products').doc(brand).collection(category).onSnapshot(result => {
      //console.log('Running vests snapshots');
      // this.modifyLocalObjects(result, brand, category)
      console.log(result.docChanges())
      console.log(result)
      console.log(result.docs)
      console.log(result.empty)
      console.log(result.size)
      console.log(result.query)
      if(result.docChanges().length !== 0 && (result.docChanges()[0].type === 'modified' || result.docChanges()[0].type === 'removed')){
        this.modifyLocalObjectsVests(result, brand, category)
      }else{
        console.log('result is empty : ' + result.empty)
      }
    })
  }

  loadCaps(brand, category){
    firebase.firestore().collection('Products').doc(brand).collection(category).onSnapshot(result => {
      //console.log('Running caps snapshots');
      // this.modifyLocalObjects(result, brand, category)
      if(result.docChanges().length !== 0 && (result.docChanges()[0].type === 'modified' || result.docChanges()[0].type === 'removed')){
        this.modifyLocalObjectsVests(result, brand, category)
      }else{
        console.log('result is empty : ' + result.empty)
      }
    })
  }

  loadBucketHats(brand, category){
    firebase.firestore().collection('Products').doc(brand).collection(category).onSnapshot(result => {
      //console.log('Running bucket hats snapshots');
      // this.modifyLocalObjects(result, brand, category)
      if(result.docChanges().length !== 0 && (result.docChanges()[0].type === 'modified' || result.docChanges()[0].type === 'removed')){
        this.modifyLocalObjectsVests(result, brand, category)
      }else{
        console.log('result is empty : ' + result.empty)
      }
    })
  }

  loadShorts(brand, category){
    firebase.firestore().collection('Products').doc(brand).collection(category).onSnapshot(result => {
      //console.log('Running shorts snapshots');
      // this.modifyLocalObjects(result, brand, category)
      if(result.docChanges().length !== 0 && (result.docChanges()[0].type === 'modified' || result.docChanges()[0].type === 'removed')){
        this.modifyLocalObjectsVests(result, brand, category)
      }else{
        console.log('result is empty : ' + result.empty)
      }
    })
  }
  loadCropTops(brand, category){
    firebase.firestore().collection('Products').doc(brand).collection(category).onSnapshot(result => {
      //console.log('Running crop tops snapshots');
      if(result.docChanges().length !== 0 && (result.docChanges()[0].type === 'modified' || result.docChanges()[0].type === 'removed')){
        this.modifyLocalObjectsVests(result, brand, category)
      }else{
        console.log('result is empty : ' + result.empty)
      }
    })
  }
  loadTShirts(brand, category){
    firebase.firestore().collection('Products').doc(brand).collection(category).onSnapshot(result => {
      //console.log('Running t-shirts snapshots');
      if(result.docChanges().length !== 0 && (result.docChanges()[0].type === 'modified' || result.docChanges()[0].type === 'removed')){
        this.modifyLocalObjectsVests(result, brand, category)
      }else{
        console.log('result is empty : ' + result.empty)
      }
    })
  }
  loadBags(brand, category){
    firebase.firestore().collection('Products').doc(brand).collection(category).onSnapshot(result => {
      //console.log('Running bags snapShots');
      if(result.docChanges().length !== 0 && (result.docChanges()[0].type === 'modified' || result.docChanges()[0].type === 'removed')){
        this.modifyLocalObjectsVests(result, brand, category)
      }else{
        console.log('result is empty : ' + result.empty)
      }
    })
  }
  loadSweaters(brand, category){
    firebase.firestore().collection('Products').doc(brand).collection(category).onSnapshot(result => {
      //console.log('Running sweaters snapshots');
      if(result.docChanges().length !== 0 && (result.docChanges()[0].type === 'modified' || result.docChanges()[0].type === 'removed')){
        this.modifyLocalObjectsVests(result, brand, category)
      }else{
        console.log('result is empty : ' + result.empty)
      }
    })
  }
  loadHoodies(brand, category){
    //console.log('Running hoodies snapshots');
    firebase.firestore().collection('Products').doc(brand).collection(category).onSnapshot(result => {
      if(result.docChanges().length !== 0 && (result.docChanges()[0].type === 'modified' || result.docChanges()[0].type === 'removed')){
        this.modifyLocalObjectsVests(result, brand, category)
      }else{
        console.log('result is empty : ' + result.empty)
      }
    })
  }
  loadTrackSuits(brand, category){
    //console.log('Running track suits snapshots');
    firebase.firestore().collection('Products').doc(brand).collection(category).onSnapshot(result => {
      if(result.docChanges().length !== 0 && (result.docChanges()[0].type === 'modified' || result.docChanges()[0].type === 'removed')){
        this.modifyLocalObjectsVests(result, brand, category)
      }else{
        console.log('result is empty : ' + result.empty)
      }
    })
  }
  loadBeanies(brand, category){
    //console.log('Running beanies snapshots');
    firebase.firestore().collection('Products').doc(brand).collection(category).onSnapshot(result => {
      if(result.docChanges().length !== 0 && (result.docChanges()[0].type === 'modified' || result.docChanges()[0].type === 'removed')){
        this.modifyLocalObjectsVests(result, brand, category)
      }else{
        console.log('result is empty : ' + result.empty)
      }
    })
  }

  modifyLocalObjectsCaps(result, brand, category){
    let items : Array<any> = []
    let data : object = {}
    let productID = ''
    let docData
    let addItems : boolean
    for(let key in result.docChanges()){
      let change = result.docChanges()[key]
      if(change.type === 'added'){
        data = {}
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        // items.push(data)
      }else if(change.type === 'removed'){
        productID = change.doc.id
        for(let key in this.allProducts){
          if(productID === this.allProducts[key].productID){
            let index = Number(key)
            this.allProducts.splice(index, 1)
            this.inventoryLength = this.allProducts.length
          }
        }
        if(brand === 'Dankie Jesu'){
          if(change.doc.data().isSummer === true){
            for(let key in this.summerGear){
              if(productID === this.summerGear[key].productID){
                let index = Number(key)
                this.summerGear.splice(index, 1)
                
              }
            }
          }else if(change.doc.data().isSummer === false){
            for(let key in this.winterGear){
              if(productID === this.winterGear[key].productID){
                let index = Number(key)
                this.winterGear.splice(index, 1)
              }
            }
          }
        }else if(brand === 'Kwanga'){
          for(let key in this.kwangaGear){
            if(productID === this.kwangaGear[key].productID){
              let index = Number(key)
              this.kwangaGear.splice(index, 1)
            }
          }
        }
        this.sortKwangaProducts()
        this.sortSummerProducts()
        this.sortWinterProducts()
      }else if(change.type === 'modified'){
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        items.push(data)
        for(let key in this.allProducts){
          if(this.allProducts[key].productID === productID){
            this.allProducts[key].data = docData
            //addItems = false
          }else if(this.allProducts[key].productID !== productID){
            //addItems = true
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts.push(items[1])
    //   return
    // }
    if(this.allProducts.length === 0){
      this.allProducts = items
    }else if(this.allProducts.length > 0){
      for(let i in items){
        addItems = false
        for(let key in this.allProducts){
          if(this.allProducts[key].productID !== items[i].productID){
            addItems = true
          }else if(this.allProducts[key].productID === items[i].productID){
            addItems = false
            //let logo : Array<any> = []
            //logo.push(addItems);
            //console.log(logo);
            
            break
          }
        }
        if(addItems === true){
          this.allProducts.unshift(data)
          this.inventoryLength = this.allProducts.length
          if(brand === 'Dankie Jesu'){
            if(this.summer === true){
              this.summerGear.unshift(data)
              if(this.summerGear.length > 6){
                this.summerGear.splice(this.summerGear.length - 1, 1)
              }

            }else if(this.summer === false){
              this.winterGear.unshift(data)
              if(this.winterGear.length > 6){
                this.winterGear.splice(this.winterGear.length - 1, 1)
              }
            }
          }else if(brand === 'Kwanga'){
            this.kwangaGear.unshift(data)
            if(this.kwangaGear.length > 3){
              this.kwangaGear.splice(this.kwangaGear.length - 1, 1)
            }
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts = items
    // }

    let addToWinter : boolean
    let addToSummer : boolean
    let addToKwanga : boolean

///////////////////////////////////////////////////////////////////
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.summerGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === true){
          if(this.allProducts[i].productID !== this.summerGear[j].productID){
            addToSummer = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.summerGear[j].productID){
            addToSummer = false
            //console.log(this.allProducts[i].productID);
            return
          }
          }
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToWinter = false
      for(let j in this.winterGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === false){
          if(this.allProducts[i].productID !== this.winterGear[j].productID){
            addToWinter = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.winterGear[j].productID){
            addToWinter = false
            break
          }

          }
        }
      }
      if(addToWinter === true){
        if(this.winterGear.length < 6){
          this.winterGear.push(this.allProducts[i])
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.kwangaGear){
      if(this.allProducts[i].brand === 'Kwanga'){
          if(this.allProducts[i].productID !== this.kwangaGear[j].productID){
            addToKwanga = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.kwangaGear[j].productID){
            addToKwanga = false
            //console.log(this.allProducts[i].productID);
            break
          }
        }
      }
      if(addToKwanga === true){
        if(this.kwangaGear.length < 3){
          this.kwangaGear.push(this.allProducts[i])
        }
      }
    }
    this.sortKwangaProducts()
    this.sortSummerProducts()
    this.sortWinterProducts()
  }
  changeDepartment(event) {
    //console.log('Accessory ', this.accessory);

    //console.log(event.target['value']);
    this.department = event.target['value']
    console.log(this.department)
    if (this.department === 'Dankie Jesu') {
      this.categoryOptions = ['Select Category', 'Vests', 'Caps', 'Bucket Hats', 'Shorts', 'Crop Tops', 'T-Shirts', 'Sweaters', 'Hoodies', 'Track Suits', 'Beanies', 'Bags']
    }
    if (this.department === 'Kwanga') {
      this.categoryOptions = ['Select Category', 'Formal', 'Traditional', 'Smart Casual', 'Sports']
    }
    if (this.department === 'Select Department') {
      this.department = undefined
      this.nativeCategory.nativeElement.disabled = true   ////
      this.nativeCategory.nativeElement.value = 'Select Category'   ///
    }else{
      this.nativeCategory.nativeElement.disabled = false   ////
    }


    this.checkValidity()
  }
  checkItemName(){
    console.log(this.itemName);
    
    this.checkValidity()
  }
  checkItemDescription(){
    console.log(this.description);
    //
    this.checkValidity()
  }
  changeCategory(event) {
    //console.log(event.target['value']);
    this.selectedCategory = event.target['value']
    if (this.selectedCategory === 'Select Category') {
      this.selectedCategory = 'Select Category'
    }
    if(this.selectedCategory === 'Vests' || this.selectedCategory === 'Caps' || this.selectedCategory === 'Bucket Hats' || this.selectedCategory === 'Shorts' || this.selectedCategory === 'Crop Tops' || this.selectedCategory === 'T-Shirts'){
      this.summer = true
      console.log('isSummer = ', this.summer);
      
    }   /// 'Sweaters', 'Hoodies', 'Track Suits', 'Beanies', 'Bags')
    if(this.selectedCategory === 'Sweaters' || this.selectedCategory === 'Hoodies' || this.selectedCategory === 'Track Suits' || this.selectedCategory === 'Beanies'){
      this.summer = false
      console.log('isSummer = ', this.summer);
      
    }
    
    if(this.selectedCategory === 'Bags' || this.selectedCategory === 'Caps' || this.selectedCategory === 'Bucket Hats' || this.selectedCategory === 'Beanies'){
      this.accessory = true   ///, 'Bags'))
    }else{
      this.accessory = false
    }

    this.checkValidity()
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


    this.size
    this.checkValidity()
  }
  invprice : number
  changeInventoryPrice(){
    if(this.invprice < 0){
      this.price
    }
  }
  changePrice(){
    if(Number(this.price) < 0){
      this.price = ''
    }else if(Number(this.price) > 10000){
      this.price = '10000'
    }
    console.log(this.price);
    if(this.price === null){
      this.price = ''
    }
    console.log(this.price);
    
    this.checkValidity()
  }
  generateCode : boolean
  checkValidity() {
    console.log('running');
    
    if(this.nativeCategory.nativeElement.disabled === true){
      this.selectedCategory = 'Select Category'
    }
    if (this.selectedCategory === 'Select Category' || this.department === 'Select Department' || this.size.length === 0 || this.color.length === 0 || this.itemName === '' || this.description === '' || this.price === '' || this.fileInput.nativeElement.value === '' || this.picture === undefined || this.newProductCode === '' || this.newProductCode === undefined || this.categoryMatch === undefined || this.categoryMatch === true) {
      this.addForm = false
      console.log(this.addForm);

    } else {
      this.addForm = true
      console.log(this.addForm);
    }
    if (this.selectedCategory === 'Select Category' || this.department === 'Select Department' || this.size.length === 0 || this.color.length === 0 || this.itemName === '' || this.description === '' || this.price === '' || this.fileInput.nativeElement.value === '' || this.picture === undefined || this.categoryMatch === undefined || this.categoryMatch === true) {
      this.generateCode = false
      console.log(this.generateCode);

    } else {
      this.generateCode = true
      console.log(this.generateCode);
    }
    if (this.department !== 'Select Department' || this.selectedCategory !== 'Select Category' || this.size.length !== 0 || this.color.length !== 0 || this.itemName !== '' || this.description !== '' || this.price !== '' || this.fileInput.nativeElement.value !== '' || this.picture !== undefined || this.newProductCode !== '') {
      this.formHasValues = true
      console.log(this.formHasValues, 'form has values');
     // this.btnClearForm.nativeElement.disabled = false
    }else{
      this.formHasValues = false
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
  myUpload = "../../assets/imgs/default.png";
  uploaderImage = document.getElementsByClassName("adder") as HTMLCollectionOf <HTMLElement>;
  uploadedImage = document.getElementsByClassName("imageChanged") as HTMLCollectionOf <HTMLElement>;
  addPicture(event){
    this.picture = <File>event.target.files[0]
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.myUpload = event.target.result;
          console.log(this.myUpload);
          //console.log(event.target.readAsText(this.picture));

        };
         //         this.picture = <File>event.target.files[0]
        reader.readAsDataURL(event.target.files[0]);
        console.log(event.target.files[0]);
        console.log(event);
        console.log(reader.DONE);
        console.log(reader.EMPTY);
        console.log(reader.error);
        console.log(reader.onerror);
        console.log(reader.readyState);
        //console.log(reader.readAsText(event.target.files[0]));
        
        
        
        
        
        
        
        if(event.target.files[0]){
          this.uploaderImage[0].style.display = "none"
          this.uploadedImage[0].style.display = "block"
        }
        this.checkValidity()
  }
  // addItem() {
  //   this.route.navigate(['/'])
  // }
  addProduct(){
    this.presentLoading()
    this.currentNumberOfProducts = this.inventoryLength
    let number : string = String(Number(this.currentNumberOfProducts) + 1)
    console.log(number);
    let sort : Array<string> = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    let tempColor = this.size
    this.size = []
    for(let color in sort){
      for(let i in tempColor){
        if(sort[color] === tempColor[i]){
          this.size.push(sort[color])
        }
      }
    }
    console.log(this.size);
    let checkVal : Array<string> = this.itemName.split('')
    //console.log(checkVal);
    console.log(checkVal);
    
    this.cutDoubleSpace(this.itemName).then((result : string) => {
      console.log(result);
      this.itemName = result
      console.log(this.itemName)
    }).then(result => {
      //let array = this.itemDescription.split('')
      this.cutDoubleSpace(this.description).then((result : string) => {
        this.itemDescription = result
        console.log(result);
        
      }).then( res => {
        console.log('successful');
              this.addProducts(number)
      })

    })

        
  }
  addProducts(numberOfProducts) {
    let brand = this.department
    let category = this.selectedCategory
    return this.productService.addItem(this.department, this.selectedCategory, this.itemName, this.description, this.price, this.size, this.accessory, this.summer, this.color, this.picture, numberOfProducts, this.newProductCode).then((result : any) => {
      console.log(result);
      
      if(result === 'success'){
        console.log('successs');
        
      }
      this.loadTotalNumberOfProducts()
      this.loadingCtrl.dismiss()
      this.productAlert('Product was successfully added')
      this.clearForm();
    })
  }

  //Clearing all form variables and form inputs respectively
  clearForm() { //clearform for bigger screens
    
    this.uploaderImage[0].style.display = "block"
    this.uploadedImage[0].style.display = "none"
    this.departmentOptions = ['Select Department', 'Dankie Jesu', 'Kwanga']
    this.categoryOptions = ['Select Category']
    this.selectedCategory = ''
    this.itemName = ''
    this.price = ''
    this.description = ''
    this.size = [];
    this.color = []
    this.picture = undefined
    this.myUpload = "../../assets/imgs/default.png"
    this.newProductCode = ''
    //document.getElementById('accessory')['checked'] = false;
    //document.getElementById('summer')['checked'] = false;
    this.fileInput.nativeElement.value = ''

    if(this.departmentCombo){
    this.departmentCombo.nativeElement.value ='Select Department'
    }
    if(this.mbdepartmentCombo){
      this.mbdepartmentCombo.nativeElement.value ='Select Department'
    }

    let checkboxes: Array<any> = ['checkboxXS', 'checkboxS', 'checkboxM', 'checkboxL', 'checkboxXL', 'checkboxXXL', 'checkboxXXXL', 'checkboxBlack', 'checkboxBrown', 'checkboxOrange', 'checkboxYellow', 'checkboxWhite']
    let mbcheckboxes: Array<any> = ['mbcheckboxXS', 'mbcheckboxS', 'mbcheckboxM', 'mbcheckboxL', 'mbcheckboxXL', 'mbcheckboxXXL', 'mbcheckboxXXXL', 'mbcheckboxBlack', 'mbcheckboxBrown', 'mbcheckboxOrange', 'mbcheckboxYellow', 'mbcheckboxWhite']
    
    let checkboxesNative : Array<any> = [this.checkboxXS, this.checkboxS, this.checkboxM, this.checkboxL, this.checkboxXL, this.checkboxXXL, this.checkboxXXXL, this.checkboxBlack, this.checkboxBrown, this.checkboxOrange, this.checkboxYellow, this.checkboxWhite]
    let mbcheckboxesNative : Array<any> = [this.mbcheckboxXS, this.mbcheckboxS, this.mbcheckboxM, this.mbcheckboxL, this.mbcheckboxXL, this.mbcheckboxXXL, this.mbcheckboxXXXL, this.mbcheckboxBlack, this.mbcheckboxBrown, this.mbcheckboxOrange, this.mbcheckboxYellow, this.mbcheckboxWhite]    
    for (let i = 0; i < checkboxes.length; i++) {
      document.getElementsByName(checkboxes[i])[0]['checked'] = false
      //document.getElementsByName(mbcheckboxes[i])[0]['checked'] = false
      //checkboxesNative[i].nativeElement.checked = false
      //mbcheckboxesNative[i].nativeElement.checked = false
    }
    this.formHasValues = false
    this.addForm = false
    this.department = 'Select Department'
    this.selectedCategory = 'Select Category'
  }
  mbclearForm() { //clearform for small screens
    
    this.uploaderImage[0].style.display = "block"
    this.uploadedImage[0].style.display = "none"
    this.departmentOptions = ['Select Department', 'Dankie Jesu', 'Kwanga']
    this.categoryOptions = ['Select Category']
    this.selectedCategory = ''
    this.itemName = ''
    this.price = ''
    this.description = ''
    this.size = [];
    this.picture = undefined
    this.myUpload = "../../assets/imgs/default.png"
    //document.getElementById('accessory')['checked'] = false;
    //document.getElementById('summer')['checked'] = false;
    this.fileInput.nativeElement.value = ''

    if(this.departmentCombo){
    this.departmentCombo.nativeElement.value ='Select Department'
    }
    if(this.mbdepartmentCombo){
      this.mbdepartmentCombo.nativeElement.value ='Select Department'
    }

    let checkboxes: Array<any> = ['checkboxXS', 'checkboxS', 'checkboxM', 'checkboxL', 'checkboxXL', 'checkboxXXL', 'checkboxXXXL', 'checkboxBlack', 'checkboxBrown', 'checkboxOrange', 'checkboxYellow', 'checkboxWhite']
    let mbcheckboxes: Array<any> = ['mbcheckboxXS', 'mbcheckboxS', 'mbcheckboxM', 'mbcheckboxL', 'mbcheckboxXL', 'mbcheckboxXXL', 'mbcheckboxXXXL', 'mbcheckboxBlack', 'mbcheckboxBrown', 'mbcheckboxOrange', 'mbcheckboxYellow', 'mbcheckboxWhite']
    
    let checkboxesNative : Array<any> = [this.checkboxXS, this.checkboxS, this.checkboxM, this.checkboxL, this.checkboxXL, this.checkboxXXL, this.checkboxXXXL, this.checkboxBlack, this.checkboxBrown, this.checkboxOrange, this.checkboxYellow, this.checkboxWhite]
    let mbcheckboxesNative : Array<any> = [this.mbcheckboxXS, this.mbcheckboxS, this.mbcheckboxM, this.mbcheckboxL, this.mbcheckboxXL, this.mbcheckboxXXL, this.mbcheckboxXXXL, this.mbcheckboxBlack, this.mbcheckboxBrown, this.mbcheckboxOrange, this.mbcheckboxYellow, this.mbcheckboxWhite]    
    for (let i = 0; i < checkboxes.length; i++) {
      //document.getElementsByName(checkboxes[i])[0]['checked'] = false
      document.getElementsByName(mbcheckboxes[i])[0]['checked'] = false
      //checkboxesNative[i].nativeElement.checked = false
      //mbcheckboxesNative[i].nativeElement.checked = false
    }
    this.formHasValues = false
    this.addForm = false
    this.department = 'Select Department'
    this.selectedCategory = 'Select Category'
  }
  //Routing to sales page
  viewSales(query) {
    console.log(query);
    let navOptions = {
      queryParams: { query: query }
    }
    this.navCtrl.navigateForward(['sales-specials'], navOptions)
  }

  viewMore(query) {
    this.route.navigate(['/' + query])
  }

  loadKwangaItems() {
    let category: String
    for (let key in this.kwangaCategories) {
      category = this.kwangaCategories[key]
      console.log(category);
      this.loadItems(category, 'Kwanga')

    }
  }
  loadDankieJesuItems() {
    let category: String
    
    for (let key in this.dankieJesuCategories) {

      
      category = this.dankieJesuCategories[key]
      //console.log(category);
      this.loadItems(category, 'Dankie Jesu')
    }
  }
  loadViewedCategory() {

  }

  loadTotalNumberOfProducts(){
    return this.productService.getNumberOfProducts().then( (result : number) => {
      this.currentNumberOfProducts = result
      //console.log(this.currentNumberOfProducts);
      
    })
  }

  presentLoader(){
    this.presentLoading()
    
  }
  loadItems(category, brand){


 
    let data : Array<any> = []
    return this.productService.loadCategoryItems(category, brand).then(result => {
      if(result !== undefined){
        //console.log(result);

        
        for(let key in result){
          if(brand === 'Kwanga'){
            this.kwangaProducts.push(result[key])
            this.allProducts.push(result[key])

            if(this.kwangaSpecialsPicture !== undefined){
              this.kwangaSpecialsPicture = this.kwangaProducts[0].data.pictureLink
            }
            //console.log(this.allProducts);


          }else if(brand === 'Dankie Jesu'){
            this.dankieJesuProducts.push(result[key])
            this.allProducts.push(result[key])
            if(this.dankieJesuSpecialsPicture !== undefined){
              this.dankieJesuSpecialsPicture = this.dankieJesuProducts[0].data.pictureLink
            }
            if(this.allSpecialsPicture!== undefined){
              this.allSpecialsPicture = this.dankieJesuProducts[0].data.pictureLink
            }

          }
      }

      //sorting allProducts array

      console.log(this.allProducts);
      
      this.inventoryLength = this.allProducts.length
      this.sortProducts()
      }
      // if(this.summerProducts.length > 0 ){
      // }else if(this.winterProducts.length > 0){   
      // }
      // console.log(this.kwangaGear, this.summerGear, this.winterGear)
      // this.summerGear.sort(( a , b  ) => a.data.dateAdded > b.data.dateAdded ? 1 : 0 )
      // this.winterGear.sort(( a , b  ) => a.data.dateAdded > b.data.dateAdded ? 1 : 0 )
      // this.kwangaGear.sort(( a , b  ) => a.data.dateAdded > b.data.dateAdded ? 1 : 0 )
      // console.log(this.kwangaGear, this.summerGear, this.winterGear)
    })
  }

  sortSummerProducts(){
    let addToSummer
    for(let key in this.allProducts){
      for(let i in this.summerGear){
        if(this.allProducts[key].brand === 'Dankie Jesu' && this.allProducts[key].data.isSummer === true)
        if(this.allProducts[key].productID === this.summerGear[i].productID){
          addToSummer = false
          break
        }else if(this.allProducts[key].productID !== this.summerGear[i].productID){
          addToSummer = true
        }
      }
      if(addToSummer === true && this.summerGear.length < 6){
        this.summerGear.push(this.allProducts[key])
      }
    }
    this.summerGear.sort( (a,b) => {
      let data = (a.data.name) - (b.data.name)
      let c : any = new Date(a.data.dateAdded)
      let d : any = new Date(b.data.dateAdded)
      //console.log(data);
      //console.log(c - d);
      
      return d - c
    });
  }
  sortWinterProducts(){
    let addToWinter
    for(let key in this.allProducts){
      for(let i in this.winterGear){
        if(this.allProducts[key].brand === 'Dankie Jesu' && this.allProducts[key].data.isSummer === false && this.allProducts[key].data.isAccessory === false){
          if(this.allProducts[key].productID === this.winterGear[i].productID){
            addToWinter = false
            break
          }else if(this.allProducts[key].productID !== this.winterGear[i].productID){
            addToWinter = true
          }
        }
      }
      if(addToWinter === true && this.winterGear.length < 6){
        this.winterGear.push(this.allProducts[key])
      }
    }
    this.winterGear.sort( (a,b) => {
      let data = (a.data.name) - (b.data.name)
      let c : any = new Date(a.data.dateAdded)
      let d : any = new Date(b.data.dateAdded)
      //console.log(data);
      //console.log(c - d);
      
      return d - c
    });
  }
  sortKwangaProducts(){
    let addToKwanga : boolean
    for(let key in this.allProducts){
      for(let i in this.kwangaGear){
        if(this.allProducts[key].brand === 'Kwanga'){
          if(this.allProducts[key].productID === this.kwangaGear[i].productID){
            addToKwanga = false
            break
          }else if(this.allProducts[key].productID !== this.kwangaGear[i].productID){
            addToKwanga = true
          }
        }
      }
      console.log(this.kwangaGear);
      
      if(addToKwanga === true && this.kwangaGear.length < 3){
        this.kwangaGear.push(this.allProducts[key])
      }
    }
    this.kwangaGear.sort( (a,b) => {
      let data = (a.data.name) - (b.data.name)
      let c : any = new Date(a.data.dateAdded)
      let d : any = new Date(b.data.dateAdded)
      //console.log(data);
      //console.log(c - d);
      
      return d - c
    });
  }
  sortProducts(){
    this.allProducts.sort( (a,b) => {
      //let data = (a.data.name) - (b.data.name)
      let c : any = new Date(a.data.dateAdded)
      let d : any = new Date(b.data.dateAdded)
      //console.log(data);
      //console.log(c - d);
      
      return d - c
    });
    //console.log(this.inventoryLength);
    //console.log(this.currentNumberOfProducts);
    
    if(this.allProducts.length > 0){
      for(let key in this.allProducts){

        if(this.allProducts[key].brand === 'Kwanga'){
          if(this.kwangaGear.length < 3){
            this.kwangaGear.push(this.allProducts[key])
            console.log(this.kwangaGear);
          }
        }else if(this.allProducts[key].brand === 'Dankie Jesu') {
          if(this.allProducts[key].data.isSummer === true){
            this.summerProducts.push(this.allProducts[key])
            if(this.summerGear.length < 6){
              this.summerGear.push(this.allProducts[key])
            }
          } else if (this.allProducts[key].data.isSummer === false) {
            if(this.allProducts[key].category === 'Bags'){

            }else if(this.allProducts[key].category !== 'Bags'){
              console.log(this.allProducts[key].category);
              
              this.winterProducts.push(this.allProducts[key])
              if(this.winterGear.length < 6){
                this.winterGear.push(this.allProducts[key])
              }
            }
          }
        }
      }
    }
    console.log(this.inventoryLength, this.currentNumberOfProducts);
    
    if(this.inventoryLength === Number(this.currentNumberOfProducts)){
      if(this.loadingCtrl){
        for(let i = 0; i < 5000; i++){
          if(i === 4999){
            this.loadingCtrl.dismiss()
          }
        }
      }
    }
  }
  orderItems() {
    // this.summerProducts.sort(( a , b  ) => a.data.dateAdded > b.data.dateAdded ? 1 : 0 )
    // this.winterProducts.sort(( a , b  ) => a.data.dateAdded > b.data.dateAdded ? 1 : 0 )
    // console.log(this.summerProducts);

    // for(let i = 0; i < 5; i++){this.summerGear.push(this.summerProducts[i])}
    // for(let i = 0; i < 5; i++){this.winterGear.push(this.winterProducts[i])}
    // console.log(this.summerGear);
    // console.log(this.winterGear);


  }
  getInventory() {
    console.log(this.allProducts, 'yugfg7g76gyg6gt7677');

  }
  getPendingOrdersSnap() {
    //Running pending orders snap
    return firebase.firestore().collection('Order').onSnapshot(result => {
      let pendingOrder : Array<any> = []
      let pendingOrderModified : object = {}
      let add : boolean
     // console.log(result);
      if(result.docChanges().length > 0){
        for(let key in result.docChanges()){
          let change = result.docChanges()[key]
          // if(change.type === 'added'){
          //   console.log(change);
          //   let refNo = change.doc.id
          //   let data = change.doc.data()
          //   let userID = data.userID
          //   console.log(refNo);
          //   console.log(data);
          //   console.log(userID);
            
          //   //pendingOrder.push({refNo : refNo, details : data, noOfItems: data.product.length})
          //   //this.loadUserName(userID)
          // }
          if(change.type === 'modified' ){
            console.log(change);
  
            let refNo = change.doc.id
            let data = change.doc.data()
            let userID = data.userID
            console.log(userID);
            console.log(data);
            console.log(userID);
            let noOfItems : number = 0
            for(let key in data.product){
              noOfItems = noOfItems + data.product[key].quantity
            }
            console.log(noOfItems);
            
            pendingOrderModified = {refNo : refNo, details : data, noOfItems: noOfItems}
            console.log(pendingOrderModified);
            console.log(this.pendingOrders.length);
            
            // for(let key in this.pendingOrders){
              
            // }
            // if(this.pendingOrders.length  === 0){
              
            //   this.pendingOrders.push(pendingOrderModified)
            //   this.loadUserName(userID)
            //   console.log(this.pendingOrders);
              
            // }
            if(this.pendingOrders.length === 0){
              this.pendingOrders.push(pendingOrderModified)
              this.pendingOrdersLength = this.pendingOrders.length
              this.loadUserName(userID)
              return
            }else if(this.pendingOrders.length > 0){
                add = false
                for(let key in this.pendingOrders){
                  if(this.pendingOrders[key].refNo === pendingOrderModified['refNo']){
                    add = false
                    break
                  }else if(this.pendingOrders[key].refNo !== pendingOrderModified['refNo']){
                    add = true
                    console.log(this.pendingOrders[key], pendingOrderModified);
                    //console.log(pendingOrder[i]);
                  }
                }
                if(add === true){
                  this.pendingOrders.unshift(pendingOrderModified)
                  this.loadUserName(userID)
                  this.pendingOrdersLength = this.pendingOrders.length
                }
            }
          }
          if(change.type === 'removed'){
            console.log(change);
            let pendingOrderRemoved : object = {}
            let refNo = change.doc.id
            let data = change.doc.data()
            let userID = data.userID
            console.log(refNo);
            console.log(data);
            console.log(userID);
            let noOfItems : number = 0
            for(let key in data.product){
              noOfItems = noOfItems + data.product[key].quantity
            }
            pendingOrderRemoved = {refNo : refNo, details : data, noOfItems: noOfItems}
            for(let key in this.pendingOrders){
              if(this.pendingOrders[key].refNo === refNo){
                let index = Number(key)
                this.pendingOrders.splice(index, 1)
              }else if(this.pendingOrders[key].refNo !== refNo){
                //add = true
              }
            }
            let index = this.pendingOrders.indexOf(pendingOrder)
            this.pendingOrdersLength = this.pendingOrders.length
            console.log(index);
          }
        }
  

      }
 

        console.log(this.pendingOrders);
      // }

      return pendingOrder
      })
  }
  
  getPendingOrders() {
    return this.productService.getPendingOrders().then(result => {
      console.log(result);
      //this.pendingOrders = []
      let array = result
      if (result !== null) {


        for(let i in result){
          let noOfItems : number = 0
          for(let key in result[i]['details'].product){
            noOfItems = noOfItems + Number(result[i]['details'].product[key].quantity)
          }
          result[i].noOfItems =noOfItems
        }

        this.pendingOrders = result
        console.log(result);
        this.pendingOrdersLength = this.pendingOrders.length
        for (let key in this.pendingOrders) {
          this.loadUserName(this.pendingOrders[key].details.userID)
        }
        //this.loadingCtrl.dismiss()
      }

    })
  }
  loadUserName(data) {
    return this.productService.loadUser(data).then(result => {
      console.log(result);
      for (let key in this.pendingOrders) {
        if (this.pendingOrders[key].details.userID === result.userID) {
          this.pendingOrders[key].details.name = result.name
          this.pendingOrders[key].details.cell = result.cell
        }
      }
      console.log(this.pendingOrders);
      // if(this.loadingCtrl){
      //   this.loadingCtrl.dismiss()
      // }

    })
  }
  getReadyOrders() {
    return this.productService.getReadyOrders().then(result => {
      this.readyOrders = result
    })
  }
  refreshOrderHistory(){
    return firebase.firestore().collection('orderHistory').onSnapshot(result => {
      let closedOrder : Array<any> = []
      let addHistory : boolean
      let refNo
      let data
      let totalPrice : Number = 0
      let grandTotal : Number = 0
      let numberOfItems : Number = 0;
      if(result.docChanges().length !== 0){
        for(let key in result.docChanges()){
          let change = result.docChanges()[key]
          //console.log(change);
          addHistory = false
          if(change.type === 'added'){
            let productID = change.doc.id
            let docData = change.doc.data()
            refNo = change.doc.id
            data = change.doc.data()
              closedOrder.push({refNo : refNo, details : data})
              if(closedOrder){
  
  
            }
          }
        }
        if(this.history.length === 0){
          for(let i in closedOrder){
            totalPrice = 0
            numberOfItems = 0
            grandTotal = 0
            for(let j in closedOrder[i].details.orders){
              //console.log(closedOrder[i].details);
              totalPrice = +totalPrice + +closedOrder[i].details.orders[j].cost * +closedOrder[i].details.orders[j].quantity
              numberOfItems = +numberOfItems + +closedOrder[i].details.orders[j].quantity
              if(closedOrder[i].details.deliveryType === 'Delivery'){
                grandTotal = Number(totalPrice) + 100
              }else if(closedOrder[i].details.deliveryType === 'Collection'){
                grandTotal = Number(totalPrice)
              }
              //console.log(totalPrice);
              //console.log(numberOfItems);
            }
            closedOrder[i].details.totalPrice = totalPrice
            closedOrder[i].details.numberOfItems = numberOfItems
            closedOrder[i].details.grandTotal = grandTotal
           // console.log(grandTotal);
        ////
  
        this.history.unshift(closedOrder[i])
        this.orderHistoryLength = this.history.length
          }
          //this.history = closedOrder
          return
        }else if(this.history.length > 0){
          for(let i in closedOrder){
            addHistory = false
            for(let key in this.history){
              if(this.history[key].refNo !== closedOrder[i].refNo){
                addHistory = true
              }else if(this.history[key].refNo === closedOrder[i].refNo){
                addHistory = false
                break
              }
            }
            if(addHistory === true){
    
              
              
              totalPrice = 0
              numberOfItems = 0
              grandTotal = 0
              for(let j in closedOrder[i].details.orders){
                //console.log(closedOrder[i].details);
                totalPrice = +totalPrice + +closedOrder[i].details.orders[i].cost * +closedOrder[i].details.orders[i].quantity
                numberOfItems = +numberOfItems + +closedOrder[i].details.orders[i].quantity
                if(closedOrder[i].details.deliveryType === 'Delivery'){
                  grandTotal = Number(totalPrice) + 100
                }else if(closedOrder[i].details.deliveryType === 'Collection'){
                  grandTotal = Number(totalPrice)
                }
                //console.log(totalPrice);
                //console.log(numberOfItems);
              }
              closedOrder[i].details.totalPrice = totalPrice
              closedOrder[i].details.numberOfItems = numberOfItems
              closedOrder[i].details.grandTotal = grandTotal
             // console.log(grandTotal);
          ////
    
          this.history.unshift(closedOrder[i])
          this.orderHistoryLength = this.history.length
          }else if(addHistory === false){
      
          }
    
          }
        }
      }



    })
  }

  // get orders that are closed, history, status == closed
  getOrderHistory(){
    return this.productService.getOrderHistory().then(result => {
      if(result !== null){
        this.history = result
        this.orderHistoryLength = this.history.length
        console.log(this.orderHistoryLength);
        
        let totalPrice : Number = 0
        let numberOfItems : Number = 0;
        let  grandTotal : Number = 0
        //console.log(this.history);
        if(this.history.length !== 0){
         // console.log(this.history);
          
          for(let key in this.history){
            totalPrice = 0
            numberOfItems = 0
            grandTotal = 0
            for(let i in this.history[key].details.orders){
              //console.log(this.history[key].details);
              totalPrice = +totalPrice + +this.history[key].details.orders[i].cost * +this.history[key].details.orders[i].quantity
              numberOfItems = +numberOfItems + +this.history[key].details.orders[i].quantity
              if(this.history[key].details.deliveryType === 'Delivery'){
                grandTotal = Number(totalPrice) + 100
              }else if(this.history[key].details.deliveryType === 'Collection'){
                grandTotal = Number(totalPrice)
              }
            }
            this.history[key].details.totalPrice = totalPrice
            this.history[key].details.numberOfItems = numberOfItems
            this.history[key].details.grandTotal = grandTotal
          }
        }
      }
    })
  }
  viewOrderHistory(item) {
    //console.log(item);
    let parameter: NavigationExtras = { queryParams: { category: item, link: '/landing', refNo: item.refNo, userID: item.details.uid } }
    this.navCtrl.navigateForward(['order-receipt'], parameter);
    this.hideSideMenu()
  }
  closeOrder(docID) {
    return this.productService.closedOrder(docID).then(result => {

    })
  }

  showPendingList() {
    var historyItems = document.getElementsByClassName("pending-items") as HTMLCollectionOf<HTMLElement>;
    historyItems[0].style.display = "block"
    document.getElementById("helpDesk").style.display = "none"
  }
  showHistoryList() {
    var pendingItems = document.getElementsByClassName("history-items") as HTMLCollectionOf<HTMLElement>;
    pendingItems[0].style.display = "block"
    document.getElementById("helpDesk").style.display = "none"
  }
  showInventoryList() {
    var inventoryItems = document.getElementsByClassName("inventory-items") as HTMLCollectionOf<HTMLElement>;
    inventoryItems[0].style.display = "block"
    document.getElementById("helpDesk").style.display = "none"
  }
  dismissList() {
    var historyItems = document.getElementsByClassName("history-items") as HTMLCollectionOf<HTMLElement>;
    historyItems[0].style.display = "none";
    var pendingItems = document.getElementsByClassName("pending-items") as HTMLCollectionOf<HTMLElement>;
    pendingItems[0].style.display = "none";
    var inventoryItems = document.getElementsByClassName("inventory-items") as HTMLCollectionOf<HTMLElement>;
    inventoryItems[0].style.display = "none"
    document.getElementById("helpDesk").style.display = "block"

  }
  subtract(item) {
    //console.log(item.productID);
    for(let key in this.allProducts){
      if(this.allProducts[key].productID === item.productID){
        if(this.allProducts[key].data.quantity !== 0){
          this.allProducts[key].data.quantity = +this.allProducts[key].data.quantity - 1
        }
      }
    }
  }
  add(item) {
    //console.log(item);
    for(let key in this.allProducts){
      if(this.allProducts[key].productID === item.productID){
        if(this.allProducts[key].data.quantity < 10000){
          this.allProducts[key].data.quantity = +this.allProducts[key].data.quantity + 1
        }

      }
    }
  }
  changeSearchPrice(){
    console.log('changing price');
    
    if(Number(this.updatePrice) < 0){
      this.updatePrice = ''
    }else if(Number(this.updatePrice) > 10000){
      this.updatePrice = '10000'
    }
  }
  changeQuantity(event, item){
    console.log(item);
    //console.log(event);
    console.log(event.target.value);
    
    let number: number = event.target.value
    console.log(number)
    for(let key in this.allProducts){
      if(this.allProducts[key].productID === item.productID){
        if(number < 0){
          number = 0
          this.allProducts[key].data.quantity = 1
        }else if(number > 100000){
          number = 100000
          this.allProducts[key].data.quantity = 100000
          event.target.value = 100000
        }else{
          this.allProducts[key].data.quantity = +number
        }
      }
    }
    console.log(number)

  }
  saveQuantity(brand, category, productID, quantity) {
    console.log(brand, category, productID, quantity);
    const toast = document.createElement('ion-toast');
    toast.message = 'Your changes have been saved.';
    toast.duration = 2000;
  
    document.body.appendChild(toast);
    
    if (quantity === '') {
      quantity = 0
    }
    return this.productService.updateQuantity(brand, category, productID, quantity).then(result => {
      console.log(result);
      // alert('Quantity has been saved');
      this.hideSideMenu();
      return toast.present();
    })
  }
  viewPendingOrder(item) {
    //console.log(item);
    let parameter: NavigationExtras = { queryParams: { status: item.details.status, refNo: item.refNo, userID: item.details.userID, user: item.details.name, cell: item.details.cell, currentPage: '/landing' } }
    this.navCtrl.navigateForward(['pending-order'], parameter);
    this.hideSideMenu()
  }
 


  //Search functionality
  searchInput
  search() {
    this.filterItems(this.allProducts)
    // this.searchArray = []
  }
  filterItems(array) {
    let queryFormatted = this.searchInput.toLowerCase();
    // console.log(queryFormatted);
    // console.log(array);
    if(queryFormatted !== '' && queryFormatted !== '*'){
      let nameResult = array.filter(item => item.data.name.toLowerCase().indexOf(queryFormatted) >= 0)
      let brandResult = array.filter(item => item.brand.toLowerCase().indexOf(queryFormatted) >= 0)
      let categoryResult = array.filter(item => item.category.toLowerCase().indexOf(queryFormatted) >= 0)
      console.log(brandResult);
      console.log(categoryResult);
      let returnResult
      let addBrand: boolean
      let addCategory: boolean
      let addName: boolean
      addCategory = false
      addName = false
      returnResult = nameResult
      for(let key in brandResult){
        for(let i in returnResult){
          if(returnResult[i].productID === brandResult[key].productID){
            addBrand = false
            break
          }else if(returnResult[i].productID !== brandResult[key].productID){
            addBrand = true
          }
        }
        if(addBrand === true){
          returnResult.push(brandResult[key])
        }
      }
      for(let key in categoryResult){
        for(let i in returnResult){
          if(returnResult[i].productID === categoryResult[key].productID){
            addCategory = false
            break
          }else if(returnResult[i].productID !== categoryResult[key].productID){
            addCategory = true
          }
        }
        if(addCategory === true){
          returnResult.push(categoryResult[key])
        }
      }
      console.log(nameResult);
      console.log(brandResult);
      console.log(categoryResult);
      
      
      
      console.log(returnResult);
      
      addName = false
      addCategory = false
      addBrand = false
      //// console.log(brandResult);
      //// console.log(categoryResult);
      // console.log(nameResult);
      this.searchArray = nameResult
    }else if(queryFormatted === '*'){
    this.searchArray = this.allProducts
    }
  }

  addUpdatePicture(event){
    this.updateSearchPic =  <File>event.target.files[0]
    this.pictureUpdate
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.updatePic = event.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    console.log(event.target.files[0]);
    this.pictureUpdate = event.target.files[0]
    //this.updatePic = this.updateSearchPic
  }

  //updating items
  checkColorUpdate(event, color){
    let checkbox = event.target['name']
    if(checkbox){
      if(event.target.checked === true){
        this.itemColors.push(color)
        console.log(this.itemColors);
      }else if(event.target.checked === false){
        let index = this.itemColors.indexOf(color)
        this.itemColors.splice(index, 1)
        console.log(this.itemColors);
      }
    }
  }

  checkSizeUpdateCheckboxes(event, size) {
    console.log(size);
    console.log(this.itemSizes);
    let checkbox = event.target['name']
    if (checkbox) {
      if (event.target.checked === true) {
        this.itemSizes.push(size)
        console.log(this.itemSizes);
      } else if (event.target.checked === false) {
        let index = this.itemSizes.indexOf(size)
        console.log(index);
        this.itemSizes.splice(index, 1)
        console.log(this.itemSizes);
      }
    }
    // console.log(event.target.checked);
    // console.log(event.target['name']);
  }

  showLeftSide() {
    // console.log("Showing left side menu");
    document.getElementById("left-items-list").style.left = "0"

  }
  hideSearchItem(){
    
  }
  searchButtonState: string = "search"
  // setTimeout(() => {
    
  // }, timeout);
  showSearchBar() {
    // document.getElementById("mySearchBar").focus();
    
    // console.log("Showing searchbar");
    if (this.miniSearchBarState == true) {
      this.miniSearchBarState = false;
      // console.log(this.miniSearchBarState);
      this.searchButtonState = "search";
      this.searchInput = ''
    }
    else {
      this.miniSearchBarState = true;
      // console.log(this.miniSearchBarState);
      this.searchButtonState = "close"
    }
  }
  adding:boolean = false;
  showRightSide() {
    // console.log("Showing right side menu");
    document.getElementById("right-items-list").style.right = "0"
    this.adding = true
  }

  sideMenuButtons: boolean = true;
  hideSideMenu() {
  setTimeout(() => {
    this.adding = false;
  }, 200);
    this.sideMenuButtons = true;
    document.getElementById("left-items-list").style.left = "-100%"
    document.getElementById("right-items-list").style.right = "-100%"
  }
  listOfItems: number = 0
  showPendingListSmall() {
    this.sideMenuButtons = false;
    this.listOfItems = 1;
  }
  showHistoryListSmall() {
    this.sideMenuButtons = false;
    this.listOfItems = 2;
  }
  showInventoryListSmall() {
    this.sideMenuButtons = false;
    this.listOfItems = 3;
  }
  stepBackToBtns() {
    this.sideMenuButtons = true;
    this.listOfItems = 0;
  }
  //updateName: string;
  item
  //updatePrice
  //updateDescription
  updatePic : File
  //searchName
  //searchPic
  //searchDescription
  //searchPrice
  updateProductID
  updateBrand
  updateCategory
  updateSearchPic : File
  clickedSearchItem: string = "hideItem"
  showHideSearchDetails(item) {
    console.log("closing");
    
    if (this.clickedSearchItem == "hideItem") {
      this.updateName = item.data.name
      this.updatePrice = item.data.price
      this.updateDescription = item.data.description
      this.updatePic = item.data.pictureLink
      this.pictureUpdate
      this.updateSearchPic = item.data.pictureLink
      this.updateBrand = item.brand
      this.updateCategory = item.category
      this.updateProductID = item.productID
      this.itemSizes = item.data.size
      this.itemColors = item.data.color
      this.item = item
      this.searchedProductStatus = item.data.hideItem
      console.log(this.updatePic);
      
      console.log(item);
      this.clickedSearchItem = "showItem"

      this.popCheckboxXS = false ;this.popCheckboxS = false ;this.popCheckboxM = false ;this.popCheckboxL = false ;this.popCheckboxXL = false ;this.popCheckboxXXL = false ;this.popCheckboxXXXL = false ;
      this.checkBlack = false; this.checkBrown = false; this.checkOrange = false; this.checkYellow = false; this.checkWhite = false
      for(let key in this.itemSizes){
        if(this.itemSizes[key] === 'XS'){
          this.popCheckboxXS = true
          this.updateSizes.push('XS')
        }else if(this.itemSizes[key] === 'S'){
          this.popCheckboxS = true
          this.updateSizes.push('S')
        }else if(this.itemSizes[key] === 'M'){
          this.popCheckboxM = true
          this.updateSizes.push('M')
        }else if(this.itemSizes[key] === 'L'){
          this.popCheckboxL = true
          this.updateSizes.push('XL')
        }else if(this.itemSizes[key] === 'XL'){
          this.popCheckboxXL = true
          this.updateSizes.push('XXL')
        }else if(this.itemSizes[key] === 'XXL'){
          this.popCheckboxXXL = true
          this.updateSizes.push('XXL')
        }else if(this.itemSizes[key] === 'XXXL'){
          this.popCheckboxXXXL = true
          this.updateSizes.push('XXXL')
        }
      }
      for(let key in this.itemColors){
        if(this.itemColors[key] === 'Black'){
          this.checkBlack = true
          this.updateSizes.push('XS')
        }else if(this.itemColors[key] === 'Brown'){
          this.checkBrown = true
          this.updateSizes.push('S')
        }else if(this.itemColors[key] === 'Orange'){
          this.checkOrange = true
          this.updateSizes.push('M')
        }else if(this.itemColors[key] === 'Yellow'){
          this.checkYellow = true
          this.updateSizes.push('XL')
        }else if(this.itemColors[key] === 'White'){
          this.checkWhite = true
          this.updateSizes.push('XXL')
        }
      }
      setTimeout(() => {
        this.searchInput = ''
      }, 100);
    }
    else {
      this.clickedSearchItem = "hideItem"
    }
  }

  addPictureUpdate(event){
    this.pictureUpdate = <File>event.target.files[0]
  }

  updateItem() {
    this.presentLoading()
    console.log(this.updateProductID, this.updateBrand, this.updateCategory, this.updatePrice, this.updateDescription, this.updateName, this.itemSizes, this.pictureUpdate, this.itemColors);
    //console.log(this.updateName);
    let sort : Array<string> = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    let tempColor = this.itemSizes
    this.itemSizes = []
    for(let color in sort){
      for(let i in tempColor){
        if(sort[color] === tempColor[i]){
          this.itemSizes.push(sort[color])
        }
      }
    }
    this.cutDoubleSpace(this.updateName).then(result => {
      this.updateName = result
    }).then( result => {
      this.cutDoubleSpace(this.updateDescription).then(result => {
        this.updateDescription = result
      }).then( () => {
        return this.productService.updateItemsListItem(this.updateProductID, this.updateBrand, this.updateCategory, this.updatePrice, this.updateDescription, this.updateName, this.itemSizes, this.pictureUpdate, this.itemColors).then(result => {
          console.log(result);
            setTimeout(() => {
              //this.reloadPage()
            }, 30);
          if (result === 'success') {
            console.log(result);
            this.showHideSearchDetails('close')
            this.loadingCtrl.dismiss()
            //return this.dismissPromo()
          }
        })
      })
    })


  }

  // goToHelpDesk(){
    
  // }
  async productAlert(message) {
    const alert = await this.alertController.create({
      header: 'Success!',
      message: message,
      buttons: [
        {
          text: 'Okay',
          handler: (okay) => {
            console.log('User clicked "okay"');

          }
        }
      ]
    });

    await alert.present();
  }
  async deleteItem(productID, brand, category, item) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('User clicked "cancel"');
          }
        }, {
          text: 'Delete',
          handler: (okay) => {
            console.log('User clicked "okay"');
            return this.deleteItemConfirmed(productID, brand, category, item)
          }
        }
      ]
    });

    await alert.present();
  }
  deleteItemConfirmed(productID, brand, category, item) {
    this.presentLoading()
    return this.productService.deleteItemFromInventory(productID, brand, category, item).then(result => {
      console.log(result);
      if(result = 'Deleted'){
        this.loadTotalNumberOfProducts()
        this.loadingCtrl.dismiss()
        this.productAlert('Product was successfully deleted')
        this.showHideSearchDetails('close')
        for(let key in this.allProducts){
          if(productID === this.allProducts[key].productID){

          }
        }

      }
      //location.reload()
    })
  }

  hideItem(productID, brand, category, item) {
    return this.productService.hideProduct(productID, brand, category, item).then(result => {
      console.log(result);
    }).then(result => {
      this.getHideStatus(productID, brand, category)
    })
  }
  showItem(productID, brand, category, item) {
    return this.productService.showProduct(productID, brand, category, item).then(result => {
      console.log(result);
    }).then(result => {
      this.getHideStatus(productID, brand, category)
    })
  }
  getHideStatus(productID, brand, category){
    firebase.firestore().collection('Products').doc(brand).collection(category).doc(productID).onSnapshot(result => {
      let product = result.data()
      let status : Boolean = result.data().hideItem
      console.log(status);
      //this.item
      console.log(this.item.data.hideItem);
      console.log(this.item);
      
      this.item.data['hideItem'] = status
      //console.log(this.item.data = { hideItem : status});
      
      this.searchedProductStatus = status
    })
  }
  reloadPage(){
    window.location.reload()
  }


  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await loading.present();

    // const { role, data } = await loading.onDidDismiss();

    // console.log('Loading dismissed!');
  }

  ionViewWillEnter(){
    console.log('ion view did enter');
    
  }

  ionViewDidEnter(){
    console.log('ion view will enter');
    // for(let key in this.allProducts){
    //   this.allProducts.splice(Number(key), (this.allProducts.length - 1))
    // }
    console.log(this.allProducts.length);
    
    if(this.allProducts.length === 0){
      this.presentLoader()
      //this.loadDankieJesuItems()
      //this.loadKwangaItems()
      this.inventoryLength = 0

      this.load16CategoryItems()
    }
    console.log('Oninit did run');

    this.nativeCategory.nativeElement.disabled = true
    this.refreshOrderHistory()
    this.getPendingOrdersSnap()
  }
  ionViewWillLeave(){
    console.log('ion view will leave')
  }

  ionViewDidLeave(){
    console.log('ion view did leave');
    //this.allProducts = []
    //this.inventoryLength = 0
  }

  ionViewWillLoad(){
    console.log('ion view will load');
    
  }
  ionViewDidLoad(){
    console.log('ion view did load');
    
  }
  
  goToHelpDesk(){
    
    this.route.navigate(['/home', 'FAQs'])
  }
  sortArray(array){
    return new Promise((resolve, reject) => {
      let sort : Array<string> = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
      let tempColor = array
      array = []
      for(let color in sort){
        for(let i in tempColor){
          if(sort[color] === tempColor[i]){
            array.push(sort[color])
          }
        }
      }
      console.log(array);
      resolve(array)
    
    })
    return array

  }

  modifyLocalObjectsVests(result, brand, category){
    let items : Array<any> = []
    let data : object = {}
    let productID = ''
    let docData
    let addItems : boolean
    for(let key in result.docChanges()){
      let change = result.docChanges()[key]
      if(change.type === 'added'){
        data = {}
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        // items.push(data)
      }else if(change.type === 'removed'){
        productID = change.doc.id
        for(let key in this.allProducts){
          if(productID === this.allProducts[key].productID){
            let index = Number(key)
            this.allProducts.splice(index, 1)
            this.inventoryLength = this.allProducts.length
          }
        }
        if(brand === 'Dankie Jesu'){
          if(change.doc.data().isSummer === true){
            for(let key in this.summerGear){
              if(productID === this.summerGear[key].productID){
                let index = Number(key)
                this.summerGear.splice(index, 1)

              }
            }
          }else if(change.doc.data().isSummer === false){
            for(let key in this.winterGear){
              if(productID === this.winterGear[key].productID){
                let index = Number(key)
                this.winterGear.splice(index, 1)
              }
            }
          }
        }else if(brand === 'Kwanga'){
          for(let key in this.kwangaGear){
            if(productID === this.kwangaGear[key].productID){
              let index = Number(key)
              this.kwangaGear.splice(index, 1)
            }
          }
        }
        if(this.kwangaGear.length > 0){
          this.sortKwangaProducts()
        }
        if(this.summerGear.length > 0){
          this.sortSummerProducts()
        }
        if(this.winterGear.length > 0){
          this.sortWinterProducts()
        }


      }else if(change.type === 'modified'){
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        items.push(data)
        for(let key in this.allProducts){
          if(this.allProducts[key].productID === productID){
            this.allProducts[key].data = docData
          }
        }
        if(this.allProducts.length === 0){
          console.log('These are all the products : ' + this.allProducts);
          
          this.allProducts = items
          this.inventoryLength = this.allProducts.length
                if(brand === 'Dankie Jesu'){
            if(items[0].data.isSummer === true){
              this.summerGear.unshift(data)
            }else if(items[0].data.isSummer === false){
              this.winterGear.unshift(data)
            }
          }else if(brand === 'Kwanga'){
            this.kwangaGear.unshift(data)
          }
        }else if(this.allProducts.length > 0){
          for(let i in items){
            addItems = false
            for(let key in this.allProducts){
              if(this.allProducts[key].productID !== items[i].productID){
                addItems = true
              }else if(this.allProducts[key].productID === items[i].productID){
                addItems = false
                let logo : Array<any> = []
                logo.push(addItems);
                console.log(logo);
                
                break
              }
            }
            if(addItems === true){
              this.allProducts.unshift(data)
              this.inventoryLength = this.allProducts.length
              if(brand === 'Dankie Jesu'){
                if(this.summer === true){
                  this.summerGear.unshift(data)
                  if(this.summerGear.length > 6){
                    this.summerGear.splice(this.summerGear.length - 1, 1)
                  }
    
                }else if(this.summer === false){
                  this.winterGear.unshift(data)
                  if(this.winterGear.length > 6){
                    this.winterGear.splice(this.winterGear.length - 1, 1)
                  }
                }
              }else if(brand === 'Kwanga'){
                this.kwangaGear.unshift(data)
                if(this.kwangaGear.length > 3){
                  this.kwangaGear.splice(this.kwangaGear.length - 1, 1)
                }
              }
            }
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts.push(items[1])
    //   return
    // }


    // if(this.allProducts.length === 0){
    //   this.allProducts = items
    // }

    let addToWinter : boolean
    let addToSummer : boolean
    let addToKwanga : boolean

///////////////////////////////////////////////////////////////////
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.summerGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === true){
          if(this.allProducts[i].productID !== this.summerGear[j].productID){
            addToSummer = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.summerGear[j].productID){
            addToSummer = false
            //console.log(this.allProducts[i].productID);
            return
          }
          }
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToWinter = false
      for(let j in this.winterGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === false){
          if(this.allProducts[i].productID !== this.winterGear[j].productID){
            addToWinter = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.winterGear[j].productID){
            addToWinter = false
            break
          }

          }
        }
      }
      if(addToWinter === true){
        if(this.winterGear.length < 6){
          this.winterGear.push(this.allProducts[i])
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.kwangaGear){
      if(this.allProducts[i].brand === 'Kwanga'){
          if(this.allProducts[i].productID !== this.kwangaGear[j].productID){
            addToKwanga = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.kwangaGear[j].productID){
            addToKwanga = false
            //console.log(this.allProducts[i].productID);
            break
          }
        }
      }
      if(addToKwanga === true){
        if(this.kwangaGear.length < 3){
          this.kwangaGear.push(this.allProducts[i])
        }
      }
    }
    if(this.kwangaGear.length > 0 ){
      this.sortKwangaProducts()
    }
    if(this.summerGear.length > 0){
      this.sortSummerProducts()
    }
    if(this.winterGear.length > 0){
      this.sortWinterProducts()
    }



  }
  modifyLocalObjectsBucketHats(result, brand, category){
    let items : Array<any> = []
    let data : object = {}
    let productID = ''
    let docData
    let addItems : boolean
    for(let key in result.docChanges()){
      let change = result.docChanges()[key]
      if(change.type === 'added'){
        data = {}
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        // items.push(data)
      }else if(change.type === 'removed'){
        productID = change.doc.id
        for(let key in this.allProducts){
          if(productID === this.allProducts[key].productID){
            let index = Number(key)
            this.allProducts.splice(index, 1)
            this.inventoryLength = this.allProducts.length
          }
        }
        if(brand === 'Dankie Jesu'){
          if(change.doc.data().isSummer === true){
            for(let key in this.summerGear){
              if(productID === this.summerGear[key].productID){
                let index = Number(key)
                this.summerGear.splice(index, 1)

              }
            }
          }else if(change.doc.data().isSummer === false){
            for(let key in this.winterGear){
              if(productID === this.winterGear[key].productID){
                let index = Number(key)
                this.winterGear.splice(index, 1)
              }
            }
          }
        }else if(brand === 'Kwanga'){
          for(let key in this.kwangaGear){
            if(productID === this.kwangaGear[key].productID){
              let index = Number(key)
              this.kwangaGear.splice(index, 1)
            }
          }
        }
        this.sortKwangaProducts()
        this.sortSummerProducts()
        this.sortWinterProducts()
      }else if(change.type === 'modified'){
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        items.push(data)
        for(let key in this.allProducts){
          if(this.allProducts[key].productID === productID){
            this.allProducts[key].data = docData
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts.push(items[1])
    //   return
    // }
    if(this.allProducts.length === 0){
      this.allProducts = items
      this.inventoryLength = this.allProducts.length
      if(brand === 'Dankie Jesu'){
        if(this.summer === true){
          this.summerGear.unshift(data)
        }else if(this.summer === false){
          this.winterGear.unshift(data)
        }
      }else if(brand === 'Kwanga'){
        this.kwangaGear.unshift(data)
      }
    }else if(this.allProducts.length > 0){
      for(let i in items){
        addItems = false
        for(let key in this.allProducts){
          if(this.allProducts[key].productID !== items[i].productID){
            addItems = true
          }else if(this.allProducts[key].productID === items[i].productID){
            addItems = false
            let logo : Array<any> = []
            logo.push(addItems);
            console.log(logo);
            
            break
          }
        }
        if(addItems === true){
          this.allProducts.unshift(data)
          this.inventoryLength = this.allProducts.length
          if(brand === 'Dankie Jesu'){
            if(this.summer === true){
              this.summerGear.unshift(data)
              if(this.summerGear.length > 6){
                this.summerGear.splice(this.summerGear.length - 1, 1)
              }

            }else if(this.summer === false){
              this.winterGear.unshift(data)
              if(this.winterGear.length > 6){
                this.winterGear.splice(this.winterGear.length - 1, 1)
              }
            }
          }else if(brand === 'Kwanga'){
            this.kwangaGear.unshift(data)
            if(this.kwangaGear.length > 3){
              this.kwangaGear.splice(this.kwangaGear.length - 1, 1)
            }
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts = items
    // }

    let addToWinter : boolean
    let addToSummer : boolean
    let addToKwanga : boolean

///////////////////////////////////////////////////////////////////
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.summerGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === true){
          if(this.allProducts[i].productID !== this.summerGear[j].productID){
            addToSummer = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.summerGear[j].productID){
            addToSummer = false
            //console.log(this.allProducts[i].productID);
            return
          }
          }
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToWinter = false
      for(let j in this.winterGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === false){
          if(this.allProducts[i].productID !== this.winterGear[j].productID){
            addToWinter = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.winterGear[j].productID){
            addToWinter = false
            break
          }

          }
        }
      }
      if(addToWinter === true){
        if(this.winterGear.length < 6){
          this.winterGear.push(this.allProducts[i])
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.kwangaGear){
      if(this.allProducts[i].brand === 'Kwanga'){
          if(this.allProducts[i].productID !== this.kwangaGear[j].productID){
            addToKwanga = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.kwangaGear[j].productID){
            addToKwanga = false
            //console.log(this.allProducts[i].productID);
            break
          }
        }
      }
      if(addToKwanga === true){
        if(this.kwangaGear.length < 3){
          this.kwangaGear.push(this.allProducts[i])
        }
      }
    }
    this.sortKwangaProducts()
    this.sortSummerProducts()
    this.sortWinterProducts()
  }
  modifyLocalObjectsShorts(result, brand, category){
    let items : Array<any> = []
    let data : object = {}
    let productID = ''
    let docData
    let addItems : boolean
    for(let key in result.docChanges()){
      let change = result.docChanges()[key]
      if(change.type === 'added'){
        data = {}
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        // items.push(data)
      }else if(change.type === 'removed'){
        productID = change.doc.id
        for(let key in this.allProducts){
          if(productID === this.allProducts[key].productID){
            let index = Number(key)
            this.allProducts.splice(index, 1)
            this.inventoryLength = this.allProducts.length
          }
        }
        if(brand === 'Dankie Jesu'){
          if(change.doc.data().isSummer === true){
            for(let key in this.summerGear){
              if(productID === this.summerGear[key].productID){
                let index = Number(key)
                this.summerGear.splice(index, 1)

              }
            }
          }else if(change.doc.data().isSummer === false){
            for(let key in this.winterGear){
              if(productID === this.winterGear[key].productID){
                let index = Number(key)
                this.winterGear.splice(index, 1)
              }
            }
          }
        }else if(brand === 'Kwanga'){
          for(let key in this.kwangaGear){
            if(productID === this.kwangaGear[key].productID){
              let index = Number(key)
              this.kwangaGear.splice(index, 1)
            }
          }
        }
        this.sortKwangaProducts()
        this.sortSummerProducts()
        this.sortWinterProducts()
      }else if(change.type === 'modified'){
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        items.push(data)
        for(let key in this.allProducts){
          if(this.allProducts[key].productID === productID){
            this.allProducts[key].data = docData
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts.push(items[1])
    //   return
    // }
    if(this.allProducts.length === 0){
      this.allProducts = items
      this.inventoryLength = this.allProducts.length
            if(brand === 'Dankie Jesu'){
        if(this.summer === true){
          this.summerGear.unshift(data)
        }else if(this.summer === false){
          this.winterGear.unshift(data)
        }
      }else if(brand === 'Kwanga'){
        this.kwangaGear.unshift(data)
      }
    }else if(this.allProducts.length > 0){
      for(let i in items){
        addItems = false
        for(let key in this.allProducts){
          if(this.allProducts[key].productID !== items[i].productID){
            addItems = true
          }else if(this.allProducts[key].productID === items[i].productID){
            addItems = false
            let logo : Array<any> = []
            logo.push(addItems);
            console.log(logo);
            
            break
          }
        }
        if(addItems === true){
          this.allProducts.unshift(data)
          this.inventoryLength = this.allProducts.length
          if(brand === 'Dankie Jesu'){
            if(this.summer === true){
              this.summerGear.unshift(data)
              if(this.summerGear.length > 6){
                this.summerGear.splice(this.summerGear.length - 1, 1)
              }

            }else if(this.summer === false){
              this.winterGear.unshift(data)
              if(this.winterGear.length > 6){
                this.winterGear.splice(this.winterGear.length - 1, 1)
              }
            }
          }else if(brand === 'Kwanga'){
            this.kwangaGear.unshift(data)
            if(this.kwangaGear.length > 3){
              this.kwangaGear.splice(this.kwangaGear.length - 1, 1)
            }
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts = items
    // }

    let addToWinter : boolean
    let addToSummer : boolean
    let addToKwanga : boolean

///////////////////////////////////////////////////////////////////
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.summerGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === true){
          if(this.allProducts[i].productID !== this.summerGear[j].productID){
            addToSummer = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.summerGear[j].productID){
            addToSummer = false
            //console.log(this.allProducts[i].productID);
            return
          }
          }
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToWinter = false
      for(let j in this.winterGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === false){
          if(this.allProducts[i].productID !== this.winterGear[j].productID){
            addToWinter = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.winterGear[j].productID){
            addToWinter = false
            break
          }

          }
        }
      }
      if(addToWinter === true){
        if(this.winterGear.length < 6){
          this.winterGear.push(this.allProducts[i])
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.kwangaGear){
      if(this.allProducts[i].brand === 'Kwanga'){
          if(this.allProducts[i].productID !== this.kwangaGear[j].productID){
            addToKwanga = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.kwangaGear[j].productID){
            addToKwanga = false
            //console.log(this.allProducts[i].productID);
            break
          }
        }
      }
      if(addToKwanga === true){
        if(this.kwangaGear.length < 3){
          this.kwangaGear.push(this.allProducts[i])
        }
      }
    }
    this.sortKwangaProducts()
    this.sortSummerProducts()
    this.sortWinterProducts()
  }
  modifyLocalObjectsCropTops(result, brand, category){
    let items : Array<any> = []
    let data : object = {}
    let productID = ''
    let docData
    let addItems : boolean
    for(let key in result.docChanges()){
      let change = result.docChanges()[key]
      if(change.type === 'added'){
        data = {}
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        // items.push(data)
      }else if(change.type === 'removed'){
        productID = change.doc.id
        for(let key in this.allProducts){
          if(productID === this.allProducts[key].productID){
            let index = Number(key)
            this.allProducts.splice(index, 1)
            this.inventoryLength = this.allProducts.length
          }
        }
        if(brand === 'Dankie Jesu'){
          if(change.doc.data().isSummer === true){
            for(let key in this.summerGear){
              if(productID === this.summerGear[key].productID){
                let index = Number(key)
                this.summerGear.splice(index, 1)

              }
            }
          }else if(change.doc.data().isSummer === false){
            for(let key in this.winterGear){
              if(productID === this.winterGear[key].productID){
                let index = Number(key)
                this.winterGear.splice(index, 1)
              }
            }
          }
        }else if(brand === 'Kwanga'){
          for(let key in this.kwangaGear){
            if(productID === this.kwangaGear[key].productID){
              let index = Number(key)
              this.kwangaGear.splice(index, 1)
            }
          }
        }
        this.sortKwangaProducts()
        this.sortSummerProducts()
        this.sortWinterProducts()
      }else if(change.type === 'modified'){
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        items.push(data)
        for(let key in this.allProducts){
          if(this.allProducts[key].productID === productID){
            this.allProducts[key].data = docData
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts.push(items[1])
    //   return
    // }
    if(this.allProducts.length === 0){
      this.allProducts = items
      this.inventoryLength = this.allProducts.length
            if(brand === 'Dankie Jesu'){
        if(this.summer === true){
          this.summerGear.unshift(data)
        }else if(this.summer === false){
          this.winterGear.unshift(data)
        }
      }else if(brand === 'Kwanga'){
        this.kwangaGear.unshift(data)
      }
    }else if(this.allProducts.length > 0){
      for(let i in items){
        addItems = false
        for(let key in this.allProducts){
          if(this.allProducts[key].productID !== items[i].productID){
            addItems = true
          }else if(this.allProducts[key].productID === items[i].productID){
            addItems = false
            let logo : Array<any> = []
            logo.push(addItems);
            console.log(logo);
            
            break
          }
        }
        if(addItems === true){
          this.allProducts.unshift(data)
          this.inventoryLength = this.allProducts.length
          if(brand === 'Dankie Jesu'){
            if(this.summer === true){
              this.summerGear.unshift(data)
              if(this.summerGear.length > 6){
                this.summerGear.splice(this.summerGear.length - 1, 1)
              }

            }else if(this.summer === false){
              this.winterGear.unshift(data)
              if(this.winterGear.length > 6){
                this.winterGear.splice(this.winterGear.length - 1, 1)
              }
            }
          }else if(brand === 'Kwanga'){
            this.kwangaGear.unshift(data)
            if(this.kwangaGear.length > 3){
              this.kwangaGear.splice(this.kwangaGear.length - 1, 1)
            }
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts = items
    // }

    let addToWinter : boolean
    let addToSummer : boolean
    let addToKwanga : boolean

///////////////////////////////////////////////////////////////////
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.summerGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === true){
          if(this.allProducts[i].productID !== this.summerGear[j].productID){
            addToSummer = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.summerGear[j].productID){
            addToSummer = false
            //console.log(this.allProducts[i].productID);
            return
          }
          }
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToWinter = false
      for(let j in this.winterGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === false){
          if(this.allProducts[i].productID !== this.winterGear[j].productID){
            addToWinter = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.winterGear[j].productID){
            addToWinter = false
            break
          }

          }
        }
      }
      if(addToWinter === true){
        if(this.winterGear.length < 6){
          this.winterGear.push(this.allProducts[i])
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.kwangaGear){
      if(this.allProducts[i].brand === 'Kwanga'){
          if(this.allProducts[i].productID !== this.kwangaGear[j].productID){
            addToKwanga = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.kwangaGear[j].productID){
            addToKwanga = false
            //console.log(this.allProducts[i].productID);
            break
          }
        }
      }
      if(addToKwanga === true){
        if(this.kwangaGear.length < 3){
          this.kwangaGear.push(this.allProducts[i])
        }
      }
    }
    this.sortKwangaProducts()
    this.sortSummerProducts()
    this.sortWinterProducts()
  }
  modifyLocalObjectsTShirts(result, brand, category){
    let items : Array<any> = []
    let data : object = {}
    let productID = ''
    let docData
    let addItems : boolean
    for(let key in result.docChanges()){
      let change = result.docChanges()[key]
      if(change.type === 'added'){
        data = {}
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        // items.push(data)
      }else if(change.type === 'removed'){
        productID = change.doc.id
        for(let key in this.allProducts){
          if(productID === this.allProducts[key].productID){
            let index = Number(key)
            this.allProducts.splice(index, 1)
            this.inventoryLength = this.allProducts.length
          }
        }
        if(brand === 'Dankie Jesu'){
          if(change.doc.data().isSummer === true){
            for(let key in this.summerGear){
              if(productID === this.summerGear[key].productID){
                let index = Number(key)
                this.summerGear.splice(index, 1)

              }
            }
          }else if(change.doc.data().isSummer === false){
            for(let key in this.winterGear){
              if(productID === this.winterGear[key].productID){
                let index = Number(key)
                this.winterGear.splice(index, 1)
              }
            }
          }
        }else if(brand === 'Kwanga'){
          for(let key in this.kwangaGear){
            if(productID === this.kwangaGear[key].productID){
              let index = Number(key)
              this.kwangaGear.splice(index, 1)
            }
          }
        }
        this.sortKwangaProducts()
        this.sortSummerProducts()
        this.sortWinterProducts()
      }else if(change.type === 'modified'){
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        items.push(data)
        for(let key in this.allProducts){
          if(this.allProducts[key].productID === productID){
            this.allProducts[key].data = docData
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts.push(items[1])
    //   return
    // }
    if(this.allProducts.length === 0){
      this.allProducts = items
      this.inventoryLength = this.allProducts.length
            if(brand === 'Dankie Jesu'){
        if(this.summer === true){
          this.summerGear.unshift(data)
        }else if(this.summer === false){
          this.winterGear.unshift(data)
        }
      }else if(brand === 'Kwanga'){
        this.kwangaGear.unshift(data)
      }
    }else if(this.allProducts.length > 0){
      for(let i in items){
        addItems = false
        for(let key in this.allProducts){
          if(this.allProducts[key].productID !== items[i].productID){
            addItems = true
          }else if(this.allProducts[key].productID === items[i].productID){
            addItems = false
            let logo : Array<any> = []
            logo.push(addItems);
            console.log(logo);
            
            break
          }
        }
        if(addItems === true){
          this.allProducts.unshift(data)
          this.inventoryLength = this.allProducts.length
          if(brand === 'Dankie Jesu'){
            if(this.summer === true){
              this.summerGear.unshift(data)
              if(this.summerGear.length > 6){
                this.summerGear.splice(this.summerGear.length - 1, 1)
              }

            }else if(this.summer === false){
              this.winterGear.unshift(data)
              if(this.winterGear.length > 6){
                this.winterGear.splice(this.winterGear.length - 1, 1)
              }
            }
          }else if(brand === 'Kwanga'){
            this.kwangaGear.unshift(data)
            if(this.kwangaGear.length > 3){
              this.kwangaGear.splice(this.kwangaGear.length - 1, 1)
            }
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts = items
    // }

    let addToWinter : boolean
    let addToSummer : boolean
    let addToKwanga : boolean

///////////////////////////////////////////////////////////////////
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.summerGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === true){
          if(this.allProducts[i].productID !== this.summerGear[j].productID){
            addToSummer = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.summerGear[j].productID){
            addToSummer = false
            //console.log(this.allProducts[i].productID);
            return
          }
          }
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToWinter = false
      for(let j in this.winterGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === false){
          if(this.allProducts[i].productID !== this.winterGear[j].productID){
            addToWinter = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.winterGear[j].productID){
            addToWinter = false
            break
          }

          }
        }
      }
      if(addToWinter === true){
        if(this.winterGear.length < 6){
          this.winterGear.push(this.allProducts[i])
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.kwangaGear){
      if(this.allProducts[i].brand === 'Kwanga'){
          if(this.allProducts[i].productID !== this.kwangaGear[j].productID){
            addToKwanga = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.kwangaGear[j].productID){
            addToKwanga = false
            //console.log(this.allProducts[i].productID);
            break
          }
        }
      }
      if(addToKwanga === true){
        if(this.kwangaGear.length < 3){
          this.kwangaGear.push(this.allProducts[i])
        }
      }
    }
    this.sortKwangaProducts()
    this.sortSummerProducts()
    this.sortWinterProducts()
  }
  modifyLocalObjectsBags(result, brand, category){
    let items : Array<any> = []
    let data : object = {}
    let productID = ''
    let docData
    let addItems : boolean
    for(let key in result.docChanges()){
      let change = result.docChanges()[key]
      if(change.type === 'added'){
        data = {}
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        // items.push(data)
      }else if(change.type === 'removed'){
        productID = change.doc.id
        for(let key in this.allProducts){
          if(productID === this.allProducts[key].productID){
            let index = Number(key)
            this.allProducts.splice(index, 1)
            this.inventoryLength = this.allProducts.length
          }
        }
        if(brand === 'Dankie Jesu'){
          if(change.doc.data().isSummer === true){
            for(let key in this.summerGear){
              if(productID === this.summerGear[key].productID){
                let index = Number(key)
                this.summerGear.splice(index, 1)

              }
            }
          }else if(change.doc.data().isSummer === false){
            for(let key in this.winterGear){
              if(productID === this.winterGear[key].productID){
                let index = Number(key)
                this.winterGear.splice(index, 1)
              }
            }
          }
        }else if(brand === 'Kwanga'){
          for(let key in this.kwangaGear){
            if(productID === this.kwangaGear[key].productID){
              let index = Number(key)
              this.kwangaGear.splice(index, 1)
            }
          }
        }
        this.sortKwangaProducts()
        this.sortSummerProducts()
        this.sortWinterProducts()
      }else if(change.type === 'modified'){
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        items.push(data)
        for(let key in this.allProducts){
          if(this.allProducts[key].productID === productID){
            this.allProducts[key].data = docData
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts.push(items[1])
    //   return
    // }
    if(this.allProducts.length === 0){
      this.allProducts = items
      this.inventoryLength = this.allProducts.length
            if(brand === 'Dankie Jesu'){
        if(this.summer === true){
          this.summerGear.unshift(data)
        }else if(this.summer === false){
          this.winterGear.unshift(data)
        }
      }else if(brand === 'Kwanga'){
        this.kwangaGear.unshift(data)
      }
    }else if(this.allProducts.length > 0){
      for(let i in items){
        addItems = false
        for(let key in this.allProducts){
          if(this.allProducts[key].productID !== items[i].productID){
            addItems = true
          }else if(this.allProducts[key].productID === items[i].productID){
            addItems = false
            let logo : Array<any> = []
            logo.push(addItems);
            console.log(logo);
            
            break
          }
        }
        if(addItems === true){
          this.allProducts.unshift(data)
          this.inventoryLength = this.allProducts.length
          if(brand === 'Dankie Jesu'){
            if(this.summer === true){
              this.summerGear.unshift(data)
              if(this.summerGear.length > 6){
                this.summerGear.splice(this.summerGear.length - 1, 1)
              }

            }else if(this.summer === false){
              this.winterGear.unshift(data)
              if(this.winterGear.length > 6){
                this.winterGear.splice(this.winterGear.length - 1, 1)
              }
            }
          }else if(brand === 'Kwanga'){
            this.kwangaGear.unshift(data)
            if(this.kwangaGear.length > 3){
              this.kwangaGear.splice(this.kwangaGear.length - 1, 1)
            }
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts = items
    // }

    let addToWinter : boolean
    let addToSummer : boolean
    let addToKwanga : boolean

///////////////////////////////////////////////////////////////////
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.summerGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === true){
          if(this.allProducts[i].productID !== this.summerGear[j].productID){
            addToSummer = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.summerGear[j].productID){
            addToSummer = false
            //console.log(this.allProducts[i].productID);
            return
          }
          }
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToWinter = false
      for(let j in this.winterGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === false){
          if(this.allProducts[i].productID !== this.winterGear[j].productID){
            addToWinter = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.winterGear[j].productID){
            addToWinter = false
            break
          }

          }
        }
      }
      if(addToWinter === true){
        if(this.winterGear.length < 6){
          this.winterGear.push(this.allProducts[i])
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.kwangaGear){
      if(this.allProducts[i].brand === 'Kwanga'){
          if(this.allProducts[i].productID !== this.kwangaGear[j].productID){
            addToKwanga = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.kwangaGear[j].productID){
            addToKwanga = false
            //console.log(this.allProducts[i].productID);
            break
          }
        }
      }
      if(addToKwanga === true){
        if(this.kwangaGear.length < 3){
          this.kwangaGear.push(this.allProducts[i])
        }
      }
    }
    this.sortKwangaProducts()
    this.sortSummerProducts()
    this.sortWinterProducts()
  }
  modifyLocalObjectsSweaters(result, brand, category){
    let items : Array<any> = []
    let data : object = {}
    let productID = ''
    let docData
    let addItems : boolean
    for(let key in result.docChanges()){
      let change = result.docChanges()[key]
      if(change.type === 'added'){
        data = {}
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        // items.push(data)
      }else if(change.type === 'removed'){
        productID = change.doc.id
        for(let key in this.allProducts){
          if(productID === this.allProducts[key].productID){
            let index = Number(key)
            this.allProducts.splice(index, 1)
            this.inventoryLength = this.allProducts.length
          }
        }
        if(brand === 'Dankie Jesu'){
          if(change.doc.data().isSummer === true){
            for(let key in this.summerGear){
              if(productID === this.summerGear[key].productID){
                let index = Number(key)
                this.summerGear.splice(index, 1)

              }
            }
          }else if(change.doc.data().isSummer === false){
            for(let key in this.winterGear){
              if(productID === this.winterGear[key].productID){
                let index = Number(key)
                this.winterGear.splice(index, 1)
              }
            }
          }
        }else if(brand === 'Kwanga'){
          for(let key in this.kwangaGear){
            if(productID === this.kwangaGear[key].productID){
              let index = Number(key)
              this.kwangaGear.splice(index, 1)
            }
          }
        }
        this.sortKwangaProducts()
        this.sortSummerProducts()
        this.sortWinterProducts()
      }else if(change.type === 'modified'){
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        items.push(data)
        for(let key in this.allProducts){
          if(this.allProducts[key].productID === productID){
            this.allProducts[key].data = docData
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts.push(items[1])
    //   return
    // }
    if(this.allProducts.length === 0){
      this.allProducts = items
      this.inventoryLength = this.allProducts.length
            if(brand === 'Dankie Jesu'){
        if(this.summer === true){
          this.summerGear.unshift(data)
        }else if(this.summer === false){
          this.winterGear.unshift(data)
        }
      }else if(brand === 'Kwanga'){
        this.kwangaGear.unshift(data)
      }
    }else if(this.allProducts.length > 0){
      for(let i in items){
        addItems = false
        for(let key in this.allProducts){
          if(this.allProducts[key].productID !== items[i].productID){
            addItems = true
          }else if(this.allProducts[key].productID === items[i].productID){
            addItems = false
            let logo : Array<any> = []
            logo.push(addItems);
            console.log(logo);
            
            break
          }
        }
        if(addItems === true){
          this.allProducts.unshift(data)
          this.inventoryLength = this.allProducts.length
          if(brand === 'Dankie Jesu'){
            if(this.summer === true){
              this.summerGear.unshift(data)
              if(this.summerGear.length > 6){
                this.summerGear.splice(this.summerGear.length - 1, 1)
              }

            }else if(this.summer === false){
              this.winterGear.unshift(data)
              if(this.winterGear.length > 6){
                this.winterGear.splice(this.winterGear.length - 1, 1)
              }
            }
          }else if(brand === 'Kwanga'){
            this.kwangaGear.unshift(data)
            if(this.kwangaGear.length > 3){
              this.kwangaGear.splice(this.kwangaGear.length - 1, 1)
            }
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts = items
    // }

    let addToWinter : boolean
    let addToSummer : boolean
    let addToKwanga : boolean

///////////////////////////////////////////////////////////////////
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.summerGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === true){
          if(this.allProducts[i].productID !== this.summerGear[j].productID){
            addToSummer = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.summerGear[j].productID){
            addToSummer = false
            //console.log(this.allProducts[i].productID);
            return
          }
          }
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToWinter = false
      for(let j in this.winterGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === false){
          if(this.allProducts[i].productID !== this.winterGear[j].productID){
            addToWinter = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.winterGear[j].productID){
            addToWinter = false
            break
          }

          }
        }
      }
      if(addToWinter === true){
        if(this.winterGear.length < 6){
          this.winterGear.push(this.allProducts[i])
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.kwangaGear){
      if(this.allProducts[i].brand === 'Kwanga'){
          if(this.allProducts[i].productID !== this.kwangaGear[j].productID){
            addToKwanga = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.kwangaGear[j].productID){
            addToKwanga = false
            //console.log(this.allProducts[i].productID);
            break
          }
        }
      }
      if(addToKwanga === true){
        if(this.kwangaGear.length < 3){
          this.kwangaGear.push(this.allProducts[i])
        }
      }
    }
    this.sortKwangaProducts()
    this.sortSummerProducts()
    this.sortWinterProducts()
  }
  modifyLocalObjectsHoodies(result, brand, category){
    let items : Array<any> = []
    let data : object = {}
    let productID = ''
    let docData
    let addItems : boolean
    for(let key in result.docChanges()){
      let change = result.docChanges()[key]
      if(change.type === 'added'){
        data = {}
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        // items.push(data)
      }else if(change.type === 'removed'){
        productID = change.doc.id
        for(let key in this.allProducts){
          if(productID === this.allProducts[key].productID){
            let index = Number(key)
            this.allProducts.splice(index, 1)
            this.inventoryLength = this.allProducts.length
          }
        }
        if(brand === 'Dankie Jesu'){
          if(change.doc.data().isSummer === true){
            for(let key in this.summerGear){
              if(productID === this.summerGear[key].productID){
                let index = Number(key)
                this.summerGear.splice(index, 1)

              }
            }
          }else if(change.doc.data().isSummer === false){
            for(let key in this.winterGear){
              if(productID === this.winterGear[key].productID){
                let index = Number(key)
                this.winterGear.splice(index, 1)
              }
            }
          }
        }else if(brand === 'Kwanga'){
          for(let key in this.kwangaGear){
            if(productID === this.kwangaGear[key].productID){
              let index = Number(key)
              this.kwangaGear.splice(index, 1)
            }
          }
        }
        this.sortKwangaProducts()
        this.sortSummerProducts()
        this.sortWinterProducts()
      }else if(change.type === 'modified'){
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        items.push(data)
        for(let key in this.allProducts){
          if(this.allProducts[key].productID === productID){
            this.allProducts[key].data = docData
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts.push(items[1])
    //   return
    // }
    if(this.allProducts.length === 0){
      this.allProducts = items
      this.inventoryLength = this.allProducts.length
            if(brand === 'Dankie Jesu'){
        if(this.summer === true){
          this.summerGear.unshift(data)
        }else if(this.summer === false){
          this.winterGear.unshift(data)
        }
      }else if(brand === 'Kwanga'){
        this.kwangaGear.unshift(data)
      }
    }else if(this.allProducts.length > 0){
      for(let i in items){
        addItems = false
        for(let key in this.allProducts){
          if(this.allProducts[key].productID !== items[i].productID){
            addItems = true
          }else if(this.allProducts[key].productID === items[i].productID){
            addItems = false
            let logo : Array<any> = []
            logo.push(addItems);
            console.log(logo);
            
            break
          }
        }
        if(addItems === true){
          this.allProducts.unshift(data)
          this.inventoryLength = this.allProducts.length
          if(brand === 'Dankie Jesu'){
            if(this.summer === true){
              this.summerGear.unshift(data)
              if(this.summerGear.length > 6){
                this.summerGear.splice(this.summerGear.length - 1, 1)
              }

            }else if(this.summer === false){
              this.winterGear.unshift(data)
              if(this.winterGear.length > 6){
                this.winterGear.splice(this.winterGear.length - 1, 1)
              }
            }
          }else if(brand === 'Kwanga'){
            this.kwangaGear.unshift(data)
            if(this.kwangaGear.length > 3){
              this.kwangaGear.splice(this.kwangaGear.length - 1, 1)
            }
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts = items
    // }

    let addToWinter : boolean
    let addToSummer : boolean
    let addToKwanga : boolean

///////////////////////////////////////////////////////////////////
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.summerGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === true){
          if(this.allProducts[i].productID !== this.summerGear[j].productID){
            addToSummer = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.summerGear[j].productID){
            addToSummer = false
            //console.log(this.allProducts[i].productID);
            return
          }
          }
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToWinter = false
      for(let j in this.winterGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === false){
          if(this.allProducts[i].productID !== this.winterGear[j].productID){
            addToWinter = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.winterGear[j].productID){
            addToWinter = false
            break
          }

          }
        }
      }
      if(addToWinter === true){
        if(this.winterGear.length < 6){
          this.winterGear.push(this.allProducts[i])
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.kwangaGear){
      if(this.allProducts[i].brand === 'Kwanga'){
          if(this.allProducts[i].productID !== this.kwangaGear[j].productID){
            addToKwanga = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.kwangaGear[j].productID){
            addToKwanga = false
            //console.log(this.allProducts[i].productID);
            break
          }
        }
      }
      if(addToKwanga === true){
        if(this.kwangaGear.length < 3){
          this.kwangaGear.push(this.allProducts[i])
        }
      }
    }
    this.sortKwangaProducts()
    this.sortSummerProducts()
    this.sortWinterProducts()
  }
  modifyLocalObjectsTrackSuits(result, brand, category){
    let items : Array<any> = []
    let data : object = {}
    let productID = ''
    let docData
    let addItems : boolean
    for(let key in result.docChanges()){
      let change = result.docChanges()[key]
      if(change.type === 'added'){
        data = {}
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        // items.push(data)
      }else if(change.type === 'removed'){
        productID = change.doc.id
        for(let key in this.allProducts){
          if(productID === this.allProducts[key].productID){
            let index = Number(key)
            this.allProducts.splice(index, 1)
            this.inventoryLength = this.allProducts.length
          }
        }
        if(brand === 'Dankie Jesu'){
          if(change.doc.data().isSummer === true){
            for(let key in this.summerGear){
              if(productID === this.summerGear[key].productID){
                let index = Number(key)
                this.summerGear.splice(index, 1)

              }
            }
          }else if(change.doc.data().isSummer === false){
            for(let key in this.winterGear){
              if(productID === this.winterGear[key].productID){
                let index = Number(key)
                this.winterGear.splice(index, 1)
              }
            }
          }
        }else if(brand === 'Kwanga'){
          for(let key in this.kwangaGear){
            if(productID === this.kwangaGear[key].productID){
              let index = Number(key)
              this.kwangaGear.splice(index, 1)
            }
          }
        }
        this.sortKwangaProducts()
        this.sortSummerProducts()
        this.sortWinterProducts()
      }else if(change.type === 'modified'){
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        items.push(data)
        for(let key in this.allProducts){
          if(this.allProducts[key].productID === productID){
            this.allProducts[key].data = docData
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts.push(items[1])
    //   return
    // }
    if(this.allProducts.length === 0){
      this.allProducts = items
      this.inventoryLength = this.allProducts.length
            if(brand === 'Dankie Jesu'){
        if(this.summer === true){
          this.summerGear.unshift(data)
        }else if(this.summer === false){
          this.winterGear.unshift(data)
        }
      }else if(brand === 'Kwanga'){
        this.kwangaGear.unshift(data)
      }
    }else if(this.allProducts.length > 0){
      for(let i in items){
        addItems = false
        for(let key in this.allProducts){
          if(this.allProducts[key].productID !== items[i].productID){
            addItems = true
          }else if(this.allProducts[key].productID === items[i].productID){
            addItems = false
            let logo : Array<any> = []
            logo.push(addItems);
            console.log(logo);
            
            break
          }
        }
        if(addItems === true){
          this.allProducts.unshift(data)
          this.inventoryLength = this.allProducts.length
          if(brand === 'Dankie Jesu'){
            if(this.summer === true){
              this.summerGear.unshift(data)
              if(this.summerGear.length > 6){
                this.summerGear.splice(this.summerGear.length - 1, 1)
              }

            }else if(this.summer === false){
              this.winterGear.unshift(data)
              if(this.winterGear.length > 6){
                this.winterGear.splice(this.winterGear.length - 1, 1)
              }
            }
          }else if(brand === 'Kwanga'){
            this.kwangaGear.unshift(data)
            if(this.kwangaGear.length > 3){
              this.kwangaGear.splice(this.kwangaGear.length - 1, 1)
            }
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts = items
    // }

    let addToWinter : boolean
    let addToSummer : boolean
    let addToKwanga : boolean

///////////////////////////////////////////////////////////////////
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.summerGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === true){
          if(this.allProducts[i].productID !== this.summerGear[j].productID){
            addToSummer = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.summerGear[j].productID){
            addToSummer = false
            //console.log(this.allProducts[i].productID);
            return
          }
          }
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToWinter = false
      for(let j in this.winterGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === false){
          if(this.allProducts[i].productID !== this.winterGear[j].productID){
            addToWinter = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.winterGear[j].productID){
            addToWinter = false
            break
          }

          }
        }
      }
      if(addToWinter === true){
        if(this.winterGear.length < 6){
          this.winterGear.push(this.allProducts[i])
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.kwangaGear){
      if(this.allProducts[i].brand === 'Kwanga'){
          if(this.allProducts[i].productID !== this.kwangaGear[j].productID){
            addToKwanga = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.kwangaGear[j].productID){
            addToKwanga = false
            //console.log(this.allProducts[i].productID);
            break
          }
        }
      }
      if(addToKwanga === true){
        if(this.kwangaGear.length < 3){
          this.kwangaGear.push(this.allProducts[i])
        }
      }
    }
    this.sortKwangaProducts()
    this.sortSummerProducts()
    this.sortWinterProducts()
  }
  modifyLocalObjectsBeanies(result, brand, category){
    let items : Array<any> = []
    let data : object = {}
    let productID = ''
    let docData
    let addItems : boolean
    for(let key in result.docChanges()){
      let change = result.docChanges()[key]
      if(change.type === 'added'){
        data = {}
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        // items.push(data)
      }else if(change.type === 'removed'){
        productID = change.doc.id
        for(let key in this.allProducts){
          if(productID === this.allProducts[key].productID){
            let index = Number(key)
            this.allProducts.splice(index, 1)
            this.inventoryLength = this.allProducts.length
          }
        }
        if(brand === 'Dankie Jesu'){
          if(change.doc.data().isSummer === true){
            for(let key in this.summerGear){
              if(productID === this.summerGear[key].productID){
                let index = Number(key)
                this.summerGear.splice(index, 1)

              }
            }
          }else if(change.doc.data().isSummer === false){
            for(let key in this.winterGear){
              if(productID === this.winterGear[key].productID){
                let index = Number(key)
                this.winterGear.splice(index, 1)
              }
            }
          }
        }else if(brand === 'Kwanga'){
          for(let key in this.kwangaGear){
            if(productID === this.kwangaGear[key].productID){
              let index = Number(key)
              this.kwangaGear.splice(index, 1)
            }
          }
        }
        this.sortKwangaProducts()
        this.sortSummerProducts()
        this.sortWinterProducts()
      }else if(change.type === 'modified'){
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        items.push(data)
        for(let key in this.allProducts){
          if(this.allProducts[key].productID === productID){
            this.allProducts[key].data = docData
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts.push(items[1])
    //   return
    // }
    if(this.allProducts.length === 0){
      this.allProducts = items
      this.inventoryLength = this.allProducts.length
            if(brand === 'Dankie Jesu'){
        if(this.summer === true){
          this.summerGear.unshift(data)
        }else if(this.summer === false){
          this.winterGear.unshift(data)
        }
      }else if(brand === 'Kwanga'){
        this.kwangaGear.unshift(data)
      }
    }else if(this.allProducts.length > 0){
      for(let i in items){
        addItems = false
        for(let key in this.allProducts){
          if(this.allProducts[key].productID !== items[i].productID){
            addItems = true
          }else if(this.allProducts[key].productID === items[i].productID){
            addItems = false
            let logo : Array<any> = []
            logo.push(addItems);
            console.log(logo);
            
            break
          }
        }
        if(addItems === true){
          this.allProducts.unshift(data)
          this.inventoryLength = this.allProducts.length
          if(brand === 'Dankie Jesu'){
            if(this.summer === true){
              this.summerGear.unshift(data)
              if(this.summerGear.length > 6){
                this.summerGear.splice(this.summerGear.length - 1, 1)
              }

            }else if(this.summer === false){
              this.winterGear.unshift(data)
              if(this.winterGear.length > 6){
                this.winterGear.splice(this.winterGear.length - 1, 1)
              }
            }
          }else if(brand === 'Kwanga'){
            this.kwangaGear.unshift(data)
            if(this.kwangaGear.length > 3){
              this.kwangaGear.splice(this.kwangaGear.length - 1, 1)
            }
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts = items
    // }

    let addToWinter : boolean
    let addToSummer : boolean
    let addToKwanga : boolean

///////////////////////////////////////////////////////////////////
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.summerGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === true){
          if(this.allProducts[i].productID !== this.summerGear[j].productID){
            addToSummer = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.summerGear[j].productID){
            addToSummer = false
            //console.log(this.allProducts[i].productID);
            return
          }
          }
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToWinter = false
      for(let j in this.winterGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === false){
          if(this.allProducts[i].productID !== this.winterGear[j].productID){
            addToWinter = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.winterGear[j].productID){
            addToWinter = false
            break
          }

          }
        }
      }
      if(addToWinter === true){
        if(this.winterGear.length < 6){
          this.winterGear.push(this.allProducts[i])
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.kwangaGear){
      if(this.allProducts[i].brand === 'Kwanga'){
          if(this.allProducts[i].productID !== this.kwangaGear[j].productID){
            addToKwanga = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.kwangaGear[j].productID){
            addToKwanga = false
            //console.log(this.allProducts[i].productID);
            break
          }
        }
      }
      if(addToKwanga === true){
        if(this.kwangaGear.length < 3){
          this.kwangaGear.push(this.allProducts[i])
        }
      }
    }
    this.sortKwangaProducts()
    this.sortSummerProducts()
    this.sortWinterProducts()
  }
  modifyLocalObjectsFormal(result, brand, category){
    let items : Array<any> = []
    let data : object = {}
    let productID = ''
    let docData
    let addItems : boolean
    for(let key in result.docChanges()){
      let change = result.docChanges()[key]
      if(change.type === 'added'){
        data = {}
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        // items.push(data)
      }else if(change.type === 'removed'){
        productID = change.doc.id
        for(let key in this.allProducts){
          if(productID === this.allProducts[key].productID){
            let index = Number(key)
            this.allProducts.splice(index, 1)
            this.inventoryLength = this.allProducts.length
          }
        }
        if(brand === 'Dankie Jesu'){
          if(change.doc.data().isSummer === true){
            for(let key in this.summerGear){
              if(productID === this.summerGear[key].productID){
                let index = Number(key)
                this.summerGear.splice(index, 1)

              }
            }
          }else if(change.doc.data().isSummer === false){
            for(let key in this.winterGear){
              if(productID === this.winterGear[key].productID){
                let index = Number(key)
                this.winterGear.splice(index, 1)
              }
            }
          }
        }else if(brand === 'Kwanga'){
          for(let key in this.kwangaGear){
            if(productID === this.kwangaGear[key].productID){
              let index = Number(key)
              this.kwangaGear.splice(index, 1)
            }
          }
        }
        this.sortKwangaProducts()
        this.sortSummerProducts()
        this.sortWinterProducts()
      }else if(change.type === 'modified'){
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        items.push(data)
        for(let key in this.allProducts){
          if(this.allProducts[key].productID === productID){
            this.allProducts[key].data = docData
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts.push(items[1])
    //   return
    // }
    if(this.allProducts.length === 0){
      this.allProducts = items
      this.inventoryLength = this.allProducts.length
            if(brand === 'Dankie Jesu'){
        if(this.summer === true){
          this.summerGear.unshift(data)
        }else if(this.summer === false){
          this.winterGear.unshift(data)
        }
      }else if(brand === 'Kwanga'){
        this.kwangaGear.unshift(data)
      }
    }else if(this.allProducts.length > 0){
      for(let i in items){
        addItems = false
        for(let key in this.allProducts){
          if(this.allProducts[key].productID !== items[i].productID){
            addItems = true
          }else if(this.allProducts[key].productID === items[i].productID){
            addItems = false
            let logo : Array<any> = []
            logo.push(addItems);
            console.log(logo);
            
            break
          }
        }
        if(addItems === true){
          this.allProducts.unshift(data)
          this.inventoryLength = this.allProducts.length
          if(brand === 'Dankie Jesu'){
            if(this.summer === true){
              this.summerGear.unshift(data)
              if(this.summerGear.length > 6){
                this.summerGear.splice(this.summerGear.length - 1, 1)
              }

            }else if(this.summer === false){
              this.winterGear.unshift(data)
              if(this.winterGear.length > 6){
                this.winterGear.splice(this.winterGear.length - 1, 1)
              }
            }
          }else if(brand === 'Kwanga'){
            this.kwangaGear.unshift(data)
            if(this.kwangaGear.length > 3){
              this.kwangaGear.splice(this.kwangaGear.length - 1, 1)
            }
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts = items
    // }

    let addToWinter : boolean
    let addToSummer : boolean
    let addToKwanga : boolean

///////////////////////////////////////////////////////////////////
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.summerGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === true){
          if(this.allProducts[i].productID !== this.summerGear[j].productID){
            addToSummer = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.summerGear[j].productID){
            addToSummer = false
            //console.log(this.allProducts[i].productID);
            return
          }
          }
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToWinter = false
      for(let j in this.winterGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === false){
          if(this.allProducts[i].productID !== this.winterGear[j].productID){
            addToWinter = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.winterGear[j].productID){
            addToWinter = false
            break
          }

          }
        }
      }
      if(addToWinter === true){
        if(this.winterGear.length < 6){
          this.winterGear.push(this.allProducts[i])
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.kwangaGear){
      if(this.allProducts[i].brand === 'Kwanga'){
          if(this.allProducts[i].productID !== this.kwangaGear[j].productID){
            addToKwanga = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.kwangaGear[j].productID){
            addToKwanga = false
            //console.log(this.allProducts[i].productID);
            break
          }
        }
      }
      if(addToKwanga === true){
        if(this.kwangaGear.length < 3){
          this.kwangaGear.push(this.allProducts[i])
        }
      }
    }
    this.sortKwangaProducts()
    this.sortSummerProducts()
    this.sortWinterProducts()
  }
  modifyLocalObjectsTraditional(result, brand, category){
    let items : Array<any> = []
    let data : object = {}
    let productID = ''
    let docData
    let addItems : boolean
    for(let key in result.docChanges()){
      let change = result.docChanges()[key]
      if(change.type === 'added'){
        data = {}
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        // items.push(data)
      }else if(change.type === 'removed'){
        productID = change.doc.id
        for(let key in this.allProducts){
          if(productID === this.allProducts[key].productID){
            let index = Number(key)
            this.allProducts.splice(index, 1)
            this.inventoryLength = this.allProducts.length
          }
        }
        if(brand === 'Dankie Jesu'){
          if(change.doc.data().isSummer === true){
            for(let key in this.summerGear){
              if(productID === this.summerGear[key].productID){
                let index = Number(key)
                this.summerGear.splice(index, 1)

              }
            }
          }else if(change.doc.data().isSummer === false){
            for(let key in this.winterGear){
              if(productID === this.winterGear[key].productID){
                let index = Number(key)
                this.winterGear.splice(index, 1)
              }
            }
          }
        }else if(brand === 'Kwanga'){
          for(let key in this.kwangaGear){
            if(productID === this.kwangaGear[key].productID){
              let index = Number(key)
              this.kwangaGear.splice(index, 1)
            }
          }
        }
        this.sortKwangaProducts()
        this.sortSummerProducts()
        this.sortWinterProducts()
      }else if(change.type === 'modified'){
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        items.push(data)
        for(let key in this.allProducts){
          if(this.allProducts[key].productID === productID){
            this.allProducts[key].data = docData
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts.push(items[1])
    //   return
    // }
    if(this.allProducts.length === 0){
      this.allProducts = items
      this.inventoryLength = this.allProducts.length
            if(brand === 'Dankie Jesu'){
        if(this.summer === true){
          this.summerGear.unshift(data)
        }else if(this.summer === false){
          this.winterGear.unshift(data)
        }
      }else if(brand === 'Kwanga'){
        this.kwangaGear.unshift(data)
      }
    }else if(this.allProducts.length > 0){
      for(let i in items){
        addItems = false
        for(let key in this.allProducts){
          if(this.allProducts[key].productID !== items[i].productID){
            addItems = true
          }else if(this.allProducts[key].productID === items[i].productID){
            addItems = false
            let logo : Array<any> = []
            logo.push(addItems);
            console.log(logo);
            
            break
          }
        }
        if(addItems === true){
          this.allProducts.unshift(data)
          this.inventoryLength = this.allProducts.length
          if(brand === 'Dankie Jesu'){
            if(this.summer === true){
              this.summerGear.unshift(data)
              if(this.summerGear.length > 6){
                this.summerGear.splice(this.summerGear.length - 1, 1)
              }

            }else if(this.summer === false){
              this.winterGear.unshift(data)
              if(this.winterGear.length > 6){
                this.winterGear.splice(this.winterGear.length - 1, 1)
              }
            }
          }else if(brand === 'Kwanga'){
            this.kwangaGear.unshift(data)
            if(this.kwangaGear.length > 3){
              this.kwangaGear.splice(this.kwangaGear.length - 1, 1)
            }
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts = items
    // }

    let addToWinter : boolean
    let addToSummer : boolean
    let addToKwanga : boolean

///////////////////////////////////////////////////////////////////
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.summerGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === true){
          if(this.allProducts[i].productID !== this.summerGear[j].productID){
            addToSummer = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.summerGear[j].productID){
            addToSummer = false
            //console.log(this.allProducts[i].productID);
            return
          }
          }
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToWinter = false
      for(let j in this.winterGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === false){
          if(this.allProducts[i].productID !== this.winterGear[j].productID){
            addToWinter = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.winterGear[j].productID){
            addToWinter = false
            break
          }

          }
        }
      }
      if(addToWinter === true){
        if(this.winterGear.length < 6){
          this.winterGear.push(this.allProducts[i])
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.kwangaGear){
      if(this.allProducts[i].brand === 'Kwanga'){
          if(this.allProducts[i].productID !== this.kwangaGear[j].productID){
            addToKwanga = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.kwangaGear[j].productID){
            addToKwanga = false
            //console.log(this.allProducts[i].productID);
            break
          }
        }
      }
      if(addToKwanga === true){
        if(this.kwangaGear.length < 3){
          this.kwangaGear.push(this.allProducts[i])
        }
      }
    }
    this.sortKwangaProducts()
    this.sortSummerProducts()
    this.sortWinterProducts()
  }
  modifyLocalObjectsSmartCasual(result, brand, category){
    let items : Array<any> = []
    let data : object = {}
    let productID = ''
    let docData
    let addItems : boolean
    for(let key in result.docChanges()){
      let change = result.docChanges()[key]
      if(change.type === 'added'){
        data = {}
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        // items.push(data)
      }else if(change.type === 'removed'){
        productID = change.doc.id
        for(let key in this.allProducts){
          if(productID === this.allProducts[key].productID){
            let index = Number(key)
            this.allProducts.splice(index, 1)
            this.inventoryLength = this.allProducts.length
          }
        }
        if(brand === 'Dankie Jesu'){
          if(change.doc.data().isSummer === true){
            for(let key in this.summerGear){
              if(productID === this.summerGear[key].productID){
                let index = Number(key)
                this.summerGear.splice(index, 1)

              }
            }
          }else if(change.doc.data().isSummer === false){
            for(let key in this.winterGear){
              if(productID === this.winterGear[key].productID){
                let index = Number(key)
                this.winterGear.splice(index, 1)
              }
            }
          }
        }else if(brand === 'Kwanga'){
          for(let key in this.kwangaGear){
            if(productID === this.kwangaGear[key].productID){
              let index = Number(key)
              this.kwangaGear.splice(index, 1)
            }
          }
        }
        this.sortKwangaProducts()
        this.sortSummerProducts()
        this.sortWinterProducts()
      }else if(change.type === 'modified'){
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        items.push(data)
        
        for(let key in this.allProducts){
          if(this.allProducts[key].productID === productID){
            this.allProducts[key].data = docData
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts.push(items[1])
    //   return
    // }
    if(this.allProducts.length === 0){
      this.allProducts = items
      this.inventoryLength = this.allProducts.length
            if(brand === 'Dankie Jesu'){
        if(this.summer === true){
          this.summerGear.unshift(data)
        }else if(this.summer === false){
          this.winterGear.unshift(data)
        }
      }else if(brand === 'Kwanga'){
        this.kwangaGear.unshift(data)
      }
    }else if(this.allProducts.length > 0){

      for(let i in items){
        addItems = false
        for(let key in this.allProducts){
          if(this.allProducts[key].productID !== items[i].productID){
            addItems = true
          }else if(this.allProducts[key].productID === items[i].productID){
            addItems = false
            let logo : Array<any> = []
            logo.push(addItems);
            console.log(logo);
            
            break
          }
        }
        if(addItems === true){
          this.allProducts.unshift(data)
          this.inventoryLength = this.allProducts.length
          if(brand === 'Dankie Jesu'){
            if(this.summer === true){
              this.summerGear.unshift(data)
              if(this.summerGear.length > 6){
                this.summerGear.splice(this.summerGear.length - 1, 1)
              }

            }else if(this.summer === false){
              this.winterGear.unshift(data)
              if(this.winterGear.length > 6){
                this.winterGear.splice(this.winterGear.length - 1, 1)
              }
            }
          }else if(brand === 'Kwanga'){
            this.kwangaGear.unshift(data)
            if(this.kwangaGear.length > 3){
              this.kwangaGear.splice(this.kwangaGear.length - 1, 1)
            }
          }
        }
      }
    
    }

    // if(this.allProducts.length === 0){
    //   this.allProducts = items
    // }

    let addToWinter : boolean
    let addToSummer : boolean
    let addToKwanga : boolean

///////////////////////////////////////////////////////////////////
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.summerGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === true){
          if(this.allProducts[i].productID !== this.summerGear[j].productID){
            addToSummer = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.summerGear[j].productID){
            addToSummer = false
            //console.log(this.allProducts[i].productID);
            return
          }
          }
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToWinter = false
      for(let j in this.winterGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === false){
          if(this.allProducts[i].productID !== this.winterGear[j].productID){
            addToWinter = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.winterGear[j].productID){
            addToWinter = false
            break
          }

          }
        }
      }
      if(addToWinter === true){
        if(this.winterGear.length < 6){
          this.winterGear.push(this.allProducts[i])
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.kwangaGear){
      if(this.allProducts[i].brand === 'Kwanga'){
          if(this.allProducts[i].productID !== this.kwangaGear[j].productID){
            addToKwanga = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.kwangaGear[j].productID){
            addToKwanga = false
            //console.log(this.allProducts[i].productID);
            break
          }
        }
      }
      if(addToKwanga === true){
        if(this.kwangaGear.length < 3){
          this.kwangaGear.push(this.allProducts[i])
        }
      }
    }
    this.sortKwangaProducts()
    this.sortSummerProducts()
    this.sortWinterProducts()
  }
  modifyLocalObjectsSports(result, brand, category){
    let items : Array<any> = []
    let data : object = {}
    let productID = ''
    let docData
    let addItems : boolean
    for(let key in result.docChanges()){
      let change = result.docChanges()[key]
      if(change.type === 'added'){
        data = {}
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        // items.push(data)
      }else if(change.type === 'removed'){
        productID = change.doc.id
        for(let key in this.allProducts){
          if(productID === this.allProducts[key].productID){
            let index = Number(key)
            this.allProducts.splice(index, 1)
            this.inventoryLength = this.allProducts.length
          }
        }
        if(brand === 'Dankie Jesu'){
          if(change.doc.data().isSummer === true){
            for(let key in this.summerGear){
              if(productID === this.summerGear[key].productID){
                let index = Number(key)
                this.summerGear.splice(index, 1)

              }
            }
          }else if(change.doc.data().isSummer === false){
            for(let key in this.winterGear){
              if(productID === this.winterGear[key].productID){
                let index = Number(key)
                this.winterGear.splice(index, 1)
              }
            }
          }
        }else if(brand === 'Kwanga'){
          for(let key in this.kwangaGear){
            if(productID === this.kwangaGear[key].productID){
              let index = Number(key)
              this.kwangaGear.splice(index, 1)
            }
          }
        }
        this.sortKwangaProducts()
        this.sortSummerProducts()
        this.sortWinterProducts()
      }else if(change.type === 'modified'){
        productID = change.doc.id
        docData = change.doc.data()
        data = {productID: productID, data: docData, category: category, brand: brand}
        items.push(data)
        for(let key in this.allProducts){
          if(this.allProducts[key].productID === productID){
            this.allProducts[key].data = docData
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts.push(items[1])
    //   return
    // }
    if(this.allProducts.length === 0){
      this.allProducts = items
      this.inventoryLength = this.allProducts.length
            if(brand === 'Dankie Jesu'){
        if(this.summer === true){
          this.summerGear.unshift(data)
        }else if(this.summer === false){
          this.winterGear.unshift(data)
        }
      }else if(brand === 'Kwanga'){
        this.kwangaGear.unshift(data)
      }
    }else if(this.allProducts.length > 0){
      for(let i in items){
        addItems = false
        for(let key in this.allProducts){
          if(this.allProducts[key].productID !== items[i].productID){
            addItems = true
          }else if(this.allProducts[key].productID === items[i].productID){
            addItems = false
            let logo : Array<any> = []
            logo.push(addItems);
            console.log(logo);
            
            break
          }
        }
        if(addItems === true){
          this.allProducts.unshift(data)
          this.inventoryLength = this.allProducts.length
          if(brand === 'Dankie Jesu'){
            if(this.summer === true){
              this.summerGear.unshift(data)
              if(this.summerGear.length > 6){
                this.summerGear.splice(this.summerGear.length - 1, 1)
              }

            }else if(this.summer === false){
              this.winterGear.unshift(data)
              if(this.winterGear.length > 6){
                this.winterGear.splice(this.winterGear.length - 1, 1)
              }
            }
          }else if(brand === 'Kwanga'){
            this.kwangaGear.unshift(data)
            if(this.kwangaGear.length > 3){
              this.kwangaGear.splice(this.kwangaGear.length - 1, 1)
            }
          }
        }
      }
    }
    // if(this.allProducts.length === 0){
    //   this.allProducts = items
    // }

    let addToWinter : boolean
    let addToSummer : boolean
    let addToKwanga : boolean

///////////////////////////////////////////////////////////////////
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.summerGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === true){
          if(this.allProducts[i].productID !== this.summerGear[j].productID){
            addToSummer = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.summerGear[j].productID){
            addToSummer = false
            //console.log(this.allProducts[i].productID);
            return
          }
          }
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToWinter = false
      for(let j in this.winterGear){
      if(this.allProducts[i].brand === 'Dankie Jesu'){
        if(this.allProducts[i].data.isSummer === false){
          if(this.allProducts[i].productID !== this.winterGear[j].productID){
            addToWinter = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.winterGear[j].productID){
            addToWinter = false
            break
          }

          }
        }
      }
      if(addToWinter === true){
        if(this.winterGear.length < 6){
          this.winterGear.push(this.allProducts[i])
        }
      }
      if(addToSummer === true){
        if(this.summerGear.length < 6){
          this.summerGear.push(this.allProducts[i])
        }
      }
    }
    for(let i in this.allProducts){
      //addToSummer = false
      for(let j in this.kwangaGear){
      if(this.allProducts[i].brand === 'Kwanga'){
          if(this.allProducts[i].productID !== this.kwangaGear[j].productID){
            addToKwanga = true
            //console.log(this.allProducts[i].productID);
            
          }else if(this.allProducts[i].productID === this.kwangaGear[j].productID){
            addToKwanga = false
            //console.log(this.allProducts[i].productID);
            break
          }
        }
      }
      if(addToKwanga === true){
        if(this.kwangaGear.length < 3){
          this.kwangaGear.push(this.allProducts[i])
        }
      }
    }
    this.sortKwangaProducts()
    this.sortSummerProducts()
    this.sortWinterProducts()
  }
  newProductNameMatch
 private cutNameArray(checkVal){
    return new Promise( (resolve, reject) => {
      let array = checkVal.reverse()
        while(array[0] === ' '){
          array.splice(0, 1)
          console.log(array);
      }
      resolve (array.reverse())
    })
  }
  cutDoubleSpace(para){
    return new Promise( (resolve, reject) => {
      let array : Array<any> = para.split('')
      while(array[0] === ' '){
        array.splice(0, 1)
      }
      for(let i = 0; i < array.length; i++){
        if(array[i] === ' '){
          while(array[i + 1] === ' '){
            array.splice((i + 1), 1)
          }
        }
      }
      let arrayReverse : Array<any> = array.reverse()
      while(arrayReverse[0] === ' '){
        arrayReverse.splice(0, 1)
        console.log(arrayReverse);
    }
      resolve ((arrayReverse.reverse()).join(''))
    })
  }
  findMatch(event, item){
    console.log(this.itemName);
    console.log(item);
    
    let val = event.target.value.toLowerCase()
    console.log(event.target.tagName);
    if(item === null){
      let match 
      if(val !== '' && val !== '*'){
        let checkVal : Array<string> = val.split('')
        //console.log(checkVal);
        console.log(checkVal);
        
        this.cutDoubleSpace(val).then((result) => {
          console.log(result);
          let joined = result
          console.log(joined);
          this.searchInventory(joined, event.target.tagName)
          for(let key in this.allProducts){
            if(joined === this.allProducts[key].data.name.toLowerCase()){
              //console.log('joined');
              //console.log('match');
              this.newProductNameMatch = true
              if(this.allProducts[key].category === this.selectedCategory){
                this.categoryMatch = true
                break
              }else{
                this.categoryMatch = false
              }
              console.log(joined, this.allProducts[key].data.name.toLowerCase() );
              break
            }else{
              //console.log(joined, this.allProducts[key].data.name.toLowerCase() );
              this.newProductNameMatch = false
              this.categoryMatch = false
              //console.log('no match');
              
            }
          }
          this.checkValidity()
        })
  
      }else if(val === ''){
        this.categoryMatch = false
        this.searchInventoryVal = []
      }
    }else{
      let match 
      if(val !== '' && val !== '*'){
        let checkVal : Array<string> = val.split('')
        //console.log(checkVal);
        console.log(checkVal);
        
        this.cutDoubleSpace(val).then((result) => {
          console.log(result);
          let joined = result
          console.log(joined);
          //this.searchInventory(joined, event.target.tagName)
          for(let key in this.allProducts){
            if(joined === this.allProducts[key].data.name.toLowerCase()){
              //console.log('joined');
              //console.log('match');
              this.newProductNameMatch = true
              if((this.allProducts[key].category === item.category) && (this.allProducts[key].productID !== item.productID)){
                this.categoryUpdateMatch = true
                console.log(this.categoryUpdateMatch);
                
                break
              }else{
                this.categoryUpdateMatch = false
                console.log(this.categoryUpdateMatch);
              }
              console.log(joined, this.allProducts[key].data.name.toLowerCase() );
              break
            }else{
              //console.log(joined, this.allProducts[key].data.name.toLowerCase() );
              this.newProductNameMatch = false
              this.categoryUpdateMatch = false
              console.log(this.categoryUpdateMatch);
              //console.log('no match');
              
            }
          }
          //this.checkValidity()
        })
  
      }else if(val === ''){
        this.categoryMatch = false
        this.searchInventoryVal = []
      }
    }

   // console.log(match);
    
  }
  
  searchInventoryVal : Array<any> = []
  searchSideInventory : Array<any> = []
  categoryMatch : boolean
  categoryUpdateMatch : boolean
  inventorySearch : boolean
  searchInventory(event, tag){
    this.inventorySearch = false
    console.log('inventory search query', this.inventorySearch);
    
    let val = ''
    if(event.target){
      val = event.target.value.toLowerCase()
    }else{
      val = event.toLowerCase()
    }


    console.log(val);
    if(tag !== null){

      if(val !== '' && val !== '*' && tag !== 'function'){
        this.searchInventoryVal = this.allProducts.filter(item => item.data.name.toLowerCase().indexOf(val) >= 0)
        for(let key in this.searchInventoryVal){
          if((this.searchInventoryVal[key].category === this.selectedCategory) && tag !== 'function'){
           // this.categoryMatch = true
            console.log(this.searchInventoryVal[key]);
            
            break
          }else{
           // this.categoryMatch = false
          }
        }
      }else{
        this.searchInventoryVal = []
       // this.categoryMatch = false
      }
    }else if(tag === null){

      this.cutDoubleSpace(val).then( (result : any) => {
        val = result
        if(val !== '' && val !== '*' && tag !== 'function'){
          this.inventorySearch = true
          this.searchSideInventory = this.allProducts.filter(item => item.data.name.toLowerCase().indexOf(val) >= 0)
          for(let key in this.searchSideInventory){
            if((this.searchSideInventory[key].category === this.selectedCategory) && tag !== 'function'){
             // this.categoryMatch = true
              console.log(this.searchSideInventory[key]);
              
              break
            }else{
             // this.categoryMatch = false
            }
          }
        }else{
          this.searchSideInventory = []
          this.inventorySearch = false
         // this.categoryMatch = false
        }
      })

    }
    console.log(this.searchSideInventory);
    
    console.log(this.searchInventoryVal);
    
  }
  newProductCode : string = ''
  autoGenerateCode(){
    let alpha_A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let alpha_a = 'abcdefghijlmnopqrstuvwxyz'
    let first2 = (this.department.split('')[0]) + (this.department.split('')[1])
    let first3 = (this.selectedCategory.split('')[0] + this.selectedCategory.split('')[1] + this.selectedCategory.split('')[2])
    let second2 = (this.itemName.split('')[0] + this.itemName.split('')[1])
    let date = new Date()
    let first4 = (date.getMonth() + date.getDay())
    let date2 =    moment(moment.utc(new Date().getTime())).format('X')
    console.log(date2);
    this.newProductCode = date2
    console.log(first2);
    console.log(first3);
    console.log(second2);
    let search : boolean
    
    
    console.log(first4);
    this.checkValidity()
    for(let key in this.allProducts){
      if(this.allProducts[key].data.productCode){
        if(this.newProductCode === this.allProducts[key].data.productCode){
          this.autoGenerateCode()
        }
      }
    }
  }
  autoFillItemName(name){
    this.itemName = name
    let event : object = {}
    //event['target']['value'] = this.itemName
    event = { target : {value : this.itemName, tagName : 'function'}}
    this.findMatch(event, null)
    this.searchInventoryVal = []
  }
  autoPopulate(){
    this.clearForm()
    // console.log('dfgdfgdfgdf', this.mbdepartmentCombo);
    // console.log ('fdfgd',this.nativeCategory);
    
    // this.mbdepartmentCombo.nativeElement.value = 'fvvdvxcvx'
    // this.nativeCategory.nativeElement.value = this.selectedCategory
    
    
  }

  testingEmail(){
    console.log('adding');
    
    firebase.firestore().collection('TestingEmail').add({
      email: 'will.last.long3@gmail.com',
      answer: 'It is very easy to keep switching'
    })
  }
}
