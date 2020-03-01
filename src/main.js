//入口文件
import Vue from 'vue'
import App from './App.vue'


//  导入bootstrap 
import 'bootstrap/dist/css/bootstrap.css'
// 导入mui组件
import './lib/mui/css/mui.css'

// 引用icons-extra.css 时需要 fonts中的字体样式
import './lib/mui/css/icons-extra.css'
// 按需导入mint-ui组件
// import { Header,Swipe, SwipeItem, Button ,Lazyload } from 'mint-ui';
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Header.name, Header);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload)

// 因为懒加载问题不能显示，所以需要全部导入mint-ui
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

// 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入 vue-resource文件
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 可以全局配置 获取地址
Vue.http.options.root='http://jsonplaceholder.typicode.com'

// 导入路由文件
import router from './router.js'

// 导入格式化时间插件
import  moment from 'moment'

// 导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// 函数加载拿到本地存储中的数据
var car = window.JSON.parse(localStorage.getItem('car')||'[]')
// vuex 实例
const store = new Vuex.Store({
    state:{  //组件获取state里面的数据, this.$store.state.对象名
        car:car , //将购物车里面商品数据存储起来  、
        //购物城对象的数据格式 {id:$,count:要购买的数量,price:单价.selected：false}
        count:0
    },
    mutations:{  //组件调用mutations里面的方法, this.$store.commit('方法名'，按需传递唯一地参数)
        addToCar(state,goodsinfo){ //点击加入购物车保存数据到 car中
            //1.分析
            //2.如果购物车中,之前已经有对象的商品,只需要更新数据
            //3.如果没有,把商品数据 push到car数组中

            let flag=false  
            state.car.some(item=>{
                if(item.id===goodsinfo.id){
                    item.count+=parseInt(goodsinfo.count)
                    flag=true
                    return true 
                }
            });
            if(!flag){
                state.car.push(goodsinfo)
            }
            //当更新完car时，把car存储到本地localStorage中
            // 直接使用JSON.stringify(state.car)会报错,必须加入window对象
            localStorage.setItem('car',window.JSON.stringify(state.car))
        },
        addcount(state){
            state.count++
        },
        deccount(state){
            state.count--
        }
    },
    getters:{  //this.$store.getters.对象名   类似于computed属性
        getAllCount(state){
            let count=0
            state.car.forEach(item=>{
                state.count+=item.count
            });
            count=state.count
            return count
        },
    }
})

//定义全局过滤器
Vue.filter('dataFormat',function(dataStr,pattern='YYYY-MM-DD HH:mm:ss'){
   return moment(dataStr).format(pattern)
})

let vm=new Vue({
    el:'#app',
    render:(createElement)=>createElement(App),
    router ,  //挂载路由对象
    store  //挂载状态管理对象
})