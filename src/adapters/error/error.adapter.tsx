import { FirebaseError } from 'firebase/app';
import { IError } from '../../models/internal/commons/error.model';

export class ErrorAdapter {
  static newFirebaseError(error: FirebaseError): IError {
    const output: IError = {
      code: error.code,
      msg: error.message,
    };
    return output;
  }

  static newGenericError(errorMsg: string): IError {
    const output: IError = {
      code: '',
      msg: errorMsg,
    };
    return output;
  }
}
