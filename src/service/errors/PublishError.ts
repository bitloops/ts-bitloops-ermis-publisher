export class PublishError extends Error {
  private _status: string;
  constructor(message: string, status: string) {
    super(message);
    this._status = status;
    Object.setPrototypeOf(this, PublishError.prototype);
  }

  get status(): string {
    return this._status;
  }
  public toString(): string {
    return `Error ${this._status} ${this.message}`;
  }
}
