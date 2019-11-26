import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingOrderPageRoutingModule } from './pending-order-routing.module';

import { PendingOrderPage } from './pending-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingOrderPageRoutingModule
  ],
  declarations: [PendingOrderPage]
})
export class PendingOrderPageModule {}
