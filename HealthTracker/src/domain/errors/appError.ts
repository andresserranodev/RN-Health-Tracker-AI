export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export class DataParsingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DataParsingError';
  }
}
