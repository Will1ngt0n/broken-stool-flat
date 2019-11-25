import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KwangaSubCategoriesPageRoutingModule } from './kwanga-sub-categories-routing.module';

import { KwangaSubCategoriesPage } from './kwanga-sub-categories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KwangaSubCategoriesPageRoutingModule
  ],
  declarations: [KwangaSubCategoriesPage]
})
export class KwangaSubCategoriesPageModule {}
