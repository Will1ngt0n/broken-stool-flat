import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-services/auth.service';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.page.html',
  styleUrls: ['./add-items.page.scss'],
})
export class AddItemsPage implements OnInit {
  department = ''
  
  constructor(public route : Router, public authService : AuthService) {
    // this.authService.checkingAuthState().then( (result : any) => {
    //   let user : any = result
    //   if (user === null){
    //     this.route.navigate(['/login'])
    //   }
    // })
    console.log(this.department);
    
  }
  options(event){
    console.log(event.detail.value);
    this.department = event.detail.value
  }
  ngOnInit() {
  }

  addItem(){
    this.route.navigate(['/'])
  }
}
