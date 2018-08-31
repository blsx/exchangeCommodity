# exchange

> vue project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



vuex的理解

同步的理解：
1)触发methods中的back()函数,
2)提交数据false
      methods: {
            back() {
              this.setFullScreen(false)
            },
            ...mapMutations({
              setFullScreen: 'SET_FULL_SCREEN',
            })
          }
          mapMutations辅助函数
          首先，组件中引入
          import {mapMutations} from 'vuex'
          其次，在methods中使用
3）back()函数中的
  this.setFullScreen
  对应mapMutations中的
  setFullScreen: 'SET_FULL_SCREEN',
4）mapMutations中的
  setFullScreen: 'SET_FULL_SCREEN',
  对应，mutation-types中的
  export const SET_FULL_SCREEN = 'SET_FULL_SCREEN'

  5）再到mutations中的

  [types.SET_FULL_SCREEN](state, flag) {
      state.fullScreen = flag
    },
  其中参数flag对应back()函数的参数false
6）通过mutations改变state的状态
7）state.fullScreen的状态变为false，映射到getters中
export const fullScreen = state => state.fullScreen

在通过mapGetters插入到组件中

...mapGetters([
   'fullScreen'
])
<div class="mini-player" v-show="!fullScreen" @click="open">

