import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-summer-gear',
  templateUrl: './summer-gear.page.html',
  styleUrls: ['./summer-gear.page.scss'],
})
export class SummerGearPage implements OnInit {

  constructor(private navCtrl : NavController) { }

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
