export interface IFieldErrorDetail {
  path: string;
  message: string;
}

export interface IErrorResponse {
  statusCode: number;
  message: string;
  errorDetails: IFieldErrorDetail[];
}
