<template>
    <div>
        <!-- 轮播图组件 -->
        <!--轮播图应该是,父组件想子组件里传值 -->
         <mt-swipe :auto="3000">
            <mt-swipe-item v-for="item in lunboList" :key="item.id">
                <img :src="item.url||item.img_url" :class="{'full':isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    data(){return{}},
    props:['lunboList','isfull']
}
</script>

<style scoped>
.mint-swipe{
    height: 200px;
}

/* 因为不同的轮播图需要的样式不同所以可以重写样式 */
.full{
    height: 260px;
    width: 100%;
    background-color: #fff;
    text-align: center;
}

</style>