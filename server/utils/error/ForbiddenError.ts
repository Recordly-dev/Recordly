import ExtendableError from "./ExtendableError";

export default class ForbiddenError extends ExtendableError {
  constructor(message: string, data: any) {
    super(message);
    // this.statusCode = 403;
    // this.data = data;
  }
}
