$(document).ready(function () {
    //导航栏的vue
    new Vue({
        el: '#nav',
        data: {
            search: '',
            activeIndex: "1",
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
        },
        mounted() {
            this.getIndex();
        }
    });
});