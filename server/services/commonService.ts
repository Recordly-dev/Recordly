import * as mongodb from "mongodb";

export const validateObjectId = (targetId: string): void => {
  if (!mongodb.ObjectId.isValid(targetId)) {
    throw new Error(`${targetId}는 object id로 변환 불가능합니다.`);
  }
};
