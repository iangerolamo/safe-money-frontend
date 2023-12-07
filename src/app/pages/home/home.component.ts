import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Card } from 'src/app/models/card.model';
import { Table } from 'src/app/models/table.model';
import { BalanceService } from 'src/app/services/balance/balance.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  valor = 'R$';
  selectedMonth!: number;

  cards: Card[] = [
    {
      title: 'Balance',
      amount: 0,
      icon: '../../../assets/piggy-bank.png',
      color: '#22c55e',
    },
    {
      title: 'Shopping',
      amount: 0,
      icon: '../../../assets/shopping-cart.png',
      color: '#06b6d4',
    },
    {
      title: 'Food & Drinks',
      amount: 0,
      icon: '../../../assets/meal.png',
      color: '#eab308',
    },
    {
      title: 'Bills & Utilities',
      amount: 0,
      icon: '../../../assets/bill_c.png',
      color: '#ef4444',
    },
    {
      title: 'Others',
      amount: 0,
      icon: '../../../assets/travel.png',
      color: '#0c0a09',
    },
  ];

  table: Table[] = [
    
  ];

  constructor(
    private formBuilder: FormBuilder,
    private balanceService: BalanceService,
    private transactionService: TransactionService
  ) {
    this.selectedMonth = 0
  }

  onSelectMonth() {

    this.balanceService.getBalanceByMonth(this.selectedMonth).subscribe(
      (data) => {
        // Lide com os dados recebidos do backend.

        if (data && data.length > 0) {
          this.cards.forEach((card, index) => {
            card.amount = data[index].amount
          })
        }

      },
      (error) => {
        // Lide com erros.
        console.error('Error fetching transactions:', error);
      }
    );

    this.transactionService.getTransactionByMonth(this.selectedMonth).subscribe(
      (data) => {

        this.table = [];

        for (let i = 0; i < data.length; i++) {
          let table: Table = {
            purpose: data[i].title,
            category: data[i].category,
            sum: data[i].amount,
            date: data[i].data
          }
          this.table.push(table);
        }
      
      }
    )
  }
}
