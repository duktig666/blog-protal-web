//项目后台请求基础路径
const baseUrl = "http://118.89.143.27:8090";

//计算某时间距离现在的时差（天、时、分、秒）
function timeLag(oldTime) {//di作为一个变量传进来
    //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
    //将-转化为/，使用new Date
    let dateBegin = new Date(oldTime.replace(/-/g, "/"));
    //获取当前时间
    let newDate = new Date();
    //时间差的毫秒数
    let dateDiff = newDate.getTime() - dateBegin.getTime();
    //计算出相差天数
    let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
    //计算天数后剩余的毫秒数
    let leave1 = dateDiff % (24 * 3600 * 1000);
    //计算出小时数
    let hours = Math.floor(leave1 / (3600 * 1000));
    //计算小时数后剩余的毫秒数
    let leave2 = leave1 % (3600 * 1000);
    //计算相差分钟数
    let minutes = Math.floor(leave2 / (60 * 1000));
    //计算分钟数后剩余的毫秒数
    let leave3 = leave2 % (60 * 1000);
    //计算相差秒数
    let seconds = Math.floor(leave3 / 1000);
    return " " + dayDiff + " 天 " + hours + " 时 " + minutes + " 分 " + seconds + " 秒 ";
}

//随机生成16进制颜色
function getRandomColor() {
    let str = "#";
    let arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    for (let i = 0; i < 6; i++) {
        let num = parseInt(Math.random() * 16);
        str += arr[num];
    }
    return str;
}


