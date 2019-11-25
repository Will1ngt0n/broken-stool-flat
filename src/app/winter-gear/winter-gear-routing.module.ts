import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WinterGearPage } from './winter-gear.page';

const routes: Routes = [
  {
    path: '',
    component: WinterGearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WinterGearPageRoutingModule {}
