import ExtendableError from "./ExtendableError.js";

export default class ForbiddenError extends ExtendableError {
  constructor(message, data) {
    super(message);
    this.statusCode = 403;
    this.data = data;
  }
}
