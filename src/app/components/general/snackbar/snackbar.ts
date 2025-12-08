import { Component, Inject, inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
@Component({
  selector: 'app-snackbar',
  imports: [
  ],
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.scss'
})
export class Snackbar {
  snackBarRef = inject(MatSnackBarRef);
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {
  }
}
