import { UserErrorCode } from "../types/code/userCode"

export const userErrorHttpStatusMap: Record<UserErrorCode, number> = {
  [UserErrorCode.EMAIL_ALREADY_EXISTS]: 409, // Conflict
  [UserErrorCode.USER_NOT_FOUND]: 404,       // Not Found
  [UserErrorCode.INVALID_PASSWORD]: 422,     // Unprocessable Entity
  [UserErrorCode.USER_CREATE_FAILED]: 500,   // Internal Server Error
}
