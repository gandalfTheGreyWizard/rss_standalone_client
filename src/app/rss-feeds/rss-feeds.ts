import { Component, OnInit, inject } from '@angular/core';
import { RssParser } from '../helpers/rss-parser';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatSidenav, MatSidenavContent, MatSidenavContainer } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
export interface RssFeedInterface {
  content?: String;
  title?: String;
  guid?: String;
}

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
  feeds: RssFeedInterface[] = [];
  sidenavToggleState: boolean = true;
  navigationIcon='close';

  urlDict = [
    { name: 'manga collectors', url: 'https://www.reddit.com/r/MangaCollectors.rss' },
  ]

  private rssParser = inject(RssParser)

  async ngOnInit() {
    console.log('init');
    this.feeds = await this.rssParser.getData('https://www.reddit.com/r/MangaCollectors.rss');
  }

  async toggleSidenav() {
    this.sidenavToggleState = !this.sidenavToggleState;
    this.feeds.forEach((eachFeed) => {
      const domparserInstance = new DOMParser();
      const parsedFeedContent = domparserInstance.parseFromString(eachFeed.content ? eachFeed.content.toString() : ' ', 'text/html');
      const imgTags = parsedFeedContent.getElementsByTagName('img');
      for (const eachItem of imgTags) {
        console.log('eachItem', eachItem.getAttribute('src'));
      }
    });
    if (this.navigationIcon == 'close') {
      this.navigationIcon = 'menu';
    } else {
      this.navigationIcon = 'close';
    }
  }
}
