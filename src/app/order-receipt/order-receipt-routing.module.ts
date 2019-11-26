import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderReceiptPage } from './order-receipt.page';

const routes: Routes = [
  {
    path: '',
    component: OrderReceiptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderReceiptPageRoutingModule {}
