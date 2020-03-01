<template>
    <div>

        <!-- 轮播图插件 -->
       <swiper :lunboList="lunboList" :isfull="false"></swiper>



        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-6 ">
                <router-link to="/home/newList" >
                    <span class="mui-icon mui-icon-location"></span>
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-6">
                <router-link to="/home/photolist">
                    <span class="mui-icon-extra mui-icon-extra-heart-filled"></span>
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-6">
                <router-link to="/home/goodslist" >
                    <span class="mui-icon mui-icon-extra mui-icon-extra-cart"></span>
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-6">
                <a href="#">
                    <span class="mui-icon mui-icon-email"></span>
                    <div class="mui-media-body">留言反馈</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-6">
                <a href="#">
                    <span class="mui-icon mui-icon-search"></span>
                    <div class="mui-media-body">视屏专区</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-6">
                <a href="#">
                    <span class="mui-icon mui-icon-phone"></span>
                    <div class="mui-media-body">联系我们</div>
                </a>
            </li>
        </ul> 
    </div>
</template>

<script>
// 导入轮播图子组件
import swiper from '../subcomponents/swiper.vue'
export default {
    data(){
        return{
            currentIndex:0,
            lunboList:[]
        }
    },
    created(){
        this.getLunbotu()
    },
    methods:{
        getLunbotu(){ //远程获取轮播图
            this.$http.get('photos')
                .then(response=>response.json())
                .then((data)=>{
                    for(var i=0;i<3;i++){
                        this.lunboList.push(data[i])
                    }
                })
                .catch(err=>console.log(err))
        },
        
    },
    components:{
        swiper
    }
}
</script>

<style  scoped>

</style>