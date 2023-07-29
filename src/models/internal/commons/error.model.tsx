import { ErrorType } from '../types/ErrorTypes.model';

export interface IError {
    code?: string,
    msg: string | ErrorType
}
