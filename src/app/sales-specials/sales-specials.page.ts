import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-specials',
  templateUrl: './sales-specials.page.html',
  styleUrls: ['./sales-specials.page.scss'],
})
export class SalesSpecialsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toggleDankie(){
    var kwa = document.getElementById("kwanga").style.background = "white";
    var kwa = document.getElementById("kwanga").style.color = "#7c0000";
    var kwaCat = document.getElementById("kwangaSubcat").style.display = "none";

    var dan = document.getElementById("dankie").style.background = "#7c0000";
    var dan = document.getElementById("dankie").style.color = "white";
    var danCat = document.getElementById("DankieSubcat").style.display = "block";

    var allSubs = document.getElementById("allSubs").style.background = "white";
    var allSubs = document.getElementById("allSubs").style.color = "#7c0000";
    var allSubsCat = document.getElementById("AllSubcat").style.display = "none";
   
  }
  toggleKwanga(){
    var kwa = document.getElementById("kwanga").style.background = "#7c0000";
    var kwa = document.getElementById("kwanga").style.color = "white";
    var kwaCat = document.getElementById("kwangaSubcat").style.display = "block";

    var dan = document.getElementById("dankie").style.background = "white";
    var dan = document.getElementById("dankie").style.color = "#7c0000";
    var danCat = document.getElementById("DankieSubcat").style.display = "none";

    var allSubs = document.getElementById("allSubs").style.background = "white";
    var allSubs = document.getElementById("allSubs").style.color = "#7c0000";
    var allSubsCat = document.getElementById("AllSubcat").style.display = "none";

  }
  toggleAll(){
    var kwa = document.getElementById("kwanga").style.background = "white";
    var kwa = document.getElementById("kwanga").style.color = "#7c0000";
    var kwaCat = document.getElementById("kwangaSubcat").style.display = "none";

    var dan = document.getElementById("dankie").style.background = "white";
    var dan = document.getElementById("dankie").style.color = "#7c0000";
    var danCat = document.getElementById("DankieSubcat").style.display = "none";
    
    var allSubs = document.getElementById("allSubs").style.background = "#7c0000";
    var allSubs = document.getElementById("allSubs").style.color = "white";
    var allSubsCat = document.getElementById("AllSubcat").style.display = "block";

  }

}
