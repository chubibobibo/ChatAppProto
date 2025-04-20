interface ExpressErrorType {
  message: string;
  status: number;
}
export class ExpressError extends Error {
  message: string;
  status: number; // adds the status property to the error object
  constructor(message: string, status: number) {
    super();
    this.message = message;
    this.status = status;
  }
}
