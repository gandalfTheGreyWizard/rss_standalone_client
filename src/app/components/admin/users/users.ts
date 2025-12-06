import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  imports: [
    MatTabsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {
  private httpClient = inject(HttpClient);

  userAdditionForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  });
  async processUserAddition() {

    const jwtHeader = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJucGMiLCJsYXN0TmFtZSI6ImF1cmEiLCJpZCI6NywiZW1haWwiOiJucGNhdXJhQHlhaG9vLmNvbS5jb20iLCJjcmVhdGVkQXQiOiIyMDI1LTExLTE4VDEyOjU1OjM5LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDI1LTExLTE4VDEyOjU1OjM5LjAwMFoiLCJpYXQiOjE3NjUwMzEwNTQsImV4cCI6MTc2NTAzNDY1NH0.oSZgYUkeyBgSCRp2Wn2jjyXs-2_4JEMSsXfhso97Sy4"};
    console.log(this.userAdditionForm.value);
    await this.httpClient.post("http://localhost:3000/users/create", this.userAdditionForm.value, { headers:  jwtHeader }).subscribe((data) => {
      console.log(data);
    });
  }
}
