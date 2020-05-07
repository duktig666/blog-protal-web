$(document).ready(function () {
    // 轮播图
    new Vue({
        el: '#carousel',
        data: {
            items: [
                {url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'},
                {url: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'},
                {url: 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'},
            ]
        }
    });
    // 博客信息渲染
    var blogList = new Vue({
        el: "#blogList",
        data(){
            return({//使用data返回数据，使其只改变当前组件的信息，而不是改变全局的信息
                items:[],
                totalSize: 0,// 总条数
                //分页信息
                pageInfo: {
                    currentPage: 1, //当前页
                    rows: 10, //每页大小
                    sort: "", //排序方式
                },
            })
        },
        mounted() {
          this.getBlogs();
        },
        watch: {
            pageInfo: { // 监视pageInfo属性的变化
                deep: true, // deep为true，会监视pageInfo的属性及属性中的对象属性变化
                handler() {
                    // 变化后的回调函数
                    this.getBlogs();
                }
            },
        },
        methods: {
            getBlogs() {
                $.ajax({
                    url: ""+baseUrl+"/api/blog/all/single",
                    dataType:"json",
                    type:"get",
                    data:{
                        "currentPage": this.pageInfo.currentPage,// 当前页
                        "rows": this.pageInfo.rows,// 每页大小
                        "sort": null,// 排序字段
                        blogDimSearchStr: null, // 博客模糊查询所需数据
                    },
                    success:function(data) {
                        blogList.items=data.items;
                        blogList.totalSize = data.total;
                        console.log(blogList.items)
                    }
                })
            },
            //当前条数改变
            handleSizeChange(val) {
                this.pageInfo.rows = val;
            },
            //当前页改变
            handleCurrentChange(val) {
                this.pageInfo.currentPage = val;
            },
        },

    })
})
