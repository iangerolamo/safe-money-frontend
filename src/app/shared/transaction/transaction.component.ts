import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { Card } from 'src/app/models/card.model';
import { Table } from 'src/app/models/table.model';
import { Transaction } from 'src/app/models/transaction.model';
import { BalanceService } from 'src/app/services/balance/balance.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  @Input()
  table!: Table[];

  @Input()
  cards!: Card[];

  newCard: Card[] = [];

  transactionForm = this.formBuilder.group({
    purpose: ['', Validators.required],
    category: ['Choose a category', Validators.required],
    sum: [null, Validators.required],
    date: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private balanceService: BalanceService
  ) {}

  ngOnInit() {
    this.updateCard();
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const newTransaction: Table = {
        purpose: this.transactionForm.value.purpose!,
        category: this.transactionForm.value.category!,
        sum: this.transactionForm.value.sum!,
        date: this.transactionForm.value.date!,
      };

      const requestTransaction: Transaction = {
        title: this.transactionForm.value.purpose!,
        category: this.transactionForm.value.category!,
        amount: this.transactionForm.value.sum!,
        data: this.converterFormatoData(this.transactionForm.value.date!)
      }

      console.log(requestTransaction);

      console.log(this.converterFormatoData(this.transactionForm.value.date!))

      this.transactionService.createTransaction(requestTransaction).subscribe();

      this.table.push(newTransaction);
      console.log('Transaction added:', newTransaction);
      this.updateCard();

      this.transactionForm.reset(); // Limpar o formulário após adicionar a transação
    } else {
      console.log(
        'Formulário inválido. Por favor, preencha todos os campos corretamente.'
      );
    }
  }

  updateCard() {
    let others = 0;
    let foodDrinks = 0;
    let billsUtilities = 0;
    let shopping = 0;
    let revenue = 0;
    let balance = 0;

    for (let item of this.table) {
      if (item.category === 'Others') {
        others += Number(item.sum);
      }
      if (item.category === 'Food & Drinks') {
        foodDrinks += Number(item.sum);
      }
      if (item.category === 'Bills & Utilities') {
        billsUtilities += Number(item.sum);
      }
      if (item.category === 'Shopping') {
        shopping += Number(item.sum);
      }
      if (item.category === 'Revenue') {
        revenue += Number(item.sum);
      }
    }

    balance = revenue - shopping - billsUtilities - foodDrinks - others;

    this.newCard = this.cards.map((item) => {
      if (item.title === 'Others') {
        item.amount = others;
      }
      if (item.title === 'Food & Drinks') {
        item.amount = foodDrinks;
      }
      if (item.title === 'Bills & Utilities') {
        item.amount = billsUtilities;
      }
      if (item.title === 'Shopping') {
        item.amount = shopping;
      }
      if (item.title === 'Balance') {
        item.amount = balance;
      }
      return item;
    });

    console.log(others);
  }

  converterFormatoData(dataString: string): string {
    const dataFormatada = format(new Date(dataString), 'dd-MM-yyyy');
    return dataFormatada;
  }
}
