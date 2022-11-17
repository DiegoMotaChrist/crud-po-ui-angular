import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { SharedModule } from './shared/shared.module';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClientJsonpModule, HttpClient } from '@angular/common/http';

import localeFr from '@angular/common/locales/it-VA';
import localeEs from '@angular/common/locales/es';
import localeUS from '@angular/common/locales/en-US-POSIX';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { DynamicLocaleId } from './translate/DynamicLocaleId';
import { CustomerProvider } from './providers/customer/customer.provider';
import {AddressProvider } from './providers/Endereco/address.provider';
import {CompanyProvider } from './providers/Empresa/company.provider';
import { PoModalModule, PoModalComponent } from '@po-ui/ng-components';
import { CustomerFormComponent } from './components/customer/customer-form/customer-form.component';
import { FormProvider } from './providers/form/form.provider';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';

registerLocaleData(localeFr, 'it');
registerLocaleData(localeEs, 'es');
registerLocaleData(localeUS, 'us');

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    PoModalModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientJsonpModule,
    ModalModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: LOCALE_ID, useClass: DynamicLocaleId },
    { provide: CustomerProvider, useClass: CustomerProvider },
    { provide: CustomerFormComponent, useClass: CustomerFormComponent },
    { provide: CustomerListComponent, useClass: CustomerListComponent },
    { provide: FormProvider, useClass: FormProvider },
    { provide: AddressProvider, useClass: AddressProvider },
    { provide: CompanyProvider, useClass: CompanyProvider },
    { provide: PoModalComponent, useClass: PoModalComponent }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }