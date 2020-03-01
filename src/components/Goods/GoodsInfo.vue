<template>
    <div class="goodsinfo-container">
        <!-- 动画小球 -->
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
        >
        <!-- ref是vue.js提供的组件绑定的dom操作 -->
            <div class="ball" v-show="ballFlag" ref="ball"></div>

        </transition>

        <!-- 轮播图 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunboList="lunboList" :isfull="true"></swiper>
					</div>
				</div>
		</div>

        <div class="mui-card">
            <div class="mui-card-header">{{lunboList[pageIndex].title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="info">
                        <p class="price">
                            <span class="old">市场价:${{lunboList[pageIndex].market_price}}</span>
                            &nbsp;&nbsp;
                            <span class="now">销售价:${{lunboList[pageIndex].sell_price}}</span>
                        </p>
                        <!-- 数字按钮控件 -->
                        <p>购买数量:<numbox style="margin-left:20px" @getcount='getSelectedCount' :max='lunboList[pageIndex].stock_quantity'></numbox></p>

                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" style="margin-left:10px" 
                            @click="addToShopCart()">加入购物车</mt-button>
                            <!-- 子组件向父组件传值
                                父向子传递方法，子组件调用方法,同时把数据当做参数传递给这个方法
                                -->
                        </p>
                        </div>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header mui-card-media" style="">商品參數</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:{{lunboList[pageIndex].id}}</p>
                    <p>库存情况:{{lunboList[pageIndex].stock_quantity}}</p>
                    <p>上架时间:{{lunboList[pageIndex].add_time}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" @click="goDesc(pageIndex)">图片介绍</mt-button>
                <mt-button type="danger" size="large" @click="goCommnet(pageIndex)">商品评价</mt-button>
            </div>
        </div>
    </div>
</template>


<script>
// 轮播图
import swiper from '../subcomponents/swiper.vue'
// 加减数字组件
import numbox from '../subcomponents/goodsinfo_numbox.vue'
export default {
    data(){
        return{
            pageIndex:this.$route.params.id,
            lunboList:[],
            ballFlag:false,
            selectedCount:1
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        getGoodsList(){
            fetch('../../data/goods'+this.pageIndex+'.json' )
                .then(response=>response.json())
                .then((data)=>{
                    for(var i=0;i<=this.pageIndex;i++){
                        this.lunboList.push(data[i])
                    }
                })
        },
        goDesc(pageIndex){   //点击使用编程式导航
            this.$router.push({name:'goodsdesc',params:{pageIndex}})
        },
        goCommnet(pageIndex){
            this.$router.push({name:'goodscomment',params:{pageIndex}})
        },
        addToShopCart(){  
            this.ballFlag=!this.ballFlag
            // 拼接出一个要保存到 vuex中state里面的数据
            let goodsinfo={
                id:this.pageIndex,
                count:this.selectedCount,
                price:this.lunboList[this.pageIndex].sell_price,
                selected:true
            }
            //调用state中的 mutations中的addToCar函数
            this.$store.commit('addToCar', goodsinfo)
        },
        beforeEnter(el){
            el.style.transform='translate(0,0)'
        },
        enter(el,done){
            // 开启动画标志
            el.offsetWidth;
            // 小球动画优化思路
            // 1.小球动画会因为位置问题和比例问题而出现问题
            // 动态计算坐标值
            // 纵轴减去纵轴距离，横轴减去横轴距离  domObject.getBoundingClientRect()


            // 获取小球在页面中的位置
            const ballposition =this.$refs.ball.getBoundingClientRect()
            // 获取app中徽标的位置
            const badgeposition=document.getElementById('badge').getBoundingClientRect()
            let xDist = badgeposition.left - ballposition.left
            let yDist = badgeposition.top - ballposition.top
            el.style.transform=`translate(${xDist}px,${yDist}px)`
            el.style.transition='all .5s cubic-bezier(.4,-0.3,1,.68)'
            done()
        },
        afterEnter(el){
            this.ballFlag=!this.ballFlag
        },
        // getcount事件一触发,该函数自动调用
        getSelectedCount(count){
            // this.selectedCount=document.getElementById('test').value
            this.selectedCount=count //当子组件把选中的数量传递给父组件是,把选中的值保存
        }
    },
    components:{swiper,numbox}
}
</script>



<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;
    .ball{
        position: absolute;
        z-index: 99;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        top: 396px;
        left: 169px;
        background-color: red;
    }
}
.mui-card-footer{
     display: block;
     button{
         margin-top: 10px;
     }
    }
.info{
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
    
}

</style>