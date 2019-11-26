import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products-services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sales-specials',
  templateUrl: './sales-specials.page.html',
  styleUrls: ['./sales-specials.page.scss'],
})
export class SalesSpecialsPage implements OnInit {
  query
  constructor(public productService : ProductsService, public activatedRoute : ActivatedRoute) {

  }

  ngOnInit() {
    this.query = this.activatedRoute.snapshot.paramMap.get('query')
    console.log(this.query);
    this.viewSales()
  }
  viewSales(){
    return this.productService.getSales(this.query).then(result => {
      console.log(result);
      for(let key in result){
        let sales = result
        console.log(sales);
      }

    })
  }
}
