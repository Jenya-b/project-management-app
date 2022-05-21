export interface ResponseError {
  statusCode: number;
  message: string | string[];
}

export enum StatusCodes {
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
}
