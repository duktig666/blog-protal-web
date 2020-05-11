$(document).ready(function () {
    //侧边栏的vue
    var timeLine = new Vue({
        el: '#time-line',
        data: {
            //博客信息
            blogInfos: [],
            timeSpanStyle: {
                float: 'right',
            },
            blogTitleStyle: {
                textAlign: 'right',
            },
            //随机颜色
            randomColor: [],
            //当前页
            currentPage: 1,
            //每页数量：
            rows: 2,
        },
        watch: {
            currentPage: {
                handler() {
                    this.getBlogs();
                }
            }
        },
        methods: {
            getBlogs() {
                $.get(baseUrl + "/api/blog/all/single",
                    {
                        currentPage: this.currentPage,
                        rows: this.rows,
                        sort: 'create_date desc'
                    },
                    function (data, status, xhr) {
                        timeLine.blogInfos = timeLine.blogInfos.concat(data.items);
                        for (let i = 0; i < data.items.length; i++) {
                            timeLine.randomColor.push(getRandomColor());
                        }
                    }, "json").fail(function (error) {
                    timeLine.$message({
                        showClose: true,
                        message: error.responseJSON.message+" 已经到底了",
                        type: 'warn'
                    });
                });
            },
            findBlogTimeLine(blogId){
                window.open("../html/blog-detail.html?"+blogId);
            },
        },
        mounted() {
            this.getBlogs();
        },
    });

    //点击查看更多，加载更多博客，每次默认加载20条
    $('#time-find-more').click(function () {
        timeLine.currentPage++;
    });


});
