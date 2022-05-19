import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BudgetItem } from 'src/shared/models/budget-item.model';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnChanges {
  budgetItems: BudgetItem[] = new Array<BudgetItem>();
  totalBudget = 0;
  public transactionForm: FormGroup;

  constructor(
    public transactionService: CrudService,
    public formBuilder: FormBuilder
  ) {
    this.transactionForm = formBuilder.group({
      amount: [''],
      description: [''],
    });
  }

  ngOnInit() {
    this.transactionService.getTransactions().subscribe((result) => {
      this.budgetItems = result.map((transaction) => {
        return {
          id: transaction.payload.doc.id,
          ...(transaction.payload.doc.data() as {}),
        } as unknown as BudgetItem;
      });
    });
  }

  ngOnChanges() {
    this.calculateTotal;
  }

  addItem(newItem: BudgetItem) {
    this.budgetItems.push(newItem);
    this.calculateTotal();
    this.transactionService.createTransaction(newItem);
  }

  deleteItem(item: BudgetItem) {
    const index = this.budgetItems.indexOf(item);
    this.budgetItems.splice(index, 1);
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalBudget = 0;
    this.budgetItems.forEach((item: BudgetItem) => {
      this.totalBudget += item.amount;
    });
  }
}
