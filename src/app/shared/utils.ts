import { HttpErrorResponse } from "@angular/common/http";
import { ErrorText } from "./constants";

export const getErrorText = (response: HttpErrorResponse) => {
  switch(response.status) {
    case 304:
      return ErrorText.notModified;
    case 403:
      return ErrorText.forbidden;
    case 422:
      return ErrorText.validationFailed
    case 503:
      return ErrorText.serviceUnavailable
    default:
      return `Ошибка ${response.status}.`;
  }
};
