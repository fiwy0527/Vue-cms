<template>
    <div class="shopcar-container">

       <div class="goods_list">
            <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                
                    <mt-switch ></mt-switch>
                    <img src="//img.alicdn.com/imgextra/i1/1114511827/O1CN01DBD6XE1PMo5r94Zj7_!!1114511827.jpg_250x250Q90.jpg" >
                    <div class="info">
                        <h1>ddd</h1>
                        <p>
                            <span class="price">￥2355</span>
                            <numbox ></numbox>
                            <a href="#">删除</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等
                </div>
            </div>
        </div>
       </div>

    </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_numbox.vue'
export default {
    data(){
        return{
        }
    },
    
    methods:{
        
    },
    components:{numbox}
}
</script>

<style lang="scss" scoped>
.shopcar-container{
    background-color: #eee;
    overflow: hidden;
    .goods_list{
        .mui-card-content-inner{
            display: flex;
            align-items:center;
        }
        img{
             width: 60px;
        height: 60px;
        }
        h1{
            font-size: 14px;
        }
        .info{
            .price{color: red;}
        }
    }
}
</style>