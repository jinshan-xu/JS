### Promise
#### <a href="http://es6.ruanyifeng.com/#docs/promise">ES6教程</a> 与 <a href="https://www.promisejs.org/">Promisejs.org</a>
1. Promise 构造函数
2. let promise = new Promise( function(resolve, reject){ } )   创建 Promise 对象
3. Promise.resolve(res) / Promise.reject(res) 将成功( resolved )或者失败( rejected )的结果传递出去。(这两个是静态方法)
4. Promise.prototype.then( function(res){}, function(err) )   是 Promise 对象的实例方法，接收两个函数作为参数。分别在 Promise 对象的状态变成 resolved / rejected 时调用。
5. Promise 对象在创建后立即执行。是因为 new Promise() 本就是实例化对象的操作，不是异步操作。
6. 练习：使用 Promise 手写 Ajax 请求。
7. resolve 可以返回一个 Promise.  那么 p1 状态会决定 p2 状态。（<a href="http://es6.ruanyifeng.com/#docs/promise">详情参见这里</a>）

8. Promise.prototype.then(callback) 方法返回一个新的 Promise 实例(即使返回普通字符串,也可以继续进行 then 的链式调用,不知道是否是将所有返回类型都包装成了 Promise), 因此采用 then 方法可以使用链式调用。 如果在 then 中返回的是另一个 Promise 对象,那么之后 then 方法的回调函数会在此 Promise 状态发生改变之后才会调用。

9. Promise.prototype.catch(callback)  相当于 .then(null, function(err){} ) 发生错误时会调用。
10. Promise 对象的错误具有 "冒泡" 的特性,会一直向后传递,直到被捕获为止。错误总会被下一个 catch 捕获。
11. 一般不在 then 方法定义第二个参数,而是由 catch 进行错误捕获。

12. Promise.prototype.finally(callback)  此方法表示，不论 Promise 对象最后状态如何，都会执行传入的回调函数。因此此方法是与状态无关的。 

13. Promise.resolve()  将现有对象转化为 Promise 对象。Promise.resolve("foo") 等价于 new Promise( resolve => resolve("foo") );
14. Promise.resolve()  的四种参数。
15. 立即 resolve 的 Promise 对象将在本轮事件循环的结束时执行, setTimeout( fn, 0 ) 将在下一轮事件循环开始执行。

16. Promise.all 将多个 Promise 实例包装成一个 Promise 实例.当所有实例都成功时，此实例的状态变为成功，否则变成失败。
17. Promise.race 将多个 Promise 实例包装 成一个 Promise 实例.并且第一个实例成功/失败之后此实例的状态随之改变。


