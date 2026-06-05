import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UnitInterface, GenericInterface} from '../dtos/rss-parser-dtos';
import { RssFeedInterface } from '../dtos/rss-parser-dtos';
import { CustomParsers } from './custom-parsers';
import Parser from 'rss-parser';
import * as cheerio from 'cheerio';
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
      const transformedFeeds: GenericInterface[] = [];
      const parsedFeed = await this.rssParser.parseString(rssRawText);
      parsedFeed['items'].forEach((eachItem) => {
        const tempItem: GenericInterface = eachItem;
        const $ = cheerio.load(eachItem['content'] ? `<p>${eachItem['content']}</p>` : '');
        const parsedHtmlContent = $.extract({
          text: {
            selector: 'p',
          },
          links: [
            {
              selector: 'a',
              value: (el, key) => {
                const href = $(el).attr('href');
                return `${key}=${href}`;
              },
            },
          ],
          imagesrcs: [
            {
              selector: 'img',
              value: (el, key) => {
                const src = $(el).attr('src');
                return `${key}=${src}`;
              },
            },
          ]
        });
        tempItem['links'] = parsedHtmlContent.links;
        tempItem['imagesrcs'] = parsedHtmlContent.imagesrcs;
        tempItem['content'] = parsedHtmlContent.text ? parsedHtmlContent.text : " ";
        transformedFeeds.push(tempItem);
      });
      return transformedFeeds;
  }

  async testParser(url: string) {
      const rssRawText = await firstValueFrom(this.httpClient.get(url, { responseType: 'text' }));
      const transformedFeeds: GenericInterface[] = [];
      const parsedFeed = await this.rssParser.parseString(rssRawText);
      parsedFeed['items'].forEach((eachItem) => {
        const tempItem: GenericInterface = eachItem;
        const $ = cheerio.load(eachItem['content'] ? `<p>${eachItem['content']}</p>` : '');
        const parsedHtmlContent = $.extract({
          text: {
            selector: 'p',
          },
          links: [
            {
              selector: 'a',
              value: (el, key) => {
                const href = $(el).attr('href');
                return `${key}=${href}`;
              },
            },
          ],
          imagesrcs: [
            {
              selector: 'img',
              value: (el, key) => {
                const src = $(el).attr('src');
                return `${key}=${src}`;
              },
            },
          ]
        });
        tempItem['links'] = parsedHtmlContent.links;
        tempItem['imagesrcs'] = parsedHtmlContent.imagesrcs;
        tempItem['content'] = parsedHtmlContent.text ? parsedHtmlContent.text : " ";
        transformedFeeds.push(tempItem);
      });
      return transformedFeeds;
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
