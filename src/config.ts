export type ErmisOptions = {
  applicationId: string;
  publicKey: string;
  secret: string;
  host?: string;
  ssl?: boolean;
};

export class Config {
  private _applicationId: string;
  // add remaining private members from constructor body
  private _publicKey: string;
  private _secret: string;
  private _host: string;
  private _ssl: boolean;
  private _publishPath: string;

  constructor(options: ErmisOptions) {
    this._applicationId = options.applicationId;
    this._publicKey = options.publicKey;
    this._secret = options.secret;
    this._host = options.host ?? 'api.ermis.io';
    this._ssl = options.ssl || false;
    this._publishPath = '/publish';
  }

  getConfig(): ErmisOptions {
    return {
      applicationId: this._applicationId,
      publicKey: this._publicKey,
      secret: this._secret,
      host: this._host,
      ssl: this._ssl,
    };
  }

  get applicationId(): string {
    return this._applicationId;
  }

  get publicKey(): string {
    return this._publicKey;
  }

  get secret(): string {
    return this._secret;
  }

  get host(): string {
    return this._host;
  }

  get ssl(): boolean {
    return this._ssl;
  }

  get publishPath(): string {
    return this._publishPath;
  }

  get baseUrl(): string {
    return `${this.ssl ? 'https' : 'http'}://${this.host}`;
  }
}
