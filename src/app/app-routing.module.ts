import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) },
  { path: 'add-items', loadChildren: () => import('./add-items/add-items.module').then( m => m.AddItemsPageModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule) },
  { path: 'landing', loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule) },
  { path: 'sales-specials', loadChildren: () => import('./sales-specials/sales-specials.module').then( m => m.SalesSpecialsPageModule) },
  { path: 'kwanga-sub-categories', loadChildren: () => import('./kwanga-sub-categories/kwanga-sub-categories.module').then( m => m.KwangaSubCategoriesPageModule) },{ path: 'summer-gear', loadChildren: () => import('./summer-gear/summer-gear.module').then( m => m.SummerGearPageModule) },
  { path: 'winter-gear', loadChildren: () => import('./winter-gear/winter-gear.module').then( m => m.WinterGearPageModule) },
  { path: 'items-list/:id', loadChildren: () => import('./items-list/items-list.module').then( m => m.ItemsListPageModule) },
  { path: 'sign-in', loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule) },
  { path: 'order-receipt', loadChildren: () => import('./order-receipt/order-receipt.module').then( m => m.OrderReceiptPageModule) },
  { path: 'pending-order', loadChildren: () => import('./pending-order/pending-order.module').then( m => m.PendingOrderPageModule) },
  { path: '**', redirectTo: 'landing', pathMatch: 'full' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }