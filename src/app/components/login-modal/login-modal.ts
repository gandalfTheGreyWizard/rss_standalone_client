import { output, Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialogRef, MatDialogClose, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RssFeeds } from '../../rss-feeds/rss-feeds';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginResponse } from '../../dtos/form-dtos';
@Component({
  selector: 'app-login-modal',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButton,
    MatTooltip,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.scss',
})
export class LoginModal {
  httpClient = inject(HttpClient);
  formData = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<RssFeeds>);
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  login() {
    console.log(this.loginForm.value);
    console.log(environment.apiUrl);
    const requestHeaders = {
      'Content-Type': 'application/json',
    }
    this.httpClient.post(`${environment.apiUrl}/auth/login`, this.loginForm.value , { headers: requestHeaders }).subscribe((data: Partial<LoginResponse>) => {
      console.log(data.token);
      localStorage.setItem("token", data.token ? data.token : "");
      this.dialogRef.close(true);
    }, (err) => {
      console.log('err', err.message);
      this.dialogRef.close(false);
    });
  }
}
