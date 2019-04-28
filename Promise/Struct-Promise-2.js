/**
 * 跟着掘金文章学习写一个 Promise 的简单实现。
 * 性感的Promise，拥抱ta然后扒光ta  https://juejin.im/post/5ab20c58f265da23a228fe0f
 * */
// step 3. 之前步骤没有实现异步操作时的逻辑，需要在这里加入
function MyPromise(executor) {
  // executor 执行器，传入构造函数的参数
  let _this = this; // 缓存 this
  _this.status = "pending"; // 初始化状态
  _this.value = undefined; // 成功时传递的数据
  _this.reason = undefined; // 失败时传递的数据

  _this.onResolvedCallbacks = []; // 缓存异步函数的结果
  _this.onRejectedCallbacks = []; // 同理

  function resolve(value) {
    // 内置方法
    if (_this.status === "pending") {
      // 当状态为 pending 时才能进入
      _this.status = "resolved";
      _this.value = value;
      // 需要执行 onFullFilledCallbacks 中的函数
      _this.onResolvedCallbacks.forEach(fn => {
        fn(_this.value);
      });
    }
  }
  function reject(reason) {
    if (_this.status === "pending") {
      _this.status = "rejected";
      _this.reason = reason;
      _this.onRejectedCallbacks.forEach(fn => {
        fn(_this.reason);
      });
    }
  }
  // 异常处理
  try {
    executor(resolve, reject); // 执行执行器，传入参数
  } catch (err) {
    reject(err);
  }
}
// then 方法
MyPromise.prototype.then = function(onFullFilled, onRejected) {
  let _this = this;
  if (_this.status === "pending") {
    // 是 pending 是需要将函数缓存起来
    _this.onResolvedCallbacks.push( onFullFilled );
    _this.onRejectedCallbacks.push( onRejected );
  }
  if (_this.status === "resolved") {
    onFullFilled(_this.value);
  }
  if (_this.status === "rejected") {
    onRejected(_this.rea);
  }
};

// 测试，当传入异步操作时
let asyTest = new MyPromise(function(resolve, reject) {
  setTimeout(function() {
    resolve("asyTest for MyPromise"); // 1s 后内部状态才能变成 resolved
  }, 1000);
});

asyTest.then(function(res) {
  console.log("res: ", res);
  console.log("<< is here run ? >>"); // 这里没有运行，因为 asyTest 内部还是 pending 状态
},function(){});
// 测试完



















