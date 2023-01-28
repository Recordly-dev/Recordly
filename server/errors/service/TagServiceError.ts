import { AppError } from "../AppError";
import { ServiceErrorArgs } from "../../types/errors/errorArgs";

export default class TagServiceError extends AppError {
  constructor(args: ServiceErrorArgs) {
    super({
      name: "TagServiceError",
      httpCode: args.httpCode,
      description: args.description,
      ...(args.error && { error: args.error }),
    });
  }
}
