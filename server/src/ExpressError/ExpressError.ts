interface ExpressErrorType {
  message: string;
  status: number;
}
export class ExpressError extends Error {
  status: number; // adds the status property to the error object
  constructor({ message, status }: ExpressErrorType) {
    super();
    this.message = message;
    this.status = status;
  }
}
