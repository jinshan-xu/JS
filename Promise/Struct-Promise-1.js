/**
 * 跟着掘金文章学习写一个 Promise 的简单实现。
 * 性感的Promise，拥抱ta然后扒光ta  https://juejin.im/post/5ab20c58f265da23a228fe0f
 * */
// step 1. 实现 resolve / reject 方法以及状态机制
function MyPromise(executor) {
  // executor 执行器，传入构造函数的参数
  let _this = this; // 缓存 this
  _this.status = "pending"; // 初始化状态
  _this.value = undefined; // 成功时传递的数据
  _this.reason = undefined; // 失败时传递的数据
  function resolve(value) {
    // 内置方法
    if (_this.status === "pending") {
      // 当状态为 pending 时才能进入
      _this.status = "resolved";
      _this.value = value;
    }
  }
  function reject(reason) {
    if (_this.status === "pending") {
      _this.status = "rejected";
      _this.reason = reason;
    }
  }
  executor(resolve, reject); // 执行执行器，传入参数
}
// step 2. 实现 then 方法
MyPromise.prototype.then = function(onFullFilled, onRejected) {
  let _this = this;
  if (_this.status === "resolved") {
    onFullFilled(_this.value);
  }
  if (_this.status === "rejected") {
    onRejected(_this.rea);
  }
};

// 测试
let testPromise = new MyPromise(function(resolve, reject) {
  resolve("testPromise");
});
testPromise.then(function(res) {
  console.log(res);
});

// 问题，当传入异步操作时，无法正常运行。 示例如下
let asyTest = new MyPromise(function(resolve, reject) {
  setTimeout(function() {
    resolve("asyTest for MyPromise");  // 1s 后内部状态才能变成 resolved
  }, 1000);
});

asyTest.then(function(res) {
  console.log("res: ", res);
  console.log("<< is here run ? >>"); // 这里没有运行，因为 asyTest 内部还是 pending 状态
});
// 测试完



