<template>
    <div>
        <br>
        <br>
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="最多输入120字" maxlength="120" v-model="val"></textarea>
        <hr>
        <mt-button type="primary" size="large" @click="postComment()">发表评论</mt-button>
        <hr>
        <div class="cmt-list" v-for="(item,i) in comments" :key='item.id'>
            <div class="cmt-item">
                <div class="cmt-title">
                    第{{i+1}}楼 &nbsp;&nbsp;用户:{{item.id}} &nbsp;&nbsp; 发表时间: {{item.userId |dataFormat('YYYY-MM-DD HH:mm:ss')}}
                </div>
                <div class="cmt-body">
                    {{item.title}}
                </div>
            </div>
        </div>
        <hr>
        <mt-button type="danger" size="large" @click="loadMore()">加载更多</mt-button>
    </div>
</template>


<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            val:'',
            comments:[],
            pageIndex:10
        }
    },
    created(){
        this.getComment()
    },
    methods:{
        // 获取评论
        getComment(){
            this.$http.get('albums')
                .then(res=>res.json())
                .then(data=>{
                    this.comments=data;
                    this.comments.splice(this.pageIndex,90)
                })
        },
        // 加载更多评论
        loadMore(){
            this.$http.get('albums')
                .then(res=>res.json())
                .then(data=>{
                    this.comments=data;
                    this.comments.splice(this.pageIndex+10,90)
                    this.pageIndex+=10
                    if(this.pageIndex===30){
                        this.pageIndex=20
                        this.comments.splice(30,90)
                        Toast('无更多数据')
                    }
                })
        },
        // 发表评论
        postComment(){
            var comment={id:this.pageIndex+1,userId:1,title:this.val}
            if(this.val.trim().length===0){
                Toast('评论内容不能为空')
                return
            }else{
                this.comments.unshift(comment)
                this.val=''
            }
        },
        // 发表评论
        // 1.文本框做双向绑定,为发表按钮绑定点击事件
        // 2.检验评论区是否为空，如果为空，Toast提示用户并返回
        // 3.通过vue-resource发送请求，把评论内容提交给服务器
        // 4.当评论提交完成时重新刷新列表
        //  +如果调用 getComment 方法重新刷新列表时，只能得到最后一页的评论，
        // 5.当评论成功时，服务器返回一个正确提示，把最新的评论手动拼接到第一行
    }
}
</script>


<style lang="css" scoped>
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-title{
        line-height: 35px;
        background-color: #ccc;
    }
    .cmt-item{
        font-size: 13px;
    }
    .cmt-body{
        line-height: 35px;
        text-indent: 2em;
    }
</style>