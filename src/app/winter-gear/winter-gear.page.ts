import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-winter-gear',
  templateUrl: './winter-gear.page.html',
  styleUrls: ['./winter-gear.page.scss'],
})
export class WinterGearPage implements OnInit {

  constructor(private navCtrl : NavController ) { }

  ngOnInit() {
  }
  loadItems(value){
    console.log(value);
    //let parameter = [{category: value, brand: 'Kwanga'}]
    //this.route.navigate(['/items-list', value], parameter)
    let parameter : NavigationExtras = {queryParams : {category: value, brand: 'Dankie Jesu'}}
    this.navCtrl.navigateForward(['/items-list', value], parameter)
  }
}
