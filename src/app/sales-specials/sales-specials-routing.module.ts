import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesSpecialsPage } from './sales-specials.page';

const routes: Routes = [
  {
    path: '',
    component: SalesSpecialsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesSpecialsPageRoutingModule {}
