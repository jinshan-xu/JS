/**
 * 写一个满足 开放-封闭原则 的函数
 * 先执行之前的函数，在执行之后新增的函数
 * 1. 方式一，函数传入法
 */
var preFun = () => {
  console.log("我是原有的函数");
};
var afterFun = preFn => {
  preFn();
  console.log("我是在 preFun 函数中新加的功能");
};
afterFun(preFun);

/**
 * 2. 方式二，不改变函数原本的命名
 * 借用 after 函数包装原本函数，在执行完本来的函数之后在执行下一个函数
 */
function pre(p) {
  console.log("我是原本的函数传入的参数为：", p);
  return p;
}
function next(n) {
  console.log("我是新增功能,传入的参数为：", n);
  return n;
}

Function.prototype.after = () => {
  var _self = this;
  var nextFun = arguments[0];
  var nextFunArg = [].slice.call(arguments, 1);
  return function() {
    nextFun.apply(this, nextFunArg);
    return _self.apply(this, arguments);
  };
};
var pre = pre.after(next, "next");
pre("Pre");
