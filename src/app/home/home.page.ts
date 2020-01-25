import { Component } from '@angular/core';
import { FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { AuthService } from '../services/auth-services/auth.service';
import * as firebase from 'firebase'
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from '../services/question-services/questions.service';
import { Location } from '@angular/common'


declare var window
var provider = new firebase.auth.GoogleAuthProvider();
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loginForm
  number
  password
  registrationForm
  smsSent
  confirmationResult = ''
  inputCode
  searchArray : Array<any> = []
  answeredQuestions : Array<any> = []
  submitButton : boolean
  questionsArray : Array<any> = []
  //emailPattern : string = "[a-zA-Z0-9-_.+#$!=%^&*/?]+[@][a-zA-Z0-9-]+[.][a-zA-Z0-9]+"
  emailPattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  secondEmailPattern : string = "[a-zA-Z0-9-_.+#$!=%^&*/?]+[@][a-zA-Z0-9-]+[.][a-zA-Z0-9]+[.][a-zA-Z0-9]+"
  //pattern = new RegExp(this.emailPattern || this.secondEmailPattern)
  name
  email
  question
  questionsForm
  constructor(private loc : Location,public authService: AuthService, public formBuilder: FormBuilder, public alertController: AlertController, private navCtrl: Router, private questionsService : QuestionsService, private activatedRoute : ActivatedRoute) {
    // let person = {}
    // person = {
    //   'hello': {
    //     tree: 'hi',
    //     flower: false,
    //     houses: {
    //       'double-storey': true,
    //       'flat-house': false
    //     }
    //   }
    // }
    //console.log(person);
    let FAQs = 'FAQs'
    let about = 'About Company'
    let Terms = 'Terms and Privacy Policy'
    let Disclaimer = 'Disclaimer'
    let payment = 'Payment Policy'

    this.activatedRoute.params.subscribe(result => {
      console.log(result);
      //this.activeTab = result.id
      this.toggleTab(result.id)
    })

    this.questionsForm = formBuilder.group({
      email: [this.email, Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
      name: [this.name, Validators.compose([Validators.required, Validators.minLength(3)])],
      question: [this.question, Validators.compose([Validators.required, Validators.minLength(15)])]
    })
    this.smsSent = false
    firebase.auth().languageCode = 'en';
    this.registrationForm = formBuilder.group({
      number: [this.number, Validators.compose([Validators.required])]
    })

    this.checkAuthState()
  }
  check(){
    // console.log(this.questionsForm.get('name').setValue('dfsfsdf'))
  }
  submitQuestion(){
    
    this.email = this.questionsForm.get('email').value
    this.name = this.questionsForm.get('name').value
    this.question = this.questionsForm.get('question').value
    let emailArray : Array<any> = []
    let index
    let dotsCount : number = 0
    for(let i in this.email){
      emailArray.push(this.email[i])
    }
    index = emailArray.indexOf('@')
    for(let i = index; i< emailArray.length; i++){
      if(emailArray[i]=== '.'){
        dotsCount = dotsCount + 1
      }
    }
    console.log(dotsCount);

    if(dotsCount > 2){
      alert('Email format is incorrect')

    }else if(dotsCount < 2){
      this.questionsService.submitQuestion(this.name, this.email, this.question).then(result => {
      if(result === 'success'){
        console.log('submitted');
        alert('Submitted')
        this.email = ''
        this.name = ''
        this.question = ''
        this.questionsForm.get('name').setValue('')
        this.questionsForm.get('email').setValue('')
        this.questionsForm.get('question').setValue('')
      }
    })
    }

  }
  updateAnswer(item, event){
    let index = this.questionsArray.indexOf(item)
    console.log(index);
    this.questionsArray[index].data.answer = event.target.value
    
  }
  submitAnswer(item){
    return this.questionsService.submitAnswer(item.docRef, item.data.question, item.data.name, item.data.email, item.data.answer).then(result => {
      console.log(result);
      if(result === 'success'){

      }else if(result === 'error'){

      }
      
    })
  }

  getQuestions(){
    return this.questionsService.retrieveQuestions().then(result => {
      this.questionsArray = result
      console.log(this.questionsArray);
      
    })
  }

  autoComplete(query){
    if(query === ' ' || query === '  ' || query === '   '){
      this.usersInput = ''
    }
    if(query !== '' || query !== ' '){
      if(query === '*'){
        
      }else if(query !== '*'){
        
      }
    }
  }
  // searchresult(query) {
 
  //   // this.searchArray = []
  // }
  filterItems(query, array) {
    let queryFormatted = query.toLowerCase();
    // console.log(queryFormatted);
    // console.log(array);
    if(queryFormatted !== '' && queryFormatted !== '*'){
      let answerResult = array.filter(item => item.data.answer.toLowerCase().indexOf(queryFormatted) >= 0)
      let questionResult = array.filter(item => item.data.question.toLowerCase().indexOf(queryFormatted) >= 0)
      console.log(answerResult);
      console.log(questionResult);
      let returnResult
      let addToReturn : boolean
      returnResult = answerResult
      if(returnResult.length === 0){
        returnResult = questionResult
      }
      for(let i in questionResult){
        addToReturn = false
        for(let key in returnResult){
          if(returnResult[key].docRef !== questionResult[i].docRef){
            console.log(returnResult[key].docRef);
            
            addToReturn = true
          }else if(returnResult[key].docRef === questionResult[i].docRef){
            addToReturn = false
            break
          }
        }
        if(addToReturn === true){
          returnResult.push(questionResult[i])
        }
      }
      console.log('ideas are flowing');
      
      let addBrand: boolean
      let addCategory: boolean
      let addName: boolean
      addName = false
      addCategory = false
      addBrand = false
      //// console.log(brandResult);
      //// console.log(categoryResult);
      // console.log(nameResult);
      this.searchArray = returnResult
    }else if(queryFormatted === '*'){
    this.searchArray = this.answeredQuestions
    }
    console.log(this.searchArray);
    
  }

  getFAQs(){
    return this.questionsService.retrieveAnsweredQuestions().then(result => {
      this.answeredQuestions = result
      console.log(this.answeredQuestions);
      
    })
  }
  googleSignIn() {
    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential;
      // The signed-in user info.
      var user = result.user
      console.log(user);

      // ...
    }).catch(function (error) {
      // Handle Errors here.
      console.log(error);

      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  requestCode() {
    this.number = this.registrationForm.get('number').value
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    console.log(window.recaptchaVerifier);
    let appVerifier = window.recaptchaVerifier
    return this.authService.requestLogin(this.number, appVerifier).then(result => {
      if (result.success === true) {
        console.log(result);
        this.confirmationResult = result.result
        console.log(this.confirmationResult);
        //this.presentAlert();
      }
    })
  }
  login(code) {
    if (this.confirmationResult !== '') {
      //var code = this.inputCode
      return this.authService.login(code, this.confirmationResult).then(result => {
        console.log(result);
      })
    }
  }

  addUser() {
    this.number = this.registrationForm.get('number').value
    console.log(this.number);
    let array: Array<any> = this.number.split('')
    console.log(array);
    let countryCode = '+27'
    if (array[0] === '0') {
      array.splice(0, 1)
      this.number = countryCode + array.join('')
      console.log(this.number);

    }
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        console.log('yeah yeah yeah');
      },
      'expired-callback': error => {
      }
    });
    console.log(window.recaptchaVerifier);
    let appVerifier = window.recaptchaVerifier
    return this.authService.requestLogin(this.number, appVerifier).then(result => {
      if (result.success === true) {
        console.log(result);
        this.confirmationResult = result.result
        console.log(this.confirmationResult);
        this.alert()
      }
    })
    // window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(recaptchaParameters, result => {
    //   console.log(result);

    // })


  }
  async alert() {
    const alert = await this.alertController.create({
      header: 'Verfification code',
      subHeader: 'Enter verification code',
      inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: 'Enter code'
        }],
      buttons: [{
        text: 'Submit',
        role: 'submit',
        cssClass: 'secondary',
        handler: (result) => {
          console.log(result.code);
          this.login(result.code)
        }
      }]
    });

    await alert.present();
  }
  changeTab(event) {
    this.loc.go('/home/' + event)
    this.toggleTab(event)
  }
  // changeTabs(event){
  //   this.loc.replaceState('/' + event)
  // }
  // changeTab2(event){
  //   this.loc.go(['/home/'] + event)
  // }
  // changeTab3(event){
  //   this.loc.go('/home/' + event)
  // }

  activeTab: string = ''
  makeBold = "";
  toggleTab(selectedTab) {
    this.activeTab = selectedTab;
    // console.log(this.activeTab);
    this.menuDrawer = 1;
    this.toggleSideMenu()
    this.makeBold = "makeBold";
    // console.log(this.makeBold);
    if(selectedTab === "FAQs"){
      document.getElementById("one").style.fontWeight = "bold"
      document.getElementById("two").style.fontWeight = "500"
      document.getElementById("three").style.fontWeight = "500"
      document.getElementById("four").style.fontWeight = "500"
      document.getElementById("five").style.fontWeight = "500"
    }
    else if(selectedTab === "Terms and Privacy Policy"){
      document.getElementById("one").style.fontWeight = "500"
      document.getElementById("two").style.fontWeight = "bold"
      document.getElementById("three").style.fontWeight = "500"
      document.getElementById("four").style.fontWeight = "500"
      document.getElementById("five").style.fontWeight = "500"
    }
    else if(selectedTab === "Payment Process"){
      document.getElementById("one").style.fontWeight = "500"
      document.getElementById("two").style.fontWeight = "500"
      document.getElementById("three").style.fontWeight = "bold"
      document.getElementById("four").style.fontWeight = "500"
      document.getElementById("five").style.fontWeight = "500"
    }
    else if(selectedTab === "About Company"){
      document.getElementById("one").style.fontWeight = "500"
      document.getElementById("two").style.fontWeight = "500"
      document.getElementById("three").style.fontWeight = "500"
      document.getElementById("four").style.fontWeight = "bold"
      document.getElementById("five").style.fontWeight = "500"
    }
    else if(selectedTab === "Disclaimer"){
      document.getElementById("one").style.fontWeight = "500 "
      document.getElementById("two").style.fontWeight = "500"
      document.getElementById("three").style.fontWeight = "500"
      document.getElementById("four").style.fontWeight = "500"
      document.getElementById("five").style.fontWeight = "bold"
    }
    

  }
  usersInput: string;
  searchresult(query) {
    // console.log(usersinput);
    console.log(query);

    
    this.filterItems(query, this.answeredQuestions)
    console.log(this.answeredQuestions);
    this.changingValue()
  }

  admin;
  checkAuthState() {
    return this.authService.checkingAuthStateHome().then(result => {
      if (result !== null) {
        console.log(result);
        if (result['uid']) {
          console.log(result['uid']);
          return this.authService.getProfile(result['uid']).then(result => {
            console.log(result);
            this.admin = result
            if(result === true){
              this.getQuestions()
              this.getFAQs()
            }
          })
          // this.navCtrl.navigate(['/landing'])
        }
      }else if(result === null){
        this.getFAQs()
      }
    })
  }
  goHome() {
    return this.authService.checkingAuthStateHome().then(result => {
      if (result === null) {
        location.reload()
      }
      else if (result !== null) {
        console.log(result);
        if (result['uid']) {
          console.log(result['uid']);
          this.navCtrl.navigate(['/landing'])
        }
      }
    })
  }
  myMenu = "menu"
  menuDrawer = 0;
  toggleSideMenu() {
    var mySide = document.getElementById("side-menu");
    if (this.menuDrawer == 0) {
      this.myMenu = "close"
      this.menuDrawer = 1
      mySide.style.left = "0%"
    }
    else {
      this.myMenu = "menu"
      this.menuDrawer = 0
      mySide.style.left = "-100%"
    }
  }

  goAway(){
    //  Removes the search results
    //  alert("clicked")
    if(document.getElementById("userSearchResults")){
      document.getElementById("userSearchResults").style.display = "none"
    }

  }
  changingValue(){
    // alert("Changing")
    if(document.getElementById("userSearchResults")){
      document.getElementById("userSearchResults").style.display = "block"
    }

    // Calls back the search results
  }

  onInput(e) {
    console.log(e)
  }

  showQA: boolean = false;
  asnwerQuestions() {
    this.showQA = true;
  }
  askUs() {
    this.showQA = true;
  }
  close_query() {
    document.getElementById("disappear").style.animation = "faderOut 299ms"
    setTimeout(() => {
      this.showQA = false;
    }, 299);
  }
  ngOnInit(){
    this.questionsSnap()
    this.answersSnap()
    this.writeToUpdates()
  }
  questionsSnap(){
    firebase.firestore().collection('FAQs').onSnapshot(result => {
      console.log(result)
      let questions : Array<any> = []
      let addItem : boolean
      let docRef
      let data
      for(let key in result.docChanges()){
        let change = result.docChanges()[key]
        if(change.type === 'removed'){
          let id = change.doc.id
          console.log(id);
          console.log('removed');
          
          for(let j in this.questionsArray){
            if(id === this.questionsArray[j].docRef){
              this.questionsArray.splice(Number(j), 1)
            }
          }
        }else if(change.type === 'added'){
          console.log('added');
          
          docRef = change.doc.id
          data = change.doc.data()
          questions.push({data: data, docRef: docRef})
          console.log(questions);
          
        }
      }
      for(let key in questions){
        if(this.questionsArray.length === 0){
          addItem = true
        }
        for(let j in this.questionsArray){
          if(questions[key].docRef === this.questionsArray[j].docRef){
            addItem = false
            break
          }else if(questions[key].docRef !== this.questionsArray[j].docRef){
            addItem = true
          }
        }
        if(addItem === true){
          this.questionsArray.push(questions[key])
        }
      }
      console.log(this.questionsArray);
      
    })
  }
  answersSnap(){
    firebase.firestore().collection('AnsweredQuestions').onSnapshot(result => {
      console.log(result);
      
      let answers : Array<any> = []
      let docRef 
      let data
      let addItem : boolean
      for(let key in result.docChanges()){
        let change = result.docChanges()[key]
        if(change.type === 'added'){
          docRef = change.doc.id
          data = change.doc.data()
          answers.push({docRef: docRef, data: data})
          console.log('added');
          
        }else if(change.type === 'modified'){
          console.log('modified');
          
        }
      }
      console.log(answers);
      console.log(this.answeredQuestions);
      
      
      for(let key in answers){
        for(let j in this.answeredQuestions){
          if(answers[key].docRef === this.answeredQuestions[j]){
            addItem = false
            break
          }else if(answers[key].docRef !== this.answeredQuestions[j]){
            addItem = true
          }
        }
        if(addItem === true){
          this.answeredQuestions.push(answers[key])
        }
      }
    })
  }
  writeToUpdates(){
    firebase.firestore().collection('Updates').add({
      timestamp: new Date().getTime()
    })
  }
}
