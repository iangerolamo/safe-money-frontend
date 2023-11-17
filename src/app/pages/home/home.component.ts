import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Card } from 'src/app/models/card.model';
import { Table } from 'src/app/models/table.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {
 
  valor = 'R$' 

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
  ]

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
  ]

  transactionForm = this.formBuilder.group({
    purpose: ['', Validators.required],
    category: ['Choose a category', Validators.required],
    sum: [null, Validators.required],
    date: ['', Validators.required],
  })

  constructor(private formBuilder: FormBuilder) {}


  onSubmit(): void {
    if (this.transactionForm.valid) {
    const newTransaction: Table = {
    purpose: this.transactionForm.value.purpose!,
    category: this.transactionForm.value.category!,
    sum: this.transactionForm.value.sum!,
    date: this.transactionForm.value.date!,
    };
    
    this.table.push(newTransaction);
    console.log('Transaction added:', newTransaction);
    this.transactionForm.reset(); // Limpar o formulário após adicionar a transação
    } else {
    console.log('Formulário inválido. Por favor, preencha todos os campos corretamente.');
    }
    }

  


}
