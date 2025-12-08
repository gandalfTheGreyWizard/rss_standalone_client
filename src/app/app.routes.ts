import { Routes } from '@angular/router';
import { RssFeeds } from './pages/rss-feeds/rss-feeds';
import { Admin } from './pages/admin/admin';

export const routes: Routes = [
  {
    path: 'rss',
    component: RssFeeds
  },
  {
    path: 'admin',
    component: Admin
  }
];
