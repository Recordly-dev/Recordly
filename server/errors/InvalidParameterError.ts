import { HttpCode } from "../constants/httpCode";
import { AppError } from "./AppError";

export default class InvalidParameterError extends AppError {
  constructor(targetName: string) {
    super({
      name: "InvalidParameterError",
      httpCode: HttpCode.BAD_REQUEST,
      description: `적절치 않은 ${targetName} 입니다. 파라미터를 확인해주세요.`,
    });
  }
}
