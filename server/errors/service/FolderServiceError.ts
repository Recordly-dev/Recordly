import { AppError } from "../AppError";
import { ServiceErrorArgs } from "../../types/errors/errorArgs";

export default class FolderServiceError extends AppError {
  constructor(args: ServiceErrorArgs) {
    super({
      name: "FolderServiceError",
      httpCode: args.httpCode,
      description: args.description,
      ...(args.error && { error: args.error }),
    });
  }
}
