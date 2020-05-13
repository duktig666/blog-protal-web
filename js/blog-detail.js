$(document).ready(function () {
    //侧边栏的vue
    let blogDetail = new Vue({
        el: '#blog-detail',
        data: {
            //博客信息
            blogInfos: {
                blog: {},
                blogType: {},
                blogLabels: [],
            },
            blogId: '', //博客id
            //默认头像
            options: [{
                id: 0,
                src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }, {
                id: 1,
                src: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
            }, {
                id: 2,
                src: 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
            }],
            headUrl: '', // 选中的头像 src
            observeContent: "",  //评论内容
            nickname: "", //游客昵称
            email: "", // 游客邮箱
            lastId: '',  //评论的lastId
            observes: [], //已经评论的集合
            defaultProps: {
                children: 'nextNodes',
                label: 'observeContent',
                id: 'id',
            },
            observeName: '', //评论谁
            observingContent: '', //待评论的内容
        },
        methods: {
            //查询此篇博客信息
            getBlogInfo() {
                $.get(baseUrl + "/api/blog/" + this.blogId,
                    function (data, status, xhr) {
                        blogDetail.blogInfos.blog = data.blog;
                        blogDetail.blogInfos.blogType = data.blogType;
                        blogDetail.blogInfos.blogLabels = data.blogLabelList;
                        //加载博客正文的HTML结构
                        $("#blog-content").html(blogDetail.blogInfos.blog.contentHtml);
                    }, "json").fail(function (error) {
                    blogDetail.$message({
                        showClose: true,
                        message: "查询博客详情失败",
                        type: 'error'
                    });
                });
            },
            //查询此篇博客的所有评论信息
            getBlogObserve() {
                $.get(baseUrl + "/api/observe/" + this.blogId,
                    function (data, status, xhr) {
                        blogDetail.observes = data;
                    }, "json").fail(function (error) {
                    blogDetail.$message({
                        showClose: true,
                        message: "查询博客评论失败" + error.responseJSON.message,
                        type: 'error'
                    });
                });
            },
            //保存博客评论
            saveBlogObserve() {
                $.ajax({
                    url: baseUrl + "/api/observe",
                    dataType: "text",
                    type: "post",
                    data: {
                        "nickname": this.nickname,// 昵称
                        "email": this.email,// 邮箱
                        "picture": this.headUrl, //头像
                        "blogId": this.blogId, //博客id
                        "observeContent": this.observeContent,// 留言内容
                        "lastId": this.lastId,
                    },
                    success: function (data, status, xhr) {
                        blogDetail.$message({
                            showClose: true,
                            message: "新增评论成功",
                            type: 'success'
                        });
                        blogDetail.getBlogObserve();
                        blogDetail.getBlogInfo();
                        blogDetail.clearObserveUser();
                    },
                    error: function (error) {   //请求失败后的回调方法
                        console.log(error)
                        blogDetail.$message({
                            showClose: true,
                            message: "新增评论失败：" + error.responseText.message,
                            type: 'error'
                        });
                    }
                });
            },
            //获取评论的lastId
            getLastId(node) {
                this.lastId = node.id;
                this.observeName = '正在评论:' + node.user.nickname;
                this.observingContent = '待评论的内容：' + node.observeContent;
                console.log(this.observeName)
                //jquery的锚点跳转
                $("html,body").animate({scrollTop: $('#blog-observe').offset().top}, 200)
            },
            //重置评论对象
            clearObserveUser() {
                //前台显示的内容
                this.observeName = '';
                this.observingContent = '';
                //向后台请求的内容
                this.lastId = '';
                this.nickname = '';// 昵称
                this.email = '';// 邮箱
                this.headUrl = ''; //头像
                this.observeContent = '';// 评论内容
            },
            //进入博客详情页，博客的浏览量+1
            increaseViewCount() {
                if ($.cookie("viewId") !== this.blogId) {
                    $.ajax({
                        url: baseUrl + "/api/blog/increase-view-number/" + this.blogId,
                        dataType: "text",
                        type: "put",
                        success: function (data, status, xhr) {
                            //设置过期时间为1h
                            let date = new Date();
                            date.setTime(date.getTime() + 60 * 60 * 60 * 1000);
                            $.cookie("viewId", blogDetail.blogId, {"path": "/",}, {expires: date});
                        },
                        error: function (error) {
                            blogDetail.$message({
                                showClose: true,
                                message: error.responseJSON.message,
                                type: 'error'
                            });
                        }
                    });
                }
            },
            //点击点赞，增加博客的点赞量
            increaseLikeCount() {
                if ($.cookie("likeId") !== this.blogId) {
                    $.ajax({
                        url: baseUrl + "/api/blog/increase-like-number/" + this.blogId,
                        dataType: "text",
                        type: "put",
                        success: function (data, status, xhr) {
                            //设置过期时间为1h
                            let date = new Date();
                            date.setTime(date.getTime() + 60 * 60 * 60 * 1000);
                            $.cookie("likeId", blogDetail.blogId, {"path": "/",}, {expires: date});
                        },
                        error: function (error) {   //请求失败后的回调方法
                            blogDetail.$message({
                                showClose: true,
                                message: error.responseJSON.message,
                                type: 'error'
                            });
                        }
                    });
                }else{
                    blogDetail.$message({
                        showClose: true,
                        message: "您已经点过赞啦！",
                        type: 'success'
                    });
                }
            },
        },
        mounted() {
            this.getBlogInfo();
            this.getBlogObserve();
            this.increaseViewCount();
        },
        created() {
            this.blogId = window.location.search.substr(1);
        }
    });
});
