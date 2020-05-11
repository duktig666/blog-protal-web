$(document).ready(function () {
    //导航栏的vue
    const top = new Vue({
        el: '#top',
        data: {
            search: '',
            activeIndex: "1",
            centerDialogVisible: false,//搜索弹出框默认关闭
            blogInfos:[], //搜索后的结果
            totalSize: 0,// 总条数
            //分页信息
            pageInfo: {
                currentPage: 1, //当前页
                rows: 10, //每页大小
                sort: "", //排序方式
            },
        },
        watch: {
            search: { // 监视search的变化
                handler() {
                    // 变化后的回调函数，这里我们再次调用getDataFromServer即可
                    this.getBlogs();

                }
            },
        },
        methods: {
            handelSearch(val) {
                if (val != null) {
                    console.log(val)
                }
            },
            getIndex() {
                //截取#后的数字
                this.activeIndex = window.location.hash.substr(1);
            },
            // 是否关闭搜索弹出框
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.search="",
                        this.blogInfos=[],
                        done();
                    })
                    .catch(_ => {});
            },
            getBlogs() {
                $.ajax({
                    url: ""+baseUrl+"/api/blog/all/single",
                    dataType:"json",
                    type:"get",
                    data:{
                        "currentPage": this.pageInfo.currentPage,// 当前页
                        "rows": this.pageInfo.rows,// 每页大小
                        blogDimSearchStr: this.search, // 博客模糊查询所需数据
                    },
                    success:function(data) {
                        top.blogInfos=data.items;
                        top.totalSize = data.total;
                    }
                })
            },
            //跳转博客详情页
            findBlogDetail(blogId){
                window.open("../html/blog-detail.html?"+blogId);
            },
            //点击查看更多，加载更多博客，每次默认加载5条
            getBlogMore() {
                top.currentPage ++;
                console.log(top.currentPage)
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
        mounted() {
            this.getIndex();
        }
    });
});
