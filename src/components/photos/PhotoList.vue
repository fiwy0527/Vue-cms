<template>

    <div class="photolist-container">
        <!-- 导航条 -->
        <div id="slider" class="mui-slider ">
            <div id="sliderSegmentedControl" 
            class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item ',item.id===0?'mui-active':'']" v-for="item in cates" :key="item.id"
                    @click="getPhotosById(item.id)">{{item.title}}</a>
                </div>
            </div>
        </div>

        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <!-- 为了防止样式问题,将router-link旋绕为li -->
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
                <img v-lazy='item.url'>
                <div class="info">
                    <div class="info-content">{{item.title}}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>


<script>
// 因为滑动块不能正常工作,需要导入mui.js
import mui from '../../lib/mui/js/mui.min.js'
    
export default {
    data(){
        return{
            cates:[],
            list:[]
        }
    },
    created(){
        this.getAllCates()
        this.getPhotos();
    },
    mounted(){  //当所有组件创建完成后调用, 如将下面函数暴露在外会出错
        mui(".mui-scroll-wrapper").scroll({
        deceleraion:0.0005
    })
    },
    methods:{
        getAllCates(){
            fetch('../../data/cates.json')
                .then(res=>res.json())
                .then(data=>{
                    data.unshift({title:"全部",id:0})
                    this.cates=data
                })
        },
        
        getPhotos(){
            this.$http.get('photos')
                .then(res=>res.json())
                .then(data=>{
                    for(var i=0;i<5;i++){
                        this.list.push(data[i])
                    }
                })
        },
        getPhotosById(cateid){
            this.$http.get('photos')
                .then(res=>res.json())
                .then(data=>{
                    this.list=[]
                    for(var i=cateid;i<cateid+5;i++){
                        this.list.push(data[i])
                    }
                })
        }
    }
}
</script>

<style lang='css' scoped>
    *{
        touch-action: none;
    }
    .photo-list{
        list-style: none;
        margin: 0;
        padding: 10px;
        padding-bottom: 0px;

    }
    .photo-list li{
        padding-bottom: 10px;
        background-color:#ccc;
        text-align: center;
        box-shadow: 0 0 6px #999;
        position: relative;
    }
    .photo-list img{
        width: 100%;
        vertical-align: middle;;
    }
    /* 设置懒加载样式 */
    img[lazy="loading"] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
    .info{
        color:white;
        text-align: left;
        position: absolute;
        bottom: 20px;
        background-color: rgba(0, 0, 0, .4);
    }
</style>