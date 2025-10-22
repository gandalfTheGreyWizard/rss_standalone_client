import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import  { parseString } from 'xml2js';
import { UnitInterface, GenericInterface} from '../dtos/rss-parser-dtos';
import Parser from 'rss-parser';
@Injectable({
  providedIn: 'root'
})
export class RssParser {
  private http = inject(HttpClient);
  async getData(url: string) {
    try {
      const responseFeedsArr: GenericInterface[] = [];
      const data = await this.http.get(url, { responseType: 'text'}).subscribe((data) => {
        parseString(data, (err, result) => {
          result['feed']['entry'].forEach((eachEntry: UnitInterface, index: number) => {
            let tempResponseDict: GenericInterface = {}
            tempResponseDict['guid'] = index.toString();
            tempResponseDict['content'] = this.handleStringResponse('content', eachEntry);
            tempResponseDict['title'] = this.handleStringResponse('title', eachEntry);
            //tempResponseDict['category'] = this.handleStringResponse('category', eachEntry);
            //tempResponseDict['thumb'] = this.handleStringResponse('media:thumbnail', eachEntry);
            responseFeedsArr.push(tempResponseDict);
          });
        });
      });
      //const parser = new Parser({
        //headers: { 'User-Agent': 'curl/7.64.1' }
      //});
      //const feeds = await parser.parseURL('https://www.reddit.com/r/brot.rss');
      //console.log('feeds response', feeds);
      //return feeds.items.map((each_feed) => {
        //return each_feed;
      //});
      console.log('responding with', responseFeedsArr);
      return responseFeedsArr;
    } catch(err) {
      console.log(err);
      return [];
    }
  }
  handleStringResponse(refKey: string, refDict: UnitInterface): string | GenericInterface {
    if (typeof(refDict[refKey][0]) == 'string') {
      return refDict[refKey][0];
    } else if(typeof(refDict[refKey][0]._) == 'string') {
      return refDict[refKey][0]._.toString();
    } else {
      console.log(refDict[refKey][0].$);
      return refDict[refKey][0].$;
    }
  }
}
