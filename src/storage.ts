/* *
 * Created by render on 2019/11/5
 * */
import {defaultStgOptions, StgOptions, StgItem, ItemOptions} from '../index'
import {encrypt, decrypt, sign, setSecret} from './utils'

const defaultOptions: defaultStgOptions = {
  expires: 0,
  secret: false,
  AES: {
    secret: '30D17839695CB24C',
    iv: '8BCAB84D2148034C',
  },
};

export class BetterStorage {
  readonly stg: Storage;
  readonly prefix: string;
  readonly expires: number;
  readonly secret: boolean;
  private lockGet: boolean;

  constructor(options: StgOptions) {
    const {
      storage, prefix, expires, secret = false, AES,
    } = {...defaultOptions, ...options};

    setSecret(AES.secret, AES.iv);
    this.secret = secret;
    this.stg = storage;
    this.prefix = prefix;
    this.expires = expires;
    this.lockGet = false;
  }

  private stgKey(key: string): string {
    return `@${this.prefix}/${key}`;
  }

  public set(key: string, value: any, options?: ItemOptions): void {
    let {
      secret = this.secret,
      expires = this.expires
    } = (options || {});

    expires > 0 && (expires += Date.now());
    const valueStr = JSON.stringify(value);

    const value2Save: string = secret ? encrypt(valueStr) : value;
    const signature: string = sign(value2Save + expires);

    const data: StgItem = {
      secret,
      expires,
      signature,
      value: value2Save,
    };

    this.stg.setItem(this.stgKey(key), JSON.stringify(data));
  }

  public remove(key: string): void {
    this.stg.removeItem(this.stgKey(key));
  }

  public get(key: string): any {
    this.checkReadable();
    const item: StgItem | null = JSON.parse(
      this.stg.getItem(this.stgKey(key))
    );
    if (item === null) return null;

    const {expires, secret, signature, value} = item;

    // 校验签名与是否过期
    if (
      (expires !== 0 && Date.now() > expires) ||
      sign(value + expires) !== signature
    ) {
      this.remove(key);
      return null;
    }

    return secret ? JSON.parse(decrypt(value)) : value;
  }

  get keys(): Array<string> {
    const keys: string[] = [];
    const regexp = new RegExp(`^@${this.prefix}/`);
    for (let i = 0, len = this.stg.length; i < len; i++) {
      const key = this.stg.key(i);
      if (regexp.test(key)) {
        keys.push(key.replace(regexp, ''));
      }
    }
    return keys;
  }

  public clear(): void {
    this.keys.forEach(this.remove, this);
  }

  get length(): number {
    return this.keys.length;
  }

  private checkReadable() {
    if (this.lockGet) {
      throw new Error('this storage is unreadable for now!');
    }
  }

  public readable() {
    this.lockGet = false;
  }
  public unreadable() {
    this.lockGet = true;
  }

}
