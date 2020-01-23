import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth-services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService : AuthService, private router : Router){

  }

  canActivate() : boolean{
    //let boolean : boolean
    this.authService.checkingAuthState()
    if(this.authService.checkingAuthStateBoolean()){
      console.log(true);
      return true
      
    }else{
      console.log(false);
      return false
      
    }
  
    
  
  }




// canActivate() : boolean {
//   let boolean : boolean
//   this.authService.checkingAuthStateBoolean().then(result => {
//     if(result){
//       console.log(true);
//       boolean = true
//       console.log(boolean);
      
      
//     }else{
//       console.log(false);
//       boolean = false
//       console.log(boolean);
      
      
//     }
//     console.log(boolean);
// return boolean

//   }).then(result => {
//     return boolean
//   })

  

// }


}
