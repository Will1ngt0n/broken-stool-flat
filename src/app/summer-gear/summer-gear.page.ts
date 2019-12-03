import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-summer-gear',
  templateUrl: './summer-gear.page.html',
  styleUrls: ['./summer-gear.page.scss'],
})
export class SummerGearPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

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
  loadItems(value) {
    console.log(value);
    //let parameter = [{category: value, brand: 'Kwanga'}]
    //this.route.navigate(['/items-list', value], parameter)
    let parameter: NavigationExtras = { queryParams: { category: value, brand: 'Dankie Jesu' } }
    this.navCtrl.navigateForward(['/items-list', value], parameter)
  }
}
