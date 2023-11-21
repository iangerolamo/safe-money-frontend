import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CardModule } from 'src/app/shared/card/card.module';
import { TableModule } from 'src/app/shared/table/table.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionComponent } from 'src/app/shared/transaction/transaction.component';
import { TransactionModule } from 'src/app/shared/transaction/transaction.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    TransactionModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule {

  
 }
