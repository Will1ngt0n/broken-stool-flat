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
  
  @ViewChild('mbdepartmentCombo', {static : false}) mbdepartmentCombo : ElementRef
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
  checkRed : boolean; checkBlue : boolean; checkGreen : boolean; checkYellow : boolean; checkPink : boolean; checkWhite : boolean
  updateName; updatePrice; updateDescription; updateColors: Array<any> = []; updateSizes: Array<any> = []
  pictureUpdate : File

  constructor(private alertController: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, public route: Router, public authService: AuthService, public productService: ProductsService) {
    console.log(this.department);
    this.kwangaSpecialsPicture = undefined
    this.dankieJesuSpecialsPicture = undefined
    this.allSpecialsPicture = undefined
    //this.productService.getCategories()
    this.loadTotalNumberOfProducts()
    this.loadDankieJesuItems()
    this.loadKwangaItems()
    this.colors = { red: '' }
    this.accessory = false;
    this.summer = false;
    this.department = undefined
    this.selectedCategory = undefined
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

    // for (let key = 0; key < this.status.length; key++) {
    //   this.getPendingOrders(this.status[key])
    //   if (key === this.status.length - 1) {
    //     this.orderItems()
    //   }
    // }

    this.getPendingOrders()
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
    this.nativeCategory.nativeElement.disabled = true
    this.refreshOrderHistory()
    this.getPendingOrdersSnap()
    return this.authService.checkingAuthState().then( result => {
      if(result === null){
        this.route.navigate(['/login'])
      }else{
        //return this.loadPictures()

      }
    })
  }
  
  changeDepartment(event) {
    //console.log('Accessory ', this.accessory);

    //console.log(event.target['value']);
    this.department = event.target['value']
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
  ionViewDidEnter() {

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
  checkValidity() {
    console.log('running');
    
    if(this.nativeCategory.nativeElement.disabled === true){
      this.selectedCategory = 'Select Category'
    }
    if (this.selectedCategory === undefined || this.selectedCategory === 'Select Category' || this.department === undefined || this.department === 'Select Department' || this.size.length === 0 || this.color.length === 0 || this.itemName === '' || this.description === '' || this.price === '' || this.fileInput.nativeElement.value === '' || this.picture === undefined) {
      this.addForm = false
      console.log(this.addForm);

    } else {
      this.addForm = true
      console.log(this.addForm);
    }
    if (this.department !== 'Select Department' || this.selectedCategory !== 'Select Category' || this.size.length !== 0 || this.color.length !== 0 || this.itemName !== '' || this.description !== '' || this.price !== '' || this.fileInput.nativeElement.value !== '' || this.picture !== undefined) {
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
        };
        reader.readAsDataURL(event.target.files[0]);
        console.log(event.target.files[0]);
        
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
    this.currentNumberOfProducts = this.inventoryLength
    let number : string = String(Number(this.currentNumberOfProducts) + 1)
    console.log(number);

    this.addProducts(number)
        
  }
  addProducts(numberOfProducts) {
    return this.productService.addItem(this.department, this.selectedCategory, this.itemName, this.description, this.price, this.size, this.accessory, this.summer, this.color, this.picture, numberOfProducts).then(result => {

      console.log('added to first firebase')
    }).then(result => {
      this.loadTotalNumberOfProducts()
      firebase.firestore().collection('Products').doc(this.department).collection(this.selectedCategory).onSnapshot(result => {
        result.docChanges()
        console.log(result);
        console.log(result.docChanges());
        
        for(let key in result.docChanges()){
          let change = result.docChanges()[key]
          if(change.type === 'modified'){
            console.log('New item was added');
            console.log(result.docChanges()[key]);
            console.log(change.doc.data());
            let data : object = {}
            let productID = change.doc.id
            let docData = change.doc.data()
            data = {productID: productID, data: docData, category: this.selectedCategory, brand: this.department}
            console.log(data);
            //this.allProducts.unshift(data)
            console.log('');
            console.log(this.inventory);
            
            this.allProducts.unshift(data)
            this.inventoryLength = this.allProducts.length
            console.log(this.allProducts.length);
            console.log(this.inventoryLength);
            if(this.department === 'Dankie Jesu'){
              if(this.summer === true){
                this.summerGear.unshift(data)
                this.summerGear.splice(this.summerGear.length - 1, 1)
              }else if(this.summer === false){
                this.winterGear.unshift(data)
                this.winterGear.splice(this.winterGear.length - 1, 1)
              }
            }else if(this.department === 'Kwanga'){
              this.kwangaGear.unshift(data)
              this.kwangaGear.splice(this.kwangaGear.length - 1, 1)
            }
            
          }
        }
      })

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
      console.log(category);
      this.loadItems(category, 'Dankie Jesu')
    }
  }
  loadViewedCategory() {

  }

  loadTotalNumberOfProducts(){
    return this.productService.getNumberOfProducts().then( (result : number) => {
      this.currentNumberOfProducts = result
      console.log(this.currentNumberOfProducts);
      
    })
  }
  loadItems(category, brand){
 
    let data : Array<any> = []
    return this.productService.loadCategoryItems(category, brand).then(result => {
      if(result !== undefined){
        console.log(result);
        
        for(let key in result){
          if(brand === 'Kwanga'){
            this.kwangaProducts.push(result[key])
            this.allProducts.push(result[key])

            if(this.kwangaSpecialsPicture !== undefined){
              this.kwangaSpecialsPicture = this.kwangaProducts[0].data.pictureLink
            }
            console.log(this.allProducts);


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
  sortProducts(){
    this.allProducts.sort( (a,b) => {
      let data = (a.data.name) - (b.data.name)
      let c : any = new Date(a.data.dateAdded)
      let d : any = new Date(b.data.dateAdded)
      console.log(data);
      console.log(c - d);
      
      return d - c
    });
    console.log(this.inventoryLength);
    console.log(this.currentNumberOfProducts);
    
    if(this.inventoryLength === +this.currentNumberOfProducts){
      for(let key in this.allProducts){

        if(this.allProducts[key].brand === 'Kwanga'){
          if(this.kwangaGear.length < 3){
            this.kwangaGear.push(this.allProducts[key])
            console.log(this.kwangaGear);
          
          }
        }else if(this.allProducts[key].brand === 'Dankie Jesu') {
          if(this.allProducts[key].data.isSummer === true){
            this.summerProducts.push(this.allProducts[key])
            if(this.summerGear.length < 5){
              this.summerGear.push(this.allProducts[key])
            }
          } else if (this.allProducts[key].data.isSummer === false) {
            this.winterProducts.push(this.allProducts[key])
            if(this.winterGear.length < 5){
              this.winterGear.push(this.allProducts[key])
            }
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
    return firebase.firestore().collection('Order').onSnapshot(result => {
      let pendingOrder = []
     // console.log(result);
      
      for(let key in result.docChanges()){

        let change = result.docChanges()[key]
        if(change.type === 'added'){
          console.log(change);
          let pendingOrder : object = {}
          let refNo = change.doc.id
          let data = change.doc.data()
          let userID = data.userID
          console.log(refNo);
          console.log(data);
          console.log(userID);
          
          
          
          pendingOrder = {refNo : refNo, details : data, noOfItems: data.product.length}
          this.loadUserName(userID)
          let add : boolean
          add = false
          for(let key in this.pendingOrders){
            if(this.pendingOrders[key].refNo === refNo){
              add = false
              let index = Number(key)
              //this.pendingOrders.splice(index, 1)
            }else if(this.pendingOrders[key].refNo !== refNo){
              add = true
            }
          }

          if(add === false){

          }else if(add === true){
            this.pendingOrders.unshift(pendingOrder)
          }




        }
        if(change.type === 'modified' ){
          console.log(change);
          let pendingOrder : object = {}
          let refNo = change.doc.id
          let data = change.doc.data()
          let userID = data.userID
          pendingOrder = {refNo : refNo, details : data, noOfItems: data.product.length}
        }
        if(change.type === 'removed'){
          console.log(change);
          let pendingOrder : object = {}
          let refNo = change.doc.id
          let data = change.doc.data()
          let userID = data.userID
          console.log(refNo);
          console.log(data);
          console.log(userID);
          pendingOrder = {refNo : refNo, details : data, noOfItems: data.product.length}
          for(let key in this.pendingOrders){
            if(this.pendingOrders[key].refNo === refNo){
              let index = Number(key)
              this.pendingOrders.splice(index, 1)
            }else if(this.pendingOrders[key].refNo !== refNo){
              //add = true
            }
          }
          let index = this.pendingOrders.indexOf(pendingOrder)
          console.log(index);
          


        }
      }
      //   for(let key in result.docs){
      // //  console.log(result.docs[key].id);
      //   let refNo = result.docs[key].id
      //  // console.log(result.docs[key].data());
      //   let data = result.docs[key].data()
      //   let userID = data.userID
      //   console.log(userID);
      //   //this.loadUser(userID)

      //   pendingOrder.unshift({refNo : refNo, details : data, noOfItems: data.product.length})
      // };
      // console.log('Snapped', pendingOrder);
      // for (let key in pendingOrder) {
      //   this.loadUserName(pendingOrder[key].details.userID)
      // }
      //   this.pendingOrders = pendingOrder
      this.pendingOrdersLength = this.pendingOrders.length
      console.log(this.pendingOrders);
      

      return pendingOrder
      })
  }
  
  getPendingOrders() {
    return this.productService.getPendingOrders().then(result => {
      console.log(result);
      let array = result
      if (result.length !== 0) {
        for (let key in result) {
          this.pendingOrders.push(result[key])
          this.pendingOrdersLength = this.pendingOrders.length
          console.log(this.pendingOrders);
        }
        for (let key in this.pendingOrders) {
          this.loadUserName(this.pendingOrders[key].details.userID)
        }
      }
    })
  }
  loadUserName(data) {

    // return this.productService.loadUser(ID).then(result => {
    //   this.pendingOrders[key].name = result
    //   console.log(this.pendingOrders);
    // })
    return this.productService.loadUser(data).then(result => {
      console.log(result);
      for (let key in this.pendingOrders) {
        if (this.pendingOrders[key].details.userID === result.userID) {
          this.pendingOrders[key].details.name = result.name
          this.pendingOrders[key].details.cell = result.cell
        }
      }
      console.log(this.pendingOrders);

    })
    //thisgffdsg


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
      console.log(result);
      console.log(this.history);
      
      for(let key in result.docChanges()){
        let change = result.docChanges()[key]
        console.log(change);
        addHistory = false
        if(change.type === 'added'){
          console.log('New item was added');
          console.log(result.docChanges()[key]);
          console.log(change.doc.data());
          //let data : object = {}
          let productID = change.doc.id
          let docData = change.doc.data()
          refNo = change.doc.id
          data = change.doc.data()
            closedOrder.push({refNo : refNo, details : data})
            console.log(closedOrder);
            ///

            //console.log(this.history);
            if(closedOrder){


          }
        }
      }
      for(let i in closedOrder){
        addHistory = false
        for(let key in this.history){
          if(this.history[key].refNo !== closedOrder[i].refNo){
            console.log('history Ref = ', this.history[key].refNo);
            console.log('new item refNo');
            
            
            addHistory = true
            console.log(this.history[key]);
            console.log(closedOrder[i]);
            
            
          }else if(this.history[key].refNo === refNo){
            addHistory = false
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
          console.log(grandTotal);
      ////

      this.history.unshift(closedOrder[i])
      this.orderHistoryLength = this.history.length
      }else if(addHistory === false){
  
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
        let totalPrice : Number = 0
        let numberOfItems : Number = 0;
        let  grandTotal : Number = 0
        //console.log(this.history);
        if(this.history.length !== 0){
          console.log(this.history);
          
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
              //console.log(totalPrice);
              //console.log(numberOfItems);
            }
            this.history[key].details.totalPrice = totalPrice
            this.history[key].details.numberOfItems = numberOfItems
            this.history[key].details.grandTotal = grandTotal
            console.log(grandTotal);
            
            //console.log(this.history[key]);
            
          }
        }
      }


    })
  }
  viewOrderHistory(item) {
    //console.log(item);
    let parameter: NavigationExtras = { queryParams: { category: item, link: '/landing', refNo: item.refNo, userID: item.details.uid } }
    this.navCtrl.navigateForward(['order-receipt'], parameter);
  }
  closeOrder(docID) {
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
  subtract(item) {
    console.log(item.productID);
    for(let key in this.allProducts){
      if(this.allProducts[key].productID === item.productID){
        if(this.allProducts[key].data.quantity !== 0){
          this.allProducts[key].data.quantity = +this.allProducts[key].data.quantity - 1
        }
      }
    }
  }
  add(item) {
    console.log(item);
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
    if (quantity === '') {
      quantity = 0
    }
    return this.productService.updateQuantity(brand, category, productID, quantity).then(result => {
      console.log(result);
      alert('Quantity has been saved')
    })
  }
  viewPendingOrder(item) {
    //console.log(item);
    let parameter: NavigationExtras = { queryParams: { status: item.details.status, refNo: item.refNo, userID: item.details.userID, user: item.details.name, cell: item.details.cell, currentPage: '/landing' } }
    this.navCtrl.navigateForward(['pending-order'], parameter);
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
      let addBrand: boolean
      let addCategory: boolean
      let addName: boolean
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

  async loadPictures() {
    return this.productService.getPictures().then(result => {
      // console.log(result);
      let pictures: Array<any> = []
      for (let key in result.items) {
        result.items[key].getDownloadURL().then(link => {
          let path = result.items[key].fullPath
          let splitPath = path.split('/')
          let pictureID = splitPath[splitPath.length - 1]
          // picture['link'] = link
          // picture['productID'] = pictureID
          this.pictures.push({ link: link, productID: pictureID })
          // console.log(this.pictures);
          this.insertPictures()
         })

         //return result
        }
    })
  }

  insertPictures() {
    // console.log(this.pictures);
    // console.log(this.winterGear);
    // console.log(this.summerGear);


    for (let i in this.pictures) {
      //Adding pictures to products arrays
      // console.log(this.pictures);
      
      for(let key in this.allProducts){
        // console.log(this.allProducts, 'Here are all the products');
        
        if(this.pictures[i].productID === this.allProducts[key].productID){
          // console.log('ddsfds');
          this.allProducts[key].pictures = { link: this.pictures[i].link }
          // console.log(this.allProducts[key])
        }

      }
      for (let key in this.kwangaProducts) {
        if (this.pictures[i].productID === this.kwangaProducts[key].productID) {
          // console.log('ddsfds');
          this.kwangaProducts[key].pictures = { link: this.pictures[i].link }
          // console.log(this.kwangaProducts[key])
          if(this.kwangaSpecialsPicture === undefined){
            this.kwangaSpecialsPicture = this.pictures[i].link
          }

        }
        this.kwangaPic = this.kwangaProducts[0]
      }
      for (let key in this.summerGear) {
        if (this.pictures[i].productID === this.summerGear[key].productID) {
          // console.log('ddsfds');
          this.summerGear[key].pictures = { link: this.pictures[i].link }
          // console.log(this.summerGear[key])
          if(this.dankieJesuSpecialsPicture === undefined){
            this.dankieJesuSpecialsPicture = this.pictures[i].link
          }

        }
        this.dankieJesuPic = this.summerProducts[0]
      }
      for (let key in this.winterGear) {
        if (this.pictures[i].productID === this.winterGear[key].productID) {
          // console.log('ddsfds');
          this.winterGear[key].pictures = { link: this.pictures[i].link }
          // console.log(this.winterGear[key])
          if(this.allSpecialsPicture === undefined){
            this.allSpecialsPicture = this.pictures[i].link
          }

        }
        this.AllCatpic = this.winterProducts[0]
      }
    }
  }
  addUpdatePicture(event){
    this.updateSearchPic =  <File>event.target.files[0]
    //this.updatePic = this.updateSearchPic
  }
  // updateItem(){
  //   console.log('update');
    
  //   return this.productService.updateProduct(this.updateProductID, this.updateBrand, this.updateCategory, this.updateName, this.updateDescription, this.updatePrice, this.updateSearchPic).then(result => {
  //       console.log(result);
  //   })
  // }
  // hideItem(){
  //   return this.productService.hideProduct(this.updateProductID, this.updateBrand, this.updateCategory).then(result => {

  //   })
  // }
  // deleteItem(){
  //   return this.productService.deleteItemFromInventory(this.updateProductID, this.updateBrand, this.updateCategory, this.item).then(result => {
  //     // if(result === 'Deleted'){
        
  //     // }
  //   })
  // }

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
    // this.updateName = item.data.name
    // this.updatePrice = item.data.price
    // this.updateDescription = item.data.description
    // this.updatePic = item.data.pictureLink
    // this.updateSearchPic = item.data.pictureLink
    // this.updateBrand = item.brand
    // this.updateCategory = item.category
    // this.updateProductID = item.productID
    // console.log(this.updatePic);
    
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
      this.checkRed = false; this.checkBlue = false; this.checkGreen = false; this.checkYellow = false; this.checkPink = false; this.checkWhite = false
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
        if(this.itemColors[key] === 'Red'){
          this.checkRed = true
          this.updateSizes.push('XS')
        }else if(this.itemColors[key] === 'Blue'){
          this.checkBlue = true
          this.updateSizes.push('S')
        }else if(this.itemColors[key] === 'Green'){
          this.checkGreen = true
          this.updateSizes.push('M')
        }else if(this.itemColors[key] === 'Yellow'){
          this.checkYellow = true
          this.updateSizes.push('XL')
        }else if(this.itemColors[key] === 'Pink'){
          this.checkPink = true
          this.updateSizes.push('XXL')
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
    console.log(this.updateProductID, this.updateBrand, this.updateCategory, this.updatePrice, this.updateDescription, this.updateName, this.itemSizes, this.pictureUpdate, this.itemColors);
    //console.log(this.updateName);

    return this.productService.updateItemsListItem(this.updateProductID, this.updateBrand, this.updateCategory, this.updatePrice, this.updateDescription, this.updateName, this.itemSizes, this.pictureUpdate, this.itemColors).then(result => {
      console.log(result);
        setTimeout(() => {
          //this.reloadPage()
        }, 30);
      if (result === 'success') {
        console.log(result);
        this.showHideSearchDetails('close')
        //return this.dismissPromo()
      }
    })
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
    
    return this.productService.deleteItemFromInventory(productID, brand, category, item).then(result => {
      console.log(result);
      if(result = 'Deleted'){
        for(let key in this.allProducts){
          if(productID === this.allProducts[key].productID){
            let index = this.allProducts.indexOf(this.allProducts[key])
            this.allProducts.splice(index, 1)
            this.inventoryLength = this.allProducts.length
            this.loadTotalNumberOfProducts()
          }
        }
        // firebase.firestore().collection('Products').doc(brand).collection(category).onSnapshot(result => {
        //   for(let key in result.docChanges()){
        //     let change = result.docChanges()[key]
        //     if(change.type === 'removed'){
        //       console.log('An item was removed');
        //       console.log(result.docChanges()[key]);
        //       console.log(change.doc.data());
        //       let data : object = {}
        //       let productID = change.doc.id
        //       let docData = change.doc.data()
        //       data = {productID: productID, data: docData, category: this.selectedCategory, brand: this.department}
        //     } 
        //   }
        // })
      }
      //location.reload()
    })
  }

  hideItem(productID, brand, category) {
    return this.productService.hideProduct(productID, brand, category).then(result => {
      console.log(result);
    }).then(result => {
      this.getHideStatus(productID, brand, category)
    })
  }
  showItem(productID, brand, category) {
    return this.productService.showProduct(productID, brand, category).then(result => {
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
      
      this.item.data = { hideItem : status}
      console.log(this.item.data = { hideItem : status});
      
      this.searchedProductStatus = status
    })
  }
  reloadPage(){
    window.location.reload()
  }


  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Hellooo',
      duration:3000
    });
    await loading.present();

    // const { role, data } = await loading.onDidDismiss();

    // console.log('Loading dismissed!');
  }


}
