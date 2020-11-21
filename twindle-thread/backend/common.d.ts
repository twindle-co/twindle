declare namespace NodeJS {
  export interface ProcessEnv {
    MYSQL_HOST: string;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;

    TWITTER_AUTH_TOKEN: string;
  }
}
