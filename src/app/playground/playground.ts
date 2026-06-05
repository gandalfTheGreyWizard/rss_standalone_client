import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ModalContainer } from '../components/modal-container/modal-container';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FeedConfig } from '../dtos/rss-parser-dtos';
import { RssParser } from '../helpers/rss-parser';

@Component({
  selector: 'app-playground',
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ModalContainer,
    MatDialogModule,
  ],
  templateUrl: './playground.html',
  styleUrl: './playground.scss',
})
export class Playground {
  _rssParser = inject(RssParser);
  httpClient = inject(HttpClient);
  sideNavToggleState: boolean = false;
  topNavIcon = 'menu';
  dialog = inject(MatDialog);

  async openSideNav() {
    this.sideNavToggleState = true;
    this.topNavIcon = 'close';
  }

  async closeSideNav() {
    this.sideNavToggleState = false;
    this.topNavIcon = 'menu';
  }

  async toggleSideNav() {
    this.sideNavToggleState = !this.sideNavToggleState;
    if (this.topNavIcon == 'menu') {
      this.topNavIcon = 'close';
    } else {
      this.topNavIcon = 'menu';
    }
  }

  async addTarget() {
    this.dialog.open(ModalContainer, {
      id: 'addTargetsInPlayground',
      data: '',
      width: '50vw',
      enterAnimationDuration: 300,
      exitAnimationDuration: 300,
    }).afterOpened().subscribe(() => {
      this.dialog.getDialogById('addTargetsInPlayground')?.afterClosed().subscribe(async (data: FeedConfig) => {
        const responseFromRssUrl = await this._rssParser.testParser(data.feedUrl);
        console.log(responseFromRssUrl);
      })
    })
  }
}
