import { Component, OnInit, inject } from '@angular/core';
import { RssParser } from '../helpers/rss-parser';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatSidenav, MatSidenavContent, MatSidenavContainer } from '@angular/material/sidenav';
import { RssFeedInterface } from '../dtos/rss-parser-dtos';
import { MatIcon } from '@angular/material/icon';
import { GenericInterface } from '../dtos/rss-parser-dtos';
import * as _ from 'lodash';

@Component({
  selector: 'app-rss-feeds',
  imports: [
    MatSlideToggle,
    MatGridList,
    MatGridTile,
    MatSidenav,
    MatSidenavContent,
    MatSidenavContainer,
    MatIcon
  ],
  templateUrl: './rss-feeds.html',
  styleUrl: './rss-feeds.scss'
})

export class RssFeeds implements OnInit {
  feeds: GenericInterface[] = [];
  sidenavToggleState: boolean = true;
  navigationIcon='close';

  // random feed sources
  feedSources = [
    { name: 'slashdot', url: 'https://rss.slashdot.org/Slashdot/slashdotMain' },
    { name: 'krebs', url: 'https://krebsonsecurity.com/feed/' },
    { name: 'hackernews', url: 'https://feeds.feedburner.com/TheHackersNews?format=xml' },
  ]

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
    console.log('init');
    const feedsMasterArr = await Promise.all(this.feedSources.map(async (eachFeedSourceObject) => {
      return await this.rssParser.getData((eachFeedSourceObject.url));
    }));
    feedsMasterArr.forEach((eachFeedsArr, index_first) => {
      //this.feeds = _.intersection(this.feeds, eachFeedsArr);
      eachFeedsArr.forEach((eachFeed, index_second) => {
        if (eachFeed['guid']) {
          eachFeed['id'] = eachFeed['guid'];
        } else if (eachFeed['id']) {
          console.log('id exists');
        } else {
          eachFeed['id'] = `${index_first}-${index_second}`;
        }
        console.log(eachFeed);
        this.feeds.push(eachFeed);
      });
      //this.feeds = _.intersection(this.feeds, eachFeedsArr['items']);
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
}
