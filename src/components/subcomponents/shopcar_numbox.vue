<template>
    <div class="mui-numbox" data-numbox-min='1' style="height:25px">
        <button class="mui-btn mui-btn-numbox-minus" type="button" @click="deccount">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="val"   ref="numbox" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button" @click="addcount">+</button>
    </div>
</template>


<script>
import mui from '../../lib/mui/js/mui.min.js'

export default {
    mounted(){
        mui('.mui-numbox').numbox()
    },
    data(){
        return{
            val:1
        }
    },
    created(){
        this.getVal()
    },
    methods:{
        getVal(){ //获取count值
            this.val=this.$store.getters.getAllCount
        },
        // changCount(){
        //     console.log(this.$refs.numbox.value)
        // }
        addcount(){
            this.$store.commit('addcount')
        },
        deccount(){
            this.$store.commit('deccount')
        }
    },
}
</script>



<style>


</style>