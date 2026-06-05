import { Routes } from '@angular/router';
import { RssFeeds } from './rss-feeds/rss-feeds';
import { Playground } from './playground/playground';
export const routes: Routes = [
  {
    path: 'rss',
    component: RssFeeds,
  },
  {
    path: 'playground',
    component: Playground,
  }
];
