import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderReceiptPageRoutingModule } from './order-receipt-routing.module';

import { OrderReceiptPage } from './order-receipt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderReceiptPageRoutingModule
  ],
  declarations: [OrderReceiptPage]
})
export class OrderReceiptPageModule {}
