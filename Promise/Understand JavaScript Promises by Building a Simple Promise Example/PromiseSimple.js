/**
 * 通过手写一个简化的 Promise 了解 Promise 的内部原理。
 * Medium 上的资源：
 * https://levelup.gitconnected.com/understand-javascript-promises-by-building-a-promise-from-scratch-84c0fd855720
 */

class PromiseSimple {
  constructor(executionFunction) {
    this.executionChain = []; // 保存 then / catch 回调
    this.handleError = () => {};
    this.onResolve = this.onResolve.bind(this);
    this.onReject = this.onReject.bind(this);

    executionFunction(this.onResolve, this.onReject); // 执行 Promise 回调函数，将两个原型方法传入作为参数
  }

  then(onResolve) {
    // 这里会在创建 PromiseSimple 对象时执行
    console.log('.then 函数执行了吗');
    this.executionChain.push(onResolve);
    return this;
  }

  catch(handleError) {
    this.handleError = handleError;
    return this;
  }

  onResolve(value) {
    // 在调用 resolve 之后执行。将 value 保存起来
    let storedVal = value;
    try {
      // 一次性将所有 then 的回调执行，并将每次回调函数的结果保存起来传递给下一个回调函数。
      // 不知道标准 Promise 是不是这样统一执行的。
      // 如果 then 返回一个 Promise 会这样？ 这里应该是没有考虑的，仅仅简单考虑返回基本数据类型
      this.executionChain.forEach(nextFun => {
        storedVal = nextFun(storedVal);
      });
    } catch (error) {
      this.executionChain = [];
      this.handleError(error);
    }
  }

  onReject(error) {
    this.handleError(error);
  }
}

/**
 *  模拟一个类似 ajax 的函数，返回 PromiseSimple 对象
 */
fakeHttpData = () => {
  const user = {
    name: "xjs",
    age: 22,
    profile: "baidu.com"
  };
  if (Math.random() > 0.5) {
    return {
      status: 200,
      data: user
    };
  } else {
    return {
      status: 404,
      message: "Could not find user",
      error: "not Found"
    };
  }
};

const makeAjax = () => {
  return new PromiseSimple((resolve, reject) => {
    setTimeout(() => {
      const res = fakeHttpData();
      if (res.status === 200) {
        resolve(res.data);
      } else {
        reject(res);
      }
    }, 2000);
  });
};

makeAjax()
  .then((user)=>{
    console.log(`用户名为：${user.name}`);    
    return user;
  })
  .then((user)=>{
    console.log(`用户今年 ${user.age} 岁了！`);
    return user;
  })
  .then((user)=>{
    console.log(`用户的个人网址是：${user.profile}`);
    return user;
  })
  .catch((err)=>{
    console.log(err.message);    
  })