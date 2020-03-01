<template>
    <div class="newsinfo-container">
        <h3 class="title">新闻标题</h3>
        <p class="subtitle">
            <span>发表时间:{{this.Ctime |dataFormat('YYYY-MM-DD HH:mm:ss')}}</span>
            <span>点击次数:{{id}}</span>
        </p>
        <hr>
        <div class="content">6846464ds6a54d65a4d6a54d65a4s6d5sa4d65a4d654</div><hr>
        <comment-box></comment-box>
    </div>
</template>


<script>
// 导入评论组件
import comment from '../subcomponents/comment.vue'
export default {
    data(){
        return{
            id:this.$route.params.id,
            Ctime:new Date()
        }
    },
    methods:{
    },
    components:{'comment-box':comment}
}
</script>


<style lang="css" scoped>
.newsinfo-container{
    padding: 0 4px;
    
}
.title{
    font-size: 16px;
    text-align: center;
    margin: 15px 0 ;
    color: red;
    }
.subtitle{
    font-size: 13px;
    color:#226aff;
    display: flex;
    justify-content: space-between;
}
</style>