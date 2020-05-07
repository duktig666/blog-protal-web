$(document).ready(function () {
    const leaveWord = new Vue({
        el: '#leaveWord',
        data: {
            textarea:"",
            nickname: "", //游客昵称
            email: "", // 游客邮箱
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
            value: '', // 选中的头像 src
            leaveWordMessage: [], // 留言
            totalSize: 0,// 总条数
            //分页信息
            pageInfo: {
                currentPage: 1, //当前页
                rows: 5, //每页大小
                sort: "", //排序方式
            },

        },
        mounted() {
            this.getLeaveWord();
        },
        watch: {
            pageInfo: { // 监视pageInfo属性的变化
                deep: true, // deep为true，会监视pageInfo的属性及属性中的对象属性变化
                handler() {
                    // 变化后的回调函数
                    this.getLeaveWord();
                }
            },
        },
        methods: {
            // 添加留言信息
            setLeaveWord() {
                $.ajax({
                    url: "" + baseUrl + "/api/leave-word",
                    dataType: "text",
                    type: "post",
                    data: {
                        "nickname": this.nickname,// 昵称
                        "email": this.email,// 邮箱
                        "picture": this.value, //头像
                        "leaveContent": this.textarea,// 留言内容
                    },
                    success: function (data, status, xhr) {
                        leaveWord.nickname = "";
                        leaveWord.email = "";
                        leaveWord.textarea = "";
                        leaveWord.value = "";
                        leaveWord.$alert('添加成功', '消息提示', {
                            confirmButtonText: '确定'
                        });
                        leaveWord.getLeaveWord();
                    },
                    error:function (error) {   //请求失败后的回调方法
                        leaveWord.nickname = "";
                        leaveWord.email = "";
                        leaveWord.textarea = "";
                        console.log(error)
                        leaveWord.$alert(error.responseText.message, '错误提示', {
                            confirmButtonText: '确定'
                        });
                    }
                });
            },
            // 获取留言信息
            getLeaveWord() {
                $.ajax({
                    url: ""+baseUrl+"/api/leave-word/all",
                    dataType:"json",
                    type:"get",
                    data:{
                        "currentPage": this.pageInfo.currentPage,// 当前页
                        "rows": this.pageInfo.rows,// 每页大小
                        "sort": 'id desc',// 排序字段
                    },
                    success:function(data) {
                        leaveWord.leaveWordMessage=data.items;
                        console.log(data)
                        leaveWord.totalSize = data.total;
                    },
                    error:function (error) {   //请求失败后的回调方法
                        leaveWord.items = [];
                        leaveWord.totalSize = 0;
                        leaveWord.$alert(error.responseJSON.message, '错误提示', {
                            confirmButtonText: '确定'
                        });
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
