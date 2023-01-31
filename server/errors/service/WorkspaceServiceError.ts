import { AppError } from "../AppError";
import { ServiceErrorArgs } from "../../types/errors/errorArgs";

export default class WorkspaceServiceError extends AppError {
  constructor(args: ServiceErrorArgs) {
    super({
      name: "WorkspaceServiceError",
      httpCode: args.httpCode,
      description: args.description,
      ...(args.error && { error: args.error }),
    });
  }
}
