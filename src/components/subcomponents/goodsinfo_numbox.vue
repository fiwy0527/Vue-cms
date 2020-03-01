<template>
    <!-- 父组件传递来的max值,可能因为异步请求导致数据传递缓慢,从而使max为undefined -->
    <!-- 使用watch 监听 父组件传递来的值, -->
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>


<script>
import mui from '../../lib/mui/js/mui.min.js'

export default {
    mounted(){
        mui('.mui-numbox').numbox()
    },
    methods:{
        // 每当文本框数据修改,立即通过事件调用传递给父组件
        countChanged(){
            this.$emit('getcount',parseInt(this.$refs.numbox.value))
        }
    },
    props:['max'],
    watch: {
        // 因为data-numbox-max是标签的形式，无法直接dom操作,所以使用js
        'max':function(newval,oldval){
            mui(Selector).numbox().setOption('max',newval)
        }
    },
}
</script>



<style>


</style>