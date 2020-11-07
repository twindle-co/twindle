// @ts-check

class UserError extends Error {
  /**
   *
   * @param {string} message Message to show to the user
   * @param {string} name Code of the error
   */
  constructor(name, message) {
    super(message);

    this.name = name;
  }
}

module.exports = { UserError };
