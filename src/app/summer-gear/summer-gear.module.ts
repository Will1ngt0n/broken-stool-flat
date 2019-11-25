import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SummerGearPageRoutingModule } from './summer-gear-routing.module';

import { SummerGearPage } from './summer-gear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SummerGearPageRoutingModule
  ],
  declarations: [SummerGearPage]
})
export class SummerGearPageModule {}
