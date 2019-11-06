/* *
 * Created by render on 2019/11/5
 * */
import {ItemOptions, StgOptions} from "./index";

export as namespace Storage;

export = BetterStorage;

declare class BetterStorage {

  constructor(stgOptions: StgOptions);

  public set(key: string, value: any, options?: ItemOptions): void

  public remove(key: string): void

  public get(key: string): any

  readonly keys: string[]

  readonly length: number

  public clear(): void

  public readable(): void
  public unreadable(): void

}

declare namespace BetterStorage {
  export interface defaultStgOptions {
    expires?: number;
    secret?: boolean;
    AES?: {
      secret?: string;
      iv?: string;
    };
  }

  export interface StgOptions extends defaultStgOptions {
    storage: Storage;
    prefix: string;
  }

  export interface ItemOptions {
    expires?: number;
    secret?: boolean;
  }

  export interface StgItem {
    expires: number;
    signature: string;
    secret: boolean;
    value: string;
  }
}
