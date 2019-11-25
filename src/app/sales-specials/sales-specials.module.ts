import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesSpecialsPageRoutingModule } from './sales-specials-routing.module';

import { SalesSpecialsPage } from './sales-specials.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesSpecialsPageRoutingModule
  ],
  declarations: [SalesSpecialsPage]
})
export class SalesSpecialsPageModule {}
