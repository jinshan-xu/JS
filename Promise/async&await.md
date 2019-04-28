### Async await 学习 <a href="https://segmentfault.com/a/1190000017224799?utm_source=tag-newest">详情</a>
1. 带 async 关键字的函数必定返回 Promise 对象。如果不是就使用 Promise.resolve() 进行包装。
2. async 在语义上表示内部包含异步操作。
3. await 必须写在 async 内部，否则会报错。
4. await 等待右侧函数或者表达式的返回结果。
5. 一旦遇到 await 会让出线程，阻塞后面代码，执行 async 之外的同步代码。但是不会阻塞 await 右侧的表达式执行。

6. 如果 await 得到的结果
- 不是 Promise ，那么 await 会阻塞其之后的代码，async 之外的同步代码执行完毕之后，回到 async 内部，将这个非 Promise 的结果作为 await 表达式的结果。
- 是 Promisem, 那么 await 会向上面情况一样运行，并且在 Promise 对象状态变为 fullfilled 之后将 resolve 的参数作为 await 表达式的结果。

7. 宏任务 与 微任务
- 宏任务与微任务都是队列，微任务作为宏任务内的队列。
- 宏任务一般包括整体代码，script  setTimeout  setInterval
- 微任务包括 Promise   Process.nextTick
