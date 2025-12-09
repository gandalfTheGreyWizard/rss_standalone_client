import { Component, Inject, OnInit, inject } from '@angular/core';
import { RssParser } from '../../helpers/rss-parser';
import * as _ from 'lodash';

//material components imports
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatSidenav, MatSidenavContent, MatSidenavContainer } from '@angular/material/sidenav';
import { RssFeedInterface } from '../../dtos/rss-parser-dtos';
import { MatIcon } from '@angular/material/icon';
import { GenericInterface } from '../../dtos/rss-parser-dtos';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

//component imports
import { SidenavContainer } from '../../components/general/sidenav-container/sidenav-container';
import { ModalContainer } from '../../components/rssFeeds/modal-container/modal-container';
import { FormGroup } from '@angular/forms';
import { LoginModal } from '../../components/rssFeeds/login-modal/login-modal';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

// dto imports
import { UserConfig, ConfigsResponse } from '../../dtos/rss-parser-dtos';
@Component({
  selector: 'app-rss-feeds',
  imports: [
    MatSlideToggle,
    MatGridList,
    MatGridTile,
    MatSidenav,
    MatSidenavContent,
    MatSidenavContainer,
    MatIcon,
    SidenavContainer,
    ModalContainer,
    LoginModal,
  ],
  templateUrl: './rss-feeds.html',
  styleUrl: './rss-feeds.scss'
})

export class RssFeeds implements OnInit {
  _httpClient = inject(HttpClient);
  private dialog = inject(MatDialog);
  feeds: GenericInterface[] = [];
  sidenavToggleState: boolean = true;
  navigationIcon='close';
  masterIndexCount: number = 0;
  feedSources?: UserConfig[] = [];
  // random feed sources

  //news
  //feedSources = [
    //{ name: 'new york times', url: 'https://www.nytimes.com/svc/collections/v1/publish/https://www.nytimes.com/section/world/rss.xml' },
    //{ name: 'cnbc', url: 'https://www.cnbc.com/id/100727362/device/rss/rss.html' },
    //{ name: 'nbcnews', url: 'https://feeds.nbcnews.com/nbcnews/public/news' },
  //];

  //reddit
  //feedSources = [
    //{ name: 'SBC Gaming', url: 'https://www.reddit.com/r/SBCGaming.rss' },
    //{ name: 'manga collectors', url: 'https://www.reddit.com/r/MangaCollectors.rss' },
    //{ name: 'Sim racing', url: 'https://www.reddit.com/r/simracing.rss' }
  //];
  private rssParser = inject(RssParser)

  async ngOnInit() {
    if (localStorage.getItem('token')) {
      console.log('jwt token value is ', localStorage.getItem('token'));
      this._httpClient.get(`${environment.apiUrl}/configs/list`, { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}).subscribe((data: Partial<ConfigsResponse>) => {
        console.log('user config object is ', data.configs);
        this.feedSources = data.configs;
        this.rederFeeds();
      });
    } else {
      this.dialog.open(LoginModal, {
        id: 'loingmodal',
        data: '',
        width: '50vw',
        enterAnimationDuration: 300,
        exitAnimationDuration: 300
      }).afterOpened().subscribe(() => {
        this.dialog.getDialogById('loginmodal')?.afterClosed().subscribe(() => {
          console.log('logged in ');
          this._httpClient.get(environment.apiUrl, { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}).subscribe((data: Partial<ConfigsResponse>) => {
            this.feedSources = data.configs;
          });
        });
      });
    }
    console.log('feed sources being rendered is ', this.feedSources);
    //if (this.feedSources?.length) {
      //const feedsMasterArr = await Promise.all(this.feedSources.map(async (eachFeedSourceObject) => {
        //try {
          //return await this.rssParser.getData((eachFeedSourceObject.feedUrl));
        //} catch(error) {
          //return [];
        //}
      //}));
      //feedsMasterArr.forEach(async (eachFeedsArr, index_first) => {
        //const idSortedFeeds = this.insertIds(eachFeedsArr as [GenericInterface]);
        //eachFeedsArr.forEach((eachFeed) => {
          //this.feeds.push(eachFeed);
        //});
      //});
    //}
  }

  async rederFeeds() {
    if (this.feedSources?.length) {
      const feedsMasterArr = await Promise.all(this.feedSources.map(async (eachFeedSourceObject) => {
        try {
          return await this.rssParser.getData((eachFeedSourceObject.feedUrl));
        } catch(error) {
          return [];
        }
      }));
      feedsMasterArr.forEach(async (eachFeedsArr, index_first) => {
        const idSortedFeeds = this.insertIds(eachFeedsArr as [GenericInterface]);
        eachFeedsArr.forEach((eachFeed) => {
          this.feeds.push(eachFeed);
        });
      });
    }
  }

  async insertIds(feedsArr: [GenericInterface]) {
    return await Promise.all(feedsArr.map((eachFeed) => {
        if (eachFeed['guid']) {
          eachFeed['id'] = eachFeed['guid'];
        } else if (eachFeed['id']) {
          console.log('id exists');
        } else {
          eachFeed['id'] = `${this.masterIndexCount}`;
          this.masterIndexCount += 1;
        }
        return eachFeed;
        console.log(eachFeed);
    }));
  }

  async addToFeeds(url: string) {
    try {
      console.log('url in add to feeds function', url);
      const newFeedsArr = await this.rssParser.getData(url);
      const idSortedFeeds = await this.insertIds(newFeedsArr as [GenericInterface]);
      this.feeds = _.union(this.feeds, idSortedFeeds);
    } catch(err) {
      console.error(err);
    }
  }

  async triggerAddTargetModal() {
    console.log("trigger modal");
    this.dialog.open(ModalContainer, {
      id: '1234',
      data: '',
      width: '50vw',
      enterAnimationDuration: 300,
      exitAnimationDuration: 300
    }).afterOpened().subscribe(() => {
      this.dialog.getDialogById('1234')?.afterClosed().subscribe((data) => {
        this.addToFeeds(data.rssUrl);
      });
    });
  }

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

  async parserValueAdded(parserAddedForm: FormGroup) {
    console.log('from parent ', parserAddedForm.value.rssUrl);
    try {
      await this.addToFeeds(parserAddedForm.value.rssUrl);
    } catch(err) {
      console.error(err);
    }
  }
}
