import { Component, Inject, OnInit, inject } from '@angular/core';
import { RssParser } from '../helpers/rss-parser';
import * as _ from 'lodash';

//material components imports
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatSidenav, MatSidenavContent, MatSidenavContainer } from '@angular/material/sidenav';
import { FeedConfig, RssFeedInterface } from '../dtos/rss-parser-dtos';
import { MatIcon } from '@angular/material/icon';
import { GenericInterface } from '../dtos/rss-parser-dtos';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

//component imports
import { SidenavContainer } from '../components/sidenav-container/sidenav-container';
import { ModalContainer } from '../components/modal-container/modal-container';
import { LoginModal } from '../components/login-modal/login-modal';
import { FormGroup } from '@angular/forms';
import { Router, ROUTES } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AddToFeedsInput } from './rss-feeds.dtos';
import { GenericHelper } from '../helpers/generic-helper';
import { UserConfig } from '../dtos/config-query-dtos';
import { MatCardModule } from '@angular/material/card';
import * as cheerio from 'cheerio';

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
    MatCardModule
  ],
  templateUrl: './rss-feeds.html',
  styleUrl: './rss-feeds.scss'
})

export class RssFeeds implements OnInit {
  httpClient = inject(HttpClient);
  _genericHelper = inject(GenericHelper);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  feeds: GenericInterface[] = [];
  sideNavToggleState: boolean = true;
  navigationIcon='close';
  masterIndexCount: number = 0;

  // random feed sources
  feedSources: UserConfig[] = []
  //feedSources: FeedConfig[] = [
    //{ feedName: 'hackernews', feedUrl: 'https://feeds.feedburner.com/TheHackersNews?format=xml' },
    //{ feedName: 'slashdot', feedUrl: 'https://rss.slashdot.org/Slashdot/slashdotMain' },
    //{ feedName: 'krebs', feedUrl: 'https://krebsonsecurity.com/feed/' },
  //];

    //{ feedName: 'hackernews', feedUrl: 'https://feeds.feedburner.com/TheHackersNews?format=xml' },
    //{ feedName: 'slashdot', feedUrl: 'https://rss.slashdot.org/Slashdot/slashdotMain' },
    //{ feedName: 'krebs', feedUrl: 'https://krebsonsecurity.com/feed/' },
  //]

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
    console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token')) {
      console.log("already logged in");
      const decodeTokenHeader = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
      // check if the current stored jwt is valid or not
      await this.httpClient.get(`${environment.apiUrl}/auth/decode`, { headers: decodeTokenHeader}).subscribe((data) => {
        console.log(data);
      }, (err) => {
        // incase the current token is unauthorized trigger the login modal
        console.error(err);
        this.dialog.open(LoginModal, {
          id: 'loginmodal',
          data: '',
          width: '50vw',
          enterAnimationDuration: 300,
          exitAnimationDuration: 300
        }).afterOpened().subscribe(() => {
          this.dialog.getDialogById('loginmodal')?.afterClosed().subscribe((data) => {
            console.log('data recieved from login modal ', data);
            console.log('current url', this.router.url);
            this.router.navigate([this.router.url]);
          });
        });
      });
    } else {
      // incase the token is missing from localstorage altogether then trigger the login modal
      this.dialog.open(LoginModal, {
        id: 'loginmodal',
        data: '',
        width: '50vw',
        enterAnimationDuration: 300,
        exitAnimationDuration: 300
      }).afterOpened().subscribe(() => {
        this.dialog.getDialogById('loginmodal')?.afterClosed().subscribe((data) => {
          console.log('data recieved from login modal ', data);
          console.log('current url', this.router.url);
          this.router.navigate([this.router.url]);
        });
      });
    };
    const authHeaders = await this._genericHelper.getAuthorizationHeader();
    console.log('auth headers responded from function', authHeaders);
    const userConfig = await this.httpClient.get<UserConfig[]>(`${environment.apiUrl}/config/list`, { headers: authHeaders }).subscribe(async (data) => {
      this.feedSources = data;
      await this.renderFeeds();
    }, (err) => {
      console.error('error fetching user config', err);
    });
  }

  async renderFeeds() {
    // function the render the initial feeds in the page against the config pulled against the user
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

  async showConfig() {
    // for debugging the current config in the system
    console.log('feedSource', this.feedSources);
    console.log('feeds', this.feeds);
  }

  async addToFeeds(data: AddToFeedsInput) {
    // insert the feed name and url just added from the target addition modal
    try {
      console.log('url in add to feeds function', data.feedUrl);
      const newFeedsArr = await this.rssParser.getData(data.feedUrl);
      const idSortedFeeds = await this.insertIds(newFeedsArr as [GenericInterface]);
      console.log()
      const nextFeedSourceId = this.feedSources[this.feedSources.length - 1].id + 1;
      const feedSourceObject: UserConfig = {
        id: nextFeedSourceId,
        feedName: data.feedName,
        feedUrl: data.feedUrl,
        userId: this.feedSources[0].userId,
      }
      this.feedSources.push(feedSourceObject);
      await this.httpClient.post(`${environment.apiUrl}/config/create`, feedSourceObject, { headers: this._genericHelper.getAuthorizationHeader() }).subscribe((data) => {
        console.log('feed source config updated', data);
      }, (err) => {
        console.error('error while creation', err);
      });
      this.feeds = _.union(this.feeds, idSortedFeeds);
    } catch(err) {
      console.error(err);
    }
  }

  async saveConfig() {
    console.log("saving lol");
  }

  async triggerAddTargetModal() {
    // add a new rss target to listen to
    console.log("trigger modal");
    this.dialog.open(ModalContainer, {
      id: '1234',
      data: '',
      width: '50vw',
      enterAnimationDuration: 300,
      exitAnimationDuration: 300
    }).afterOpened().subscribe(() => {
      this.dialog.getDialogById('1234')?.afterClosed().subscribe((data) => {
        this.addToFeeds(data);
      });
    });
  }

  async toggleSideNav() {
    this.sideNavToggleState = !this.sideNavToggleState;
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

  async closeSideNav() {
    this.sideNavToggleState = false;
    this.navigationIcon = 'menu';
    console.log("closed atleast tried to ");
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
