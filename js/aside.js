const loveStartTime = "2018-01-15 23:00:00";

$(document).ready(function () {
    //侧边栏的vue
    let aside = new Vue({
        el: '#aside-wrap',
        data: {
            //博主信息
            bloggerInfo: '',
            //最新博客信息
            blogNewInfos: '',
            //最热博客信息
            blogHotInfos: '',
            //博客的总访问量、点赞量、评论量信息
            blogCount:'',
        }
    });

    //博客的总访问量、点赞量、评论量显示
    $.get(baseUrl + "/api/blog/count", function (data, status, xhr) {
        aside.blogCount = data;
    }, "json");

    //情侣小空间时间计算
    setInterval(function () {
        let loveTime = timeLag(loveStartTime);
        $('.love-time').text("相恋" + loveTime);
    }, 1000);

    //请求博主信息
    $.get(baseUrl + "/api/user/8", function (data, status, xhr) {
        aside.bloggerInfo = data;
    }, "json");

    //请求博客信息
    function getBlogInfoNewOrHot(isNew) {
        $.get(baseUrl + "/api/blog/all/single",
            {
                currentPage: 0,
                rows: 10,
                sort: isNew ? 'create_date desc' : 'visit_number desc'
            },
            function (data, status, xhr) {
                if (isNew) {
                    aside.blogNewInfos = data.items;
                } else {
                    aside.blogHotInfos = data.items;
                }
            }, "json");
    }
    //请求最新博客信息
    getBlogInfoNewOrHot(true);
    //请求最热博客信息
    getBlogInfoNewOrHot(false);

});