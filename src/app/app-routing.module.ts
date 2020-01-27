import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './services/auth-guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'home/:id', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),},
  { path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule) },
  { path: 'landing', loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule),  canActivate: [AuthGuard] },
  { path: 'sales-specials', loadChildren: () => import('./sales-specials/sales-specials.module').then( m => m.SalesSpecialsPageModule),  canActivate: [AuthGuard]  },
  { path: 'kwanga-sub-categories', loadChildren: () => import('./kwanga-sub-categories/kwanga-sub-categories.module').then( m => m.KwangaSubCategoriesPageModule),  canActivate: [AuthGuard]  },
  { path: 'summer-gear', loadChildren: () => import('./summer-gear/summer-gear.module').then( m => m.SummerGearPageModule),  canActivate: [AuthGuard]  },
  { path: 'winter-gear', loadChildren: () => import('./winter-gear/winter-gear.module').then( m => m.WinterGearPageModule),  canActivate: [AuthGuard]  },
  { path: 'items-list/:id', loadChildren: () => import('./items-list/items-list.module').then( m => m.ItemsListPageModule),  canActivate: [AuthGuard]  },
  { path: 'sign-in', loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule),  canActivate: [AuthGuard]  },
  { path: 'order-receipt', loadChildren: () => import('./order-receipt/order-receipt.module').then( m => m.OrderReceiptPageModule),  canActivate: [AuthGuard]  },
  { path: 'pending-order', loadChildren: () => import('./pending-order/pending-order.module').then( m => m.PendingOrderPageModule),  canActivate: [AuthGuard]  },
  // { path: '**', redirectTo: 'login', pathMatch: 'full' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }