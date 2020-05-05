$(document).ready(function () {
    // 轮播图
    new Vue({
        el: '#carousel',
        data: {
            items:[
                {url:'../img/cloud.png'},
                {url:'../img/code.jpg'},
                {url:'../img/sun.png'},
                {url:'../img/background-grobal.jpg'},
            ]
        }
    });
    // 博客信息渲染
    var blogList = new Vue({
        el: "#blogList",
        data(){
            return({//使用data返回数据，使其只改变当前组件的信息，而不是改变全局的信息
                items:[],
            })
        },
        mounted() {
          this.getBlogs();
        },
        methods: {
            getBlogs() {
                $.get(baseUrl + "/api/blog/all", function (data, status, xhr) {
                    blogList.items=data.items;
                    console.log(blogList.items)
                },"json");
            }
        }
    })
})
