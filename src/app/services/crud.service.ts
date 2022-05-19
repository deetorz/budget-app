import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BudgetItem } from 'src/shared/models/budget-item.model';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private angularFirestore: AngularFirestore) {}

  getTransaction(id: string | undefined) {
    return this.angularFirestore
      .collection('Transactions')
      .doc(id)
      .valueChanges();
  }
  getTransactions() {
    return this.angularFirestore.collection('Transactions').snapshotChanges();
  }
  createTransaction(transaction: BudgetItem) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection('Transactions')
        .add(transaction)
        .then(
          (response) => {
            console.log(response);
          },
          (error) => reject(error)
        );
    });
  }
  deleteTransaction(transaction: any) {
    return this.angularFirestore
      .collection('Transactions')
      .doc(transaction.id)
      .delete();
  }
  updateTransaction(transaction: BudgetItem, id: any) {
    return this.angularFirestore.collection('Transactions').doc(id).update({
      description: transaction.description,
      amount: transaction.amount,
    });
  }
}
