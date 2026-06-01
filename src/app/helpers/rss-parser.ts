import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UnitInterface, GenericInterface} from '../dtos/rss-parser-dtos';
import { RssFeedInterface } from '../dtos/rss-parser-dtos';
import { CustomParsers } from './custom-parsers';
import Parser from 'rss-parser';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RssParser {
  private httpClient = inject(HttpClient);
  private customParserService = inject(CustomParsers);
  private rssParser = new Parser();

  async getData(url: string) {
      const rssRawText = await firstValueFrom(this.httpClient.get(url, { responseType: 'text' }));
      const parsedFeed = await this.rssParser.parseString(rssRawText);
      return parsedFeed['items'];
  }
  handleStringResponse(refKey: string, refDict: UnitInterface): string | GenericInterface {
    if (typeof(refDict[refKey]) == 'string') {
      return refDict[refKey];
    } else if (typeof(refDict[refKey]._) == 'string') {
      return refDict[refKey]._;
    } else {
      return '';
    }
  }
}
