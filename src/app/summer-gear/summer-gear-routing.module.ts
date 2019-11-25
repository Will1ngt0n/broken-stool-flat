import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummerGearPage } from './summer-gear.page';

const routes: Routes = [
  {
    path: '',
    component: SummerGearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SummerGearPageRoutingModule {}
