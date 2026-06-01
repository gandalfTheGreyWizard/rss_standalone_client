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

export interface FeedConfig {
  feedName: string;
  feedUrl: string;
}

export interface UnitInterface {
  [key: string]: CustomDict | string;
}
