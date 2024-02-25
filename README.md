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
      require('@sepveneto/update-check/webpack')({ /* options */ }),
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

关于`base`:
一般保持与vite中的`base`或是webpack/vue-cli中的`publicPath`一致即可，但是当其配置为`./`或`auto`需要设置为具体的地址

## 原理

1. 项目构建时在公共目录生成版本文件
2. 依赖worker创建定时器，向服务器请求版本并比较，当版本变动时通知主线程

### 注意
1. 仅通知一次
2. 一旦版本文件请求失败，会立即销毁线程