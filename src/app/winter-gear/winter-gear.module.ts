import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WinterGearPageRoutingModule } from './winter-gear-routing.module';

import { WinterGearPage } from './winter-gear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WinterGearPageRoutingModule
  ],
  declarations: [WinterGearPage]
})
export class WinterGearPageModule {}
