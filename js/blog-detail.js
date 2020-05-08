$(document).ready(function () {
    //侧边栏的vue
    let blogDetail = new Vue({
        el: '#blog-detail',
        data: {
            //博客信息
            blogInfos: {
                blog:{},
                blogType:{},
                blogLabels:[],
            },
            blogId: '', //博客id
        },
        methods: {
            getBlogInfo() {
                $.get(baseUrl + "/api/blog/" + this.blogId,
                    function (data, status, xhr) {
                        blogDetail.blogInfos.blog=data.blog;
                        blogDetail.blogInfos.blogType=data.blogType;
                        blogDetail.blogInfos.blogLabels=data.blogLabelList;
                        console.log(blogDetail.blogInfos)
                        //加载博客正文的HTML结构
                        $("#blog-content").html(blogDetail.blogInfos.blog.contentHtml);
                    }, "json").fail(function (error) {
                    blogDetail.$message({
                        showClose: true,
                        message: "查询博客详情失败",
                        type: 'error'
                    });
                });
            }
        },
        mounted() {
            this.getBlogInfo();
        },
        created(){
            this.blogId=window.location.search.substr(1);
        }
    });


});