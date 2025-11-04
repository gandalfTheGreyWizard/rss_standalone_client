import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import Parser from 'rss-parser';

@Injectable({
  providedIn: 'root'
})
export class CustomParsers {
  private http = inject(HttpClient);
  rssParser = new Parser();
  //parser: Parser = new Parser({
    //mergeAttrs: true,
    //explicitArray: false,
    //explicitChildren: false,
    //explicitCharkey: false,
  //});

  async parseNewsRss(rssFeedUrl: string) {
    const data = await this.http.get(rssFeedUrl, { responseType: 'text' }).subscribe(async (data) => {
      console.log('recieved text', data);
      const feed = await this.rssParser.parseString(data);
      console.log(feed);
    });
  }
}
