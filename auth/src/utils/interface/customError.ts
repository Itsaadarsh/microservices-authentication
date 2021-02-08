export default interface CustomError {
  customErrors(): {
    message: string;
    field?: string;
  }[];
}
