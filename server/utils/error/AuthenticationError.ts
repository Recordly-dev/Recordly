export default class AuthenticationError extends Error {
  constructor(...args: any[]) {
    super(...args);
    this.name = "AuthenticationError";
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}
