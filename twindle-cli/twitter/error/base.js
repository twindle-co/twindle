import { UserError } from "../../helpers/error";

class TwitterError extends UserError {
  constructor(name, message) {
    super("twitter-api:" + name, message);
  }
}

export default TwitterError;
