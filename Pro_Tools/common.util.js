/** 
 * 1. debounceDelay / debounceNow / debounce
 * 2. throttle
*/


/**
 * 防抖
 * 首次触发不会执行事件，在 n 秒内没有再次触发时才执行的函数 debounceDelay
 * 
 * 重点在于闭包对 timer 的状态保持
 * 内部函数判断 timer 是否为 null：
 * 1. timer -> null ,此时没有定时任务。可以开启定时任务
 * 2. timer -> !null ,此时存在定时任务，说明在 wait 时间内上一次任务还未执行。那么就重置定时器，继续等待执行
 * 3. immediate -> true ,此时不需要开始定时器，直接执行任务
 * 
 * @params {Boolean} immediate 第一次是否立即执行
 * 
 * 注意内部函数用于绑定浏览器事件
 * 
 */
function debounceDelay(fun, wait) {
    wait = wait || 300;
    let timer = null;
    return function (...args) {
        let context = this;
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
            timer = null;
            fun.apply(context, args);
        }, wait);
    }
}


/**
 * 首次触发事件立即执行，在 n 秒内不触发事件的话才会再次进入可执行状态的函数，debounceNow
 */
function debounceNow(fun, wait) {
    wait = wait || 300;
    let timer = null;
    return function (...args) {
        let context = this;
        !timer && fun.apply(context, args);
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
            timer = null;
        }, wait);
    }
}

/**
 * 通过 immediate 控制函数是否立即触发
 */
function debounce(fun, wait, immediate) {
    wait = wait || 300;
    let timer = null;
    return function (...args) {
        let context = this;
        // 如果需要立即执行，就需要在 timer 为 null 时执行
        immediate && !timer && fun.apply(context, args);
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
            timer = null;
            // 如果需要延时执行，就在延时后执行
            !immediate && fun.apply(context, args);
        }, wait);
    }
}


/**
 * 节流
 * 利用定时器，事件不在触发也会在 n 秒后执行一次
 * 在连续触发事件时，在 n 秒中只执行一次函数
 */
function throttleByTimer(fun, wait) {
    let timer = null;
    return function (...args) {
        let context = this;
        !timer && (timer = setTimeout(function () {
            timer = null;
            fun.apply(context, args);
        }, wait));
    }
}


/**
 * 节流
 * 利用时间戳实现，只会在事件发生的期间每 n 秒执行一次
 */
function throttleByTimestamp(fun,wait){
    let before = 0;
    return function(...args){
        let context = this;
        let now = +Date.now();
        let dis = now - before;
        if(dis >= wait){
            fun.apply(context,args);
        }
        before = now;
    }
}
