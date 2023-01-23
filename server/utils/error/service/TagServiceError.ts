export default class TagServiceError extends Error {
  constructor(...args: any[]) {
    super(...args);
    this.name = "TagServiceError";
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}
