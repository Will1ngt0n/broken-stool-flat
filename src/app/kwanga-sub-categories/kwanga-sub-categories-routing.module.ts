import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KwangaSubCategoriesPage } from './kwanga-sub-categories.page';

const routes: Routes = [
  {
    path: '',
    component: KwangaSubCategoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KwangaSubCategoriesPageRoutingModule {}
