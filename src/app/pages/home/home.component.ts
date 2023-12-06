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
      amount: 10000,
      icon: '../../../assets/piggy-bank.png',
      color: '#22c55e',
    },
    {
      title: 'Shopping',
      amount: 60000,
      icon: '../../../assets/shopping-cart.png',
      color: '#06b6d4',
    },
    {
      title: 'Food & Drinks',
      amount: 60000,
      icon: '../../../assets/meal.png',
      color: '#eab308',
    },
    {
      title: 'Bills & Utilities',
      amount: 60000,
      icon: '../../../assets/bill_c.png',
      color: '#ef4444',
    },
    {
      title: 'Others',
      amount: 60000,
      icon: '../../../assets/travel.png',
      color: '#0c0a09',
    },
  ];

  table: Table[] = [
    {
      purpose: 'Salary',
      category: 'Revenue',
      sum: 2999,
      date: '30/10/2023',
    },
    {
      purpose: 'Chocolate',
      category: 'Food & Drinks',
      sum: 10,
      date: '29/10/2023',
    },
    {
      purpose: 'Eletricity',
      category: 'Bills & Utilities',
      sum: 59,
      date: '25/10/2023',
    },
    {
      purpose: 'Fuel',
      category: 'Bills & Utilities',
      sum: 100,
      date: '30/10/2023',
    },
    {
      purpose: 'Travel',
      category: 'Others',
      sum: 200,
      date: '25/10/2023',
    },
    {
      purpose: 'Shopping',
      category: 'Shopping',
      sum: 100,
      date: '30/10/2023',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private balanceService: BalanceService,
    private transactionService: TransactionService
  ) {}

  onSelectMonth() {

    this.balanceService.getBalanceByMonth(this.selectedMonth).subscribe(
      (data) => {
        // Lide com os dados recebidos do backend.

        if (data && data.length > 0) {
          this.cards.forEach((card, index) => {
            card.amount = data[index].amount
          })
        }
        console.log(data)
      },
      (error) => {
        // Lide com erros.
        console.error('Error fetching transactions:', error);
      }
    );

    this.transactionService.getTransactionByMonth(this.selectedMonth).subscribe(
      (data) => {

        if (data && data.length > 0) {
          this.table.forEach((table, index) => {
            table.category = data[index].category
            table.purpose = data[index].title
            table.sum = data[index].amount
            table.date = data[index].data
          })
        }
      }
    )
  }
}
