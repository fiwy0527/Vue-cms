
<template>
    <!--根组件  -->
    <div class="app-container">
        <!-- header -->
        <!-- <mt-header fixed title="APP"></mt-header> -->
        <header id="header" class="mui-bar mui-bar-transparent">
			<a class=" mui-icon mui-icon-left-nav mui-pull-left" @click="goBack()"></a>
            <!-- mui-action-back -->
			<h1 class="mui-title">APP</h1>
		</header>
        <!-- 中间路由 router-view区域 -->
        <transition mode="out-in">
			<router-view ></router-view>
		</transition>
        <!-- footer -->
        <nav class="mui-bar mui-bar-tab">
			<router-link to="/home" class="mui-tab-item-fwx" >
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link to="/member" class="mui-tab-item-fwx" >
                <!-- <span class="mui-badge"></span> -->
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link to="/shopcart" class="mui-tab-item-fwx" >
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge" id='badge'>{{$store.state.count}}</span>
                </span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link to="/search" class="mui-tab-item-fwx">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
            
		</nav>
        
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1);//返回上一层
        },
    }
}
</script>

<style  scoped>
*{
    touch-action: none;
}
.mint-header{
    z-index: 99;
}
#header{
    z-index: 99;
    background-color:rgba(42,83,205,.7);
    height: 39px;
}
.app-container{
	margin-top: 40px;
	padding-bottom:50px; 
	/* 清除动画时文字移动 */
	overflow-x: hidden;
}
.v-enter {
	opacity: 0;
	transform: translateX(100%);
}
.v-leave-to{
	opacity: 0;
	transform: translateX(-100%);
	position: absolute;
}
.v-enter-active,.v-leave-active{
	transition: all .5s ease;
}
/* 改类名,解决tabbar无法切换的问题 */
.mui-bar-tab .mui-tab-item-fwx.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-fwx {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-fwx .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-fwx .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>