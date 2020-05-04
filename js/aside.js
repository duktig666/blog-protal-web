$(document).ready(function () {
    //侧边栏的vue
    let aside = new Vue({
        el: '#aside-wrap',
        data: {
            bloggerInfo: '',
        },
        methods: {
            //查询博主信息
            getBloggerInfo() {
                $.get(baseUrl + "/api/user/8", function (data, status, xhr) {
                    this.bloggerInfo=data;
                    console.log(this.bloggerInfo)
                },"json");
            },
        },
        mounted() {
            this.getBloggerInfo();
        }
    });
});