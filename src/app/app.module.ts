import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {AuctionListComponent} from './auction/list/auction.list.component';
import {AppRoutingModule} from './app.routing.module';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiInterceptor} from './shared/api.interceptor';
import {AccountComponent} from './account/account.component';
import {AccountService} from './account/account.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ContextService} from './shared/context.service';
import localeRuKz from '@angular/common/locales/ru-KZ';
import localeRuKzExtra from '@angular/common/locales/extra/ru-KZ';
import {CommonModule, registerLocaleData} from '@angular/common';
import {AuctionDetailsComponent} from './auction/details/auction.details.component';
import {AppMaterialModule} from './app.material.module';
import {MainComponent} from './main/main.component';
import {ApiService} from './shared/api.service';
import {LotComponent} from './lot/list/lot.list.component';
import {SupplierOrderListComponent} from './supplier.order/list/supplier.order.list.component';
import {ApplicantListComponent} from './applicant/list/applicant.list.component';
import {ProcuratoryListComponent} from './procuratory/list/procuratory.list.component';


registerLocaleData(localeRuKz, 'ru-KZ', localeRuKzExtra);

export function appInit(contextService: ContextService) {
  return () => new Promise((resolve, reject) => {
    contextService.update();
    resolve();
  });
}

@NgModule({
  exports: [RouterModule],
  declarations: [
    AppComponent,
    MainComponent,
    ToolbarComponent,
    AuctionListComponent,
    AccountComponent,
    AuctionDetailsComponent,
    LotComponent,
    SupplierOrderListComponent,
    ApplicantListComponent,
    ProcuratoryListComponent
  ],
  imports: [
    AppMaterialModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    ApiService,
    AccountService,
    ContextService,
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      deps: [ContextService],
      multi: true
    },
    {provide: LOCALE_ID, useValue: 'ru-KZ'}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
