import { HttpCode } from "../constants/httpCode";
import { AppError } from "./AppError";

export default class AuthenticationError extends AppError {
  constructor() {
    super({
      name: "AuthenticationError",
      httpCode: HttpCode.UNAUTHORIZED,
      description: "로그인 되어있지 않습니다.",
    });
  }
}
