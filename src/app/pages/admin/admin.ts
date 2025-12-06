import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../components/admin/users/users';
import { Config } from '../../components/admin/config/config';

@Component({
  selector: 'app-admin',
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatTabsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    Users,
    Config
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin {
  private httpClient = inject(HttpClient);
  leftMenu = ['General', 'Users', 'Configs']
  sidenavToggleState: boolean = true;
  navigationIcon='close';
  currentPanel: string = 'users';

  async toggleSidenav() {
    this.sidenavToggleState = !this.sidenavToggleState;
    //this.feeds.forEach((eachFeed) => {
      //const domparserInstance = new DOMParser();
      //const parsedFeedContent = domparserInstance.parseFromString(eachFeed.content ? eachFeed.content.toString() : ' ', 'text/html');
      //const imgTags = parsedFeedContent.getElementsByTagName('img');
      //for (const eachItem of imgTags) {
        //console.log('eachItem', eachItem.getAttribute('src'));
      //}
    //});
    if (this.navigationIcon == 'close') {
      this.navigationIcon = 'menu';
    } else {
      this.navigationIcon = 'close';
    }
  }
  async viewPanel(menuItem: string) {
    this.currentPanel = menuItem;
  }
}
