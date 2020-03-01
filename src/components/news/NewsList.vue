<template>
    
    <div>
		<!-- 因为每次点击单独的新闻都要跳转到新的路由,所以需要把所有的a标签改造为router-link -->
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.title">
					<router-link :to="'/home/newsinfo/'+item.id">
						<!-- <img class="mui-media-object mui-pull-left" src=""> -->
						<div class="mui-media-body">
							<h1>{{item.title}}</h1>
							<p class='mui-ellipsis'>
                                <span>发表时间:{{item.userId |dataFormat('YYYY-MM-DD HH:mm:ss')}}</span>
                                <span>点击次数:{{item.id}}</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>
		<mt-button type="danger" size="large" @click="loadMore()">加载更多</mt-button>
    </div>

</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data(){
		return{
			newslist:[],
			pageIndex:20
		}
	},
	created(){
		this.getNewsList()
	},
	methods:{
		getNewsList(){
			this.$http.get('albums')
				.then((res)=>res.json())
				.then(data=>{
					this.newslist=data
					this.newslist.splice(this.pageIndex,80)
				})
		},
		loadMore(){
            this.$http.get('albums')
                .then(res=>res.json())
                .then(data=>{
                    this.newslist=data;
                    this.newslist.splice(this.pageIndex+10,70)
                    this.pageIndex+=10
                    if(this.pageIndex===40){
                        this.pageIndex=30
                        this.newslist.splice(40,60)
                        Toast('无更多数据')
                    }
                })
        },
	}
}
</script>

<style  scoped>
.mui-table-view li h1{
    font-size: 14px
}
.mui-ellipsis{
    font-size:12px;
    color: #226aff; 
    display: flex;
    justify-content: space-between;
}
</style>>
