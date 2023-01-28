import { HttpCode } from "../../constants/httpCode";

export interface AppErrorArgs {
  name?: string;
  httpCode: HttpCode;
  description: string;
  isOperational?: boolean;
  error?: any;
}

export interface ServiceErrorArgs {
  httpCode: HttpCode;
  description: string;
  isOperational?: boolean;
  error?: any;
}
