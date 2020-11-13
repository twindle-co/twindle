declare namespace NodeJS {
  export interface ProcessEnv {
    /** The bearer token from Twitter Developers dashboard. Required */
    TWITTER_AUTH_TOKEN: string;

    /** Kindle email address to send the generated file to automatically */
    KINDLE_EMAIL?: string;

    /** Host of your smtp server for ex: `smtp.gmail.com`, if its a G-Mail account */
    HOST?: string;
    /** Port of the server. `465` for Gmail */
    PORT?: string;
    /** The email from which to send to kindle. Must be whitelisted in your Amazon Devices Dashboard */
    EMAIL?: string;
    /** Password to the account from which to send the mail */
    PASS?: string;

    /** Whether to show descriptive error messages or short, prettified ones */
    DEV?: "true" | "false";
  }
}
interface Console {
  /** Logs only when env var DEV === "true" */
  devLog: (...data: any[]) => void;
}
