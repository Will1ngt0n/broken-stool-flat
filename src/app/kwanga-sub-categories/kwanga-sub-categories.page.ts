import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-kwanga-sub-categories',
  templateUrl: './kwanga-sub-categories.page.html',
  styleUrls: ['./kwanga-sub-categories.page.scss'],
})
export class KwangaSubCategoriesPage implements OnInit {
  //currentCategory
  constructor(private route : Router, private navCtrl : NavController) { }

  ngOnInit() {
  
  }
  loadItems(value){
    console.log(value);
    //let parameter = [{category: value, brand: 'Kwanga'}]
    //this.route.navigate(['/items-list', value], parameter)
    let parameter : NavigationExtras = {queryParams : {category: value, brand: 'Kwanga'}}
    this.navCtrl.navigateForward(['/items-list', value], parameter)
  }
}
