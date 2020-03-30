/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2018-05-31 15:52:30
 * @LastEditTime: 2019-11-13 10:47:31
 * @LastEditors: Please set LastEditors
 */
const exec = require('child_process').exec;

var imageIndex = 100000;
var gradeIndex = 0;
var GAP = 6;
var currentIndex = 0 - GAP;
// var GRADE_LIMIT_TABLE = [6, 7, 8, 9, 13];
var GRADE_LIMIT_TABLE = [150, 260, 335, 225, 112]; // 每个年级的总人数
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
var sCount = 0;
var sMeanTime = 0;
var sTotalCount = peopleName.length
var CONCURRENT_LIMIT = peopleName.length + 1;
console.log(CONCURRENT_LIMIT)
var concurrentCount = 0;

// 因为 phantomjs 是基于 node ，只能单线程
// 所以在这里使用 exec 执行 shell 命令，以达到借助系统多线程的能力，最大化 CPU 利用效率
var startTimestamp = +new Date();
while (concurrentCount < CONCURRENT_LIMIT) {
    allocNewTask();
    concurrentCount++;
}

function allocNewTask() {
    generateImage(concurrentCount);
}

function generateImage(_currentIndex) {

    exec(`./phantomjs load.js ${_currentIndex}`, function(error) {
        if (!error) {
            var duration = +new Date() - startTimestamp;
            sMeanTime = duration / (++sCount);
            console.log(`${sCount}/${sTotalCount}: approximately left ${sMeanTime * (sTotalCount - sCount) / 1000}s`);

            allocNewTask();
        } else {
            console.error(error);
        }
    });
}