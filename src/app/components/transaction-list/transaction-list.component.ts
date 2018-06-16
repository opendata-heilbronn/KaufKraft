import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { User } from 'firebase/app';
import { TransactionModel } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  user: User;
  transactions: TransactionModel[] = [];

  constructor(
    private db: AngularFireDatabase,
    private auth: AngularFireAuth) { }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      if (user == null) {
        this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
          return;
      }

      this.user = user;
    });

    this.db.object('transactions').valueChanges().subscribe((result: TransactionModel[]) => {
      this.transactions = Object.keys(result).map(key => {
        var elem = result[key];
        elem.$key = key;
        return elem;
      });
    });
  }

}
