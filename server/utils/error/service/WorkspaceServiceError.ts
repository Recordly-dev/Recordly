export default class WorkspaceServiceError extends Error {
  constructor(...args: any[]) {
    super(...args);
    this.name = "WorkspaceServiceError";
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}
