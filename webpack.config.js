const path = require('path')  //导入nodejs中专门操作路径的模块
const HtmlWebpackPlugin = require('html-webpack-plugin')  //预加载页面的构造函数
const htmlPlugin =new HtmlWebpackPlugin({  //创建预加载插件的实例对象
    template:'./src/index.html', //指定要用到的模板文件
    filename:'index.html'       //指定生成的文件的名称，改文件存在于内存中，在目录中不显示
})
const autoprefixer =require('autoprefixer')   //导入自动添加兼容前缀插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 向外暴露一个配置对象
module.exports ={
    //编译模式
    mode:'development',
    entry:path.join(__dirname,'./src/main.js'),   //打包入口文件的路径
    output:{
        path:path.join(__dirname,'./dist'),  //输出文件的路径
        filename:'bundle.js'    //输出文件的名称
    },
    plugins:[  //挂载插件的对象
        htmlPlugin , //挂载页面预加载插件
        new VueLoaderPlugin(),
        autoprefixer
    ],  
    module:{
        rules:[
            {test:/\.css$/ , use: ['style-loader' , 'css-loader' ,'postcss-loader']}, //css-loader 的规则
            {test:/\.less$/ , use: ['style-loader' , 'css-loader','less-loader']}, //less -loader 的规则
            {test:/\.scss$/ , use: ['style-loader' , 'css-loader' ,'sass-loader']}, //sass-loader 的规则
            {
                test :/\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
                use : ['url-loader?limit =16940']
            }, //图片和字体样式的规则
            {test:/\.js$/ ,use: 'babel-loader' ,exclude :/node_modules/},  //处理js 中高级语法的规则
            {test:/\.vue$/ ,loader:'vue-loader'},
        ]
    },
    // vue配置
    // resolve:{
    //     alias:{
    //         "vue$":"vue/dist/vue.js"
    //     }
    // }
}