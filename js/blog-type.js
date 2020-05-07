$(document).ready(function () {
    const blogType = new Vue({
        el:'#blog-type',
        data(){
            return({//使用data返回数据，使其只改变当前组件的信息，而不是改变全局的信息
                items:[], // 博客集合
                types:[], //类型集合
                totalSize: 0,// 总条数
                //分页信息
                pageInfo: {
                    currentPage: 1, //当前页
                    rows: 10, //每页大小
                    sort: "", //排序方式
                },
                typeId: 0,

                randomColor:[], //随机颜色
                typeIconColor: {
                    backgroundColor:"",
                },
            })
        },
        mounted() {
            this.getTypes();
            // this.getBlogByType(2);
        },
        watch: {
            pageInfo: { // 监视pageInfo属性的变化
                deep: true, // deep为true，会监视pageInfo的属性及属性中的对象属性变化
                handler() {
                    // 变化后的回调函数
                    this.getBlogByType(blogType.typeId);
                }
            },
        },
        methods: {
            getTypes() {
                $.get(baseUrl + "/api/blog-type/all", function (data, status, xhr) {
                    blogType.types = data.items;
                    let str = "backgroundColor:";
                    for (let i = 0; i < data.items.length; i++) {
                        str += getRandomColor()
                        blogType.randomColor.push(str);
                        str = "backgroundColor:"
                    }
                }, "json");
            },
            getBlogByType(typeId) {
                blogType.typeId = typeId;
                $.ajax({
                    url: ""+baseUrl+"/api/blog/all/byTypeId",
                    dataType:"json",
                    type:"get",
                    data:{
                        "currentPage": this.pageInfo.currentPage,// 当前页
                        "rows": this.pageInfo.rows,// 每页大小
                        "sort": null,// 排序字段
                        typeId: typeId, // 博客模糊查询所需数据
                    },
                    success:function(data) {
                        blogType.items=data.items;
                        blogType.totalSize = data.total;
                    },
                    error:function (error) {   //请求失败后的回调方法
                        blogType.items = [];
                        blogType.totalSize = 0;
                        blogType.$alert(error.responseJSON.message, '错误提示', {
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
        }
    })
})
