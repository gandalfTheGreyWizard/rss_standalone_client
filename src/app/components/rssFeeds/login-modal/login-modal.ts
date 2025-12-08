//core package imports
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

//angular material import
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

//dto imports
import { LoginResponse } from '../../../dtos/login-dto';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Snackbar } from '../../general/snackbar/snackbar';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login-modal',
  imports: [
    MatDialogModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.scss'
})
export class LoginModal {
  private _snackbar = inject(MatSnackBar);
  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });
  dialog = inject(MatDialog);
  httpClient = inject(HttpClient);

  async processLogin() {
    console.log(this.loginForm.value);
    console.log(`${environment.apiUrl}/auth/login`);
    await this.httpClient.post(`${environment.apiUrl}/auth/login`, this.loginForm.value)
    .subscribe((data: Partial<LoginResponse>) => {
      console.log(data);
      if (data.token) {
        this._snackbar.openFromComponent(Snackbar, {
          duration: 3000,
          data: 'login successful'
        });
        localStorage.setItem('token', data.token);
      }
    });
  }
}
