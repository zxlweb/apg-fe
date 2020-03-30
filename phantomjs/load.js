/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2018-05-31 15:52:30
 * @LastEditTime: 2019-11-13 10:47:54
 * @LastEditors: Please set LastEditors
 */
var page = require('webpage').create();
var system = require('system');

// 此处的 system.args 是指 shell 命令中传进来的参数
// var currentIndex = system.args[1];
// var GAP = system.args[2];
// var gradeIndex = Number(system.args[3]);
// var imageIndex = system.args[4];

// var arg = Number(system.args[1]);
// var imageIndex = 100000 + arg;

// var GRADE_LIMIT_TABLE = [150, 260, 335, 225, 112];
// var GAP = 6;

// var count = arg;
// var currentIndex, gradeIndex;
// for (var i = 0; i < GRADE_LIMIT_TABLE.length; i++) {
//     var gradePage = Math.ceil(GRADE_LIMIT_TABLE[i] / GAP);
//     if (count > gradePage) {
//         count -= gradePage;
//     } else {
//         currentIndex = (count - 1) * GAP;
//         gradeIndex = i;
//         break;
//     }
// }

// page.open('http://localhost:9988/sp', function() {
//     setTimeout(function() {
//         page.render('out/' + 1 + '.png');
//         phantom.exit();
//     }, 5000)


// });
var currentIndex = system.args[1]
var peopleName = ["龚方玲",
    "叶朦",
    "李娜",
    "李称心",
    "李影",
    "程洁",
    "薛洁",
    "赵淑璇",
    "朱虎",
    "钱双旭",
    "陈立慧",
    "李雪",
    "郭文婷"


]

page.open('http://localhost:9988/sp?from=' + currentIndex, function() {
    page.render('out/' + peopleName[currentIndex] + '.png');
    phantom.exit();
});