/* *
 * Created by render on 2019/11/5
 * */
import CryptoJS from '../cryptoJS/aes'

let SECRET_KEY = parseStr('30D17839695CB24C');
let IV = parseStr('8BCAB84D2148034C');

function parseStr(str: string): string {
  return CryptoJS.enc.Utf8.parse(str)
}

export function setSecret(key: string, iv: string): void {
  SECRET_KEY = parseStr(key);
  IV = parseStr(iv);
}

export function encrypt(message: string): string {
  return CryptoJS.AES.encrypt(
    message,
    SECRET_KEY,
    {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }
  ).toString();
}

export function decrypt(secret: string): string {
  return CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(secret, SECRET_KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }));
}

export function sign(data: string): string {
  return CryptoJS.HmacSHA1(data, SECRET_KEY).toString().toUpperCase();
}
