<template>
    <div class="goods-list">
        <!-- <router-link class="goods-item" v-for="item in goodslist" :key="item.id" tag="div" :to="'/home/goodsinfo/'+item.id"> 
            <img v-lazy="item.img_url" >
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">${{item.sell_price}}</span>
                    <span class="old">${{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>{{item.zhaiyao}}</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link> -->


        <!--vue中提供router-link实现跳转,也提供了编程式跳转 -->
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="getDetail(item.id)"> 
            <img v-lazy="item.img_url" >
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">${{item.sell_price}}</span>
                    <span class="old">${{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>{{item.zhaiyao}}</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>

        <mt-button type="danger" size="large" @click="getMore()">加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            goodslist:[],
            pageIndex:1
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        getGoodsList(){
            fetch('../../data/goods'+this.pageIndex+'.json' )
                .then(res=>res.json())
                .then(data=>{
                    // this.goodslist=data
                    // 要将第二页的数据拼接到goodslist里面
                    this.goodslist=this.goodslist.concat(data)
                })
        },
        getMore(){
           if(this.pageIndex>=3){
                Toast('没有更多信息了')
                return
           }else{
               this.pageIndex++
               this.getGoodsList()
           }
        },
        // 使用 js 的形式进行路由导航
        // this.$route 和this.$router的区别
        // this.$route 是路由参数对象, 所有路由中的参数,params,query属于它
        // this.$router 是一个路由导航对象,用它可以方便的使用js代码,实现路由的前进后退
        getDetail(id){
            // 1.
            // this.$router.push("/home/goodsinfo/"+id)
            // 2.传递对象
            // this.$router.push({path:"/home/goodsinfo/" +id})
            // 3.传递命名的路由
            this.$router.push( {name:"goodsinfo",params:{id}})
        }
    }
}
</script>


<style scoped lang="scss">
.goods-list{
    display: flex;
    flex-wrap: wrap;
    .goods-item{
        width: 48%;
        margin: 4px;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img{
            width: 100%;
        }
        .title{
            font-size: 14px;
        }

        .info{
            background-color: #ddd;
            p{
                margin: 0;
                padding: 5px;
            }
            .price{
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size:12px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }
        }
    }
}
</style>