import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './pages/home/home.module';
import { LoginModule } from './pages/login/login.module';
import { RegistrationModule } from './pages/registration/registration.module';
import { CardModule } from './shared/card/card.module';
import { HeaderModule } from './shared/header/header.module';
import { TableModule } from './shared/table/table.module';
import { TransactionModule } from './shared/transaction/transaction.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    LoginModule,
    RegistrationModule,
    HeaderModule,
    CardModule,
    TableModule,
    TransactionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
