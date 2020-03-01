<template>
    
    <div>
        <h3>标题</h3>
        <p class="subtitle">
            <span>发表时间:{{this.Ctime |dataFormat('YYYY-MM-DD HH:mm:ss')}}</span>
            <span>点击次数:{{id}}</span>
        </p>
        <hr>
        <!-- 缩略图 -->
         
        <div class="thumbs">
           <img class='preview-img' v-for='(item,index) in list' 
           :src='item.src' height='100' @click='$preview.open(index,list)' :key="item.index">
        </div>

        <div class="content">{{photoinfo.title}}</div>
        <comment-box></comment-box>
    </div>
</template>


<script>

import comment from '../subcomponents/comment.vue'

export default {
    data(){
        return{
            id:this.$route.params.id,
            Ctime:new Date(),
            photoinfo:{},
            list:[{
                        src:'http://placekitten.com/600/400',
                        w:600,
                        h:400,
                    },{
                        src:'http://placekitten.com/600/400',
                        w:600,
                        h:400,
                    }]
        }
    },
    created(){
        this.getPhotoInfo()
    },
    methods:{
        getPhotoInfo(){
            this.$http.get('photos/'+this.id)
                .then(res=>res.json())
                .then(data=>{
                    this.photoinfo=data
                })
        },
        handleClose(){
            console.log("close")
        }
    },
    components:{'comment-box':comment}
}
</script>

<style lang="scss" scoped>
    // .thumbs{
    //     .my-gallery{
    //         display:flex;
    //         flex-wrap:wrap;
    //         figure{
    //             width:30%;
    //             margin:5px;
    //             img{
    //                 width:100%;
    //                 box-shadow:0 0 8px #999;
    //                 border-radius:5px;
    //             }
    //         }
    //     }
    // }
</style>
