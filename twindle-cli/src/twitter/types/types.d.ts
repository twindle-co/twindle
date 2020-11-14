export interface Mention {
  start: number;
  end: number;
  username: string;
}

export interface Hashtag {
  start: number;
  end: number;
  tag: string;
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
  images?: {
    url: string;
    height: number;
    width: number;
  }[];
}

export interface Attachments {
  poll_id?: string[];
  media_keys?: string[];
}

export interface User {
  username: string;
  description: string;
  profile_image_url: string;
  verified: boolean;
  location: string;
  created_at: string;
  name: string;
  protected: boolean;
  id: string;
  url?: string;
  public_metrics: {
    followers_count: number;
    following_count: number;
    tweet_count: number;
    listed_count: number;
  };
  entities?: {
    url?: {
      urls: EntityUrl[];
    };
    description?: {
      urls?: EntityUrl[];
      mentions?: Mention[];
      hashtags?: Hashtag[];
    };
  };
}

export interface ConversationResponseData {
  conversation_id: string;
  id: string;
  text: string;
  author_id: string;
  created_at: string;
  in_reply_to_user_id: string;
  public_metrics: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
  };
  entities?: {
    mentions?: Mention[];
    hashtags?: Hashtag[];
    urls?: EntityUrl[];
  };
  referenced_tweets?: {
    type: "retweeted" | "quoted" | "replied_to";
    id: string;
  }[];
  attachments?: Attachments;
  /** Not returned by twitter API. Added by the code */
  includes?: ConversationIncludes;

  customMedia?: CustomMedia;

  linkWithImage?: Partial<LinkWithImage>;

  embeddedTweet?: ConversationResponseData;
  embeddedTweetUser?: User;

  embeddedTweetCardSize?: "small" | "large";
}

export interface IncludesMedia {
  height: number;
  width: number;
  type: "photo" | "video" | "animated_gif";
  url: string;
  preview_image_url: string;
  media_key: string;
}

export interface ConversationIncludes {
  media: IncludesMedia[];
  users: User[];
}

/**
 * Types from response after cleanup
 */
export interface ConversationResponse {
  data: ConversationResponseData[];
  includes: ConversationIncludes;
  meta: {
    newest_id: string;
    oldest_id: string;
    result_count: number;
  };
}

export interface CustomMedia {
  [media: "photo" | "video" | "animated_gif"]: {
    height: number;
    width: number;
    preview_img_url: string;
    /** Format: pic.twitter.com/*. No HTTPS in the link */
    link: string;
  }[];
}

export interface LinkWithImage {
  expanded_url: string;
  images: {
    url: string;
    width: number;
    height: number;
  }[];
  title: string;
  description: string;
  domain: string;
}

export interface CustomTweetData {
  id: string;
  created_at: string;
  tweet: string;
  customMedia?: CustomMedia;

  linkWithImage?: Partial<LinkWithImage>;

  embeddedTweet?: ConversationResponseData;
  embeddedTweetUser?: User;

  embeddedTweetCardSize?: "small" | "large";
}

export interface CustomTweets {
  common: {
    id: string;
    created_at: string;
    count: number;
    user: Partial<User>;
  };
  data: CustomTweetData[];
}
