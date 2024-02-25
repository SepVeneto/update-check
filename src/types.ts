export interface Options {
  // define your plugin options here
  // 版本检查的间隔，单位毫秒
  timer?: number
  // 版本文件的公共路径，一般与构建时的base或publicPath一致即可
  base?: string
}
