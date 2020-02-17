import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor() { }
  getUID() {
    let boolean : boolean
    return new Promise( (resolve, reject) => {
      this.pingID().then((result : any) => {
        console.log(result);
        
        boolean = result
        resolve (boolean)
      })

    })
 
  }

  pingID(){
    return new Promise( (resolve, reject) => {
      let boolean : boolean
      firebase.auth().onAuthStateChanged((user) =>{
      if(user){
        if(user.uid){
          console.log(user.uid);
          resolve (true)
        }else {
          resolve (false)
        }
      }else {
        resolve (false)
      }
      })
    })
  }
}
