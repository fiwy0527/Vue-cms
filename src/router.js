//路由文件
import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import shopCartContainer from './components/tabbar/shopCartContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'

// 新闻列表
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'


// 图片分享
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'

// 商品列表
import GoodsList from './components/Goods/GoodsList.vue'
import GoodsInfo from './components/Goods/GoodsInfo.vue'
import GoodsDesc from './components/Goods/GoodsDesc.vue'
import GoodsComment from './components/Goods/GoodsComment.vue'
//创建路由对象
const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:HomeContainer},
        {path:'/member',component:MemberContainer},
        {path:'/shopcart',component:shopCartContainer},
        {path:'/search',component:SearchContainer},
        {path:'/home/newList',component:NewsList},
        {path:'/home/newsinfo/:id',component:NewsInfo},
        {path:'/home/photolist',component:PhotoList},
        {path:'/home/photoinfo/:id',component:PhotoInfo},
        {path:'/home/goodslist',component:GoodsList},
        {path:'/home/goodsinfo/:id',component:GoodsInfo,name:'goodsinfo'},
        {path:'/home/goodsdesc/:id',component:GoodsDesc,name:'goodsdesc'},
        {path:'/home/goodscomment/:id',component:GoodsComment,name:'goodscomment'},

    ],
    linkActiveClass:'mui-active'
})
export default router