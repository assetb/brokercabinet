import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuctionListComponent} from './auction/list/auction.list.component';
import {AccountComponent} from './account/account.component';
import {AuctionDetailsComponent} from './auction/details/auction.details.component';
import {MainComponent} from './main/main.component';

const routers: Routes = [
  {path: 'account', component: AccountComponent},
  {
    path: 'main', component: MainComponent, children: [
      {path: 'auction', component: AuctionListComponent},
      {path: 'auction/:id', component: AuctionDetailsComponent},
      {path: '', redirectTo: 'auction', pathMatch: 'full'}
    ]
  },
  {path: '', redirectTo: 'main', pathMatch: 'prefix'}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routers)]
})
export class AppRoutingModule {
}
