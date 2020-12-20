export interface IListItemData {
  id: string;
  conversation_id: string;
  date_created: string;
  last_updated: string;
  score: number;
  likes: number;
  retweets: number;
  replies_count: number;
  text: string;
  user: IListItemUser;
}

export interface IListItemUser {
  user_id: string;
  handle: string;
  name: string;
  verified: 'true' | 'false';
  profile_photo: string;
}

declare namespace svelte.JSX {
  interface HTMLProps<HTMLUListElement> {
    // If you want to use on:beforeinstallprompt
    onfocusChange ?: (event: any) => any;
  }
}
