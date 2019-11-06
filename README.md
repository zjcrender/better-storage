<h1 align="center">Welcome to better-storage 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/better-storage" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/better-storage.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

## 安装

```sh
npm install better-storage
```

## 示例

```javascript
import BetterStorage from "better-storage";

const stg = new BetterStorage({
  storage: localStorage,         // localStorage or sessionStorage
  prefix: 'BIU',
  expires: 0,
  secret: false,
  secretKey: '30D17839695CB24C', // AES secret key
  iv: '8BCAB84D2148034C'         // AES IV
})

stg.set('test', 'some value', {
  expires: 1000, // 1秒后过期
  secret: true,  // 加密存储
})
```

### API

#### 参数说明
instanceConfig: 

| 属性 | 说明 | 类型 | 是否必填 | 默认值 | 
| -------- | ----- | ---- | ---- | ---- |
| storage | storage类型，为localStorage或sessionStorage | Storage | 否 | localStorage |
| prefix | 存储的key的前缀| string | 是 | -- |
| expires | 存储持续时间，为0则不过期 | number | 否 | 0 |
| secret | 存储时是否加密 | boolean | 否 | false |
| secretKey | 加密存储时的AES secret key，为8n位的16进制字符 | string | 否 | 30D17839695CB24C |
| iv | 加密存储时的AES IV，为8n位的16进制字符 | string | 否 | 8BCAB84D2148034C |

setConfig:

| 属性 | 说明 | 类型 | 是否必填 | 默认值 | 
| -------- | ----- | ---- | ---- | ---- |
| expires | 存储持续时间，为0则不过期 | number | 否 | 取自instance config |
| secret | 存储时是否加密 | boolean | 否 | 取自instance config |

storageValue

| 属性 | 说明 | 类型 |
| -------- | ----- | ---- | 
| expires | 过期的时间戳 | number |
| secret | 是否被加密 | boolean | 
| value | 被存储的数据 | any | 
| signature | 签名，用于读取时校验数据是否被更改 | string | 


#### 创建实例
constructor(options: instanceConfig): storageInstance
```javascript
const stg = new BetterStorage({
  storage: localStorage,
  prefix: 'BIU',
  expires: 0,
  secret: false
})
```

#### set(key: string, value: any, config: setConfig): void
向storage中存数据
```javascript
stg.set('hello', 'world')

/* 存储结果
'@BIU/hello'
{
  "secret":false,
  "value":"world",
  "expires":0,
  "signature":"8E162389DE1AB8B27CB8D41C17AC94AD08721FC7"
}
*/

stg.set('hello', 'world', {
  secret: true,
  expires: 2000,
})

/* 存储结果
'@BIU/hello'
{
  "secret":true,
  "value":"e1FcAN/aPkJR/dCAWIl10Q==",
  "expires":1573025822648,
  "signature":"1A867EFC666516B7B0E7CC4552EFA969106A907F"
}
*/
```

#### get(key: string): any
从storage中取数据，未取到时返回null
```javascript
const result = stg.get('hello') // "world"
```

#### remove(key: string): void
从storage中移除相应数据
```javascript
stg.remove('hello')

stg.get('hello') // null
```

#### clear(): void
移除所有由该实例存入的数据
````javascript
localStorage.setItem('hi', 'hi from origin');
stg.set('hi', 'hi from stg');
stg.set('hello', 'hello from stg');

localStorage.getItem('hi') // "hi from origin"
stg.get('hi') // "hi from stg"
stg.get('hello') // "hello from stg"

stg.clear();
localStorage.getItem('hi') // "hi from origin"
stg.get('hi') // null
stg.get('hello') // null
````

#### readable(): void
允许调用Api get

#### unreadable(): void
禁止调用Api get
```javascript
stg.get('hello') // "world"

stg.unreadable()
stg.get('hello') // Error: this storage is unreadable for now!
```

#### keys: string[]
```javascript
stg.set('a', 1)
stg.set('b', 1)
stg.set('c', 1)

console.log(stg.keys) // ["a", "b", "c"]
```

#### length: number
```javascript
stg.set('a', 1)
stg.set('b', 1)
stg.set('c', 1)

console.log(stg.length) // 3
```

## Author

👤 **render**

* Github: [@zjcrender](https://github.com/zjcrender)

