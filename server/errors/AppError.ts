import { HttpCode } from "../constants/httpCode";
import { AppErrorArgs } from "../types/errors/errorArgs";

export class AppError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpCode;
  public readonly isOperational: boolean = true;
  public readonly error?: Error;

  constructor(args: AppErrorArgs) {
    super(args.description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = args.name || "Error";
    this.httpCode = args.httpCode;

    if (args.isOperational !== undefined) {
      this.isOperational = args.isOperational;
    }
    if (args.error !== undefined) {
      this.error = args.error;
    }

    Error.captureStackTrace(this);
  }
}

export const isTrustedError = (error: Error): boolean => {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
};
