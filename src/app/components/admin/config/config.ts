import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-config',
  imports: [
    MatTabsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './config.html',
  styleUrl: './config.scss'
})
export class Config {
  private httpClient = inject(HttpClient);

  configAdditionForm = new FormGroup({
    userId: new FormControl(),
    feedName: new FormControl(),
    feedUrl: new FormControl(),
  });
  async processConfigAddition() {

    const jwtHeader = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJucGMiLCJsYXN0TmFtZSI6ImF1cmEiLCJpZCI6NywiZW1haWwiOiJucGNhdXJhQHlhaG9vLmNvbS5jb20iLCJjcmVhdGVkQXQiOiIyMDI1LTExLTE4VDEyOjU1OjM5LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDI1LTExLTE4VDEyOjU1OjM5LjAwMFoiLCJpYXQiOjE3NjUwMzM3ODEsImV4cCI6MTc2NTAzNzM4MX0.QfTd4Du7zR8K9oWOgGu3-X8RftOEF3TB3tFSbsst4C4"};
    console.log(this.configAdditionForm.value);
    await this.httpClient.post("http://localhost:3000/configs/create", this.configAdditionForm.value, { headers:  jwtHeader }).subscribe((data) => {
      console.log(data);
    });
  }
}
