import { IUser } from "./user";

declare global {
  namespace Express {
    export interface User extends IUser {}
  }
}
