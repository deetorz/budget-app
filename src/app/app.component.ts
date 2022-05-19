import { Component } from '@angular/core';
import { FirestoreModule } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'budget-app';
  constructor(private dialog: MatDialog, private store: FirestoreModule) {}
}
