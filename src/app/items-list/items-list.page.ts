import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.page.html',
  styleUrls: ['./items-list.page.scss'],
})
export class ItemsListPage implements OnInit {

  promoUdpate: string;
  constructor() { }

  ngOnInit() {
  }

  toggleUpdate() {
    var promoUpd = document.getElementsByClassName("del-upd-del") as HTMLCollectionOf<HTMLElement>;

    promoUpd[0].style.display = "flex";
    this.promoUdpate = "Update item"
  }
  togglePromo() {
    var promoUpd = document.getElementsByClassName("del-upd-del") as HTMLCollectionOf<HTMLElement>;

    promoUpd[0].style.display = "flex";
    this.promoUdpate = "Promote item"
  }
  dismissPromo() {
    var promoUpd = document.getElementsByClassName("del-upd-del") as HTMLCollectionOf<HTMLElement>;

    promoUpd[0].style.display = "none"
  }

  showPendingList(){
    var historyItems = document.getElementsByClassName("pending-items") as HTMLCollectionOf <HTMLElement>;
    historyItems[0].style.display = "block"
  }
  showHistoryList(){
    var pendingItems = document.getElementsByClassName("history-items") as HTMLCollectionOf <HTMLElement>;
    pendingItems[0].style.display = "block"
  }
  showInventoryList(){
    var inventoryItems = document.getElementsByClassName("inventory-items") as HTMLCollectionOf <HTMLElement>;
    inventoryItems[0].style.display = "block"
  }
  dismissList(){
    var historyItems = document.getElementsByClassName("history-items") as HTMLCollectionOf <HTMLElement>;
    historyItems[0].style.display = "none";
    var pendingItems = document.getElementsByClassName("pending-items") as HTMLCollectionOf <HTMLElement>;
    pendingItems[0].style.display = "none";
    var inventoryItems = document.getElementsByClassName("inventory-items") as HTMLCollectionOf <HTMLElement>;
    inventoryItems[0].style.display = "none"

  }
}
