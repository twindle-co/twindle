export interface Mention {
  start: number;
  end: number;
  username: string;
}

export interface Hashtag {
  start: number;
  end: number;
  hashtag: string; 
}

export interface EntityUrl {
  start: number;
  end: number;
  /** format: `https://t.co/[REST]` */
  url: string;
  expanded_url: string;
  /** The possibly truncated URL */
  display_url: string;
  status: number;
  title: string;
  description: string;
  unwound_url: string;
  images?: [
    {
      url: string;
      height: number;
      width: string;
    }
  ];
}

export interface Attachment {
  poll_id?: string[];
  media_keys?: string[];
}

export interface ConversationsResponseData {
  public_metrics: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
  };
  conversation_id: string;
  id: string;
  text: string;
  author_id: string;
  referenced_tweets: [
    {
      type: "retweeted" | "quoted" | "replied_to";
      id: string;
    }
  ];
  created_at: string;
  entities?: {
    mentions?: Mention[];
    hashtags?: Hashtag[];
    urls?: EntityUrl[];
  };
  attachments?: Attachment;
  in_reply_to_user_id: string;
}

/**
 * Types from response after cleanup
 */
export interface ConversationsResponse {
  data: ConversationsResponseData[];
  includes: any[];
  meta: any[];
}
