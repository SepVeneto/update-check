# @sepveneto/update-check

定时查询版本更新

## 使用

```cmd
pnpm i @sepveneto/update-check
```


<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Starter from '@sepveneto/update-check/vite'

export default defineConfig({
  plugins: [
    Starter({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('@sepveneto/update-check/webpack')({ /* options */ })
  ]
}
```

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('@sepveneto/update-check/webpack').default({ /* options */ }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import Starter from '@sepveneto/update-check/esbuild'

build({
  plugins: [Starter()],
})
```

<br></details>

```js
// main.ts/main.js
import { onUpdate } from '@sepveneto/update-check'
onUpdate(() => {
  /**
   * 询问用户是否需要刷新页面
   */
})
```

## 选项

| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :---- | :--- |
| timer | number | 60 * 1000 | 检查的间隔，单位毫秒 |
| base | string | '' | 版本文件的访问位置 |
| cache | no-cache, storage | storage | 文件的缓存策略，默认是强缓存stroag，如果设置为no-cache，则不会携带时间戳 |
| once | boolean | false | 是否只在应用打开时检查版本号 |
| immediate | boolean | false | 是否在定时器创建时立即执行一次查询 |

关于`base`:
一般保持与vite中的`base`或是webpack/vue-cli中的`publicPath`一致即可，但是当其配置为`./`或`auto`需要设置为具体的地址

## 方法

| 名称 | 参数 | 说明 |
| :--- | :--- | :-- |
| onUpdate | function | 当版本发生变动时执行 |
| check | - | 手动向worker下发版本查询任务，如果有更新会触发`onUpdate` |

## 原理

1. 项目构建时在公共目录生成版本文件
2. 依赖worker创建定时器，向服务器请求版本并比较，当版本变动时通知主线程

### 注意
1. 仅通知一次
2. 一旦版本文件请求失败，会立即销毁线程