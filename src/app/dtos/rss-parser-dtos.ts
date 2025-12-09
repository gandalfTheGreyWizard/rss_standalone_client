import { Data } from "@angular/router";

export interface RssParserDtos {
}

export interface Feed {
  author: []
}
export interface XmlParsedReddit {

}

export interface GenericInterface {
  [key: string]: string | GenericInterface;
}

export interface CustomDict {
  _: string;
  $: {[key: string]: string};
}

export interface RssFeedInterface {
  author?: string;
  content?: string;
  title?: string;
  id?: string;
  isoDate?: Date;
  link?: string,
  pubDate?: Date;
}

export interface UnitInterface {
  [key: string]: CustomDict | string;
}

export interface UserConfig {
  id: string;
  userId: string;
  feedName: string;
  feedUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConfigsResponse {
  configs: UserConfig[];
}
