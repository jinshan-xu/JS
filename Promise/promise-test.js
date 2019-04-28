/**
 * Promise 笔试题
 * 测试 1
 * */
const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve();
  console.log(2);
});

promise.then(() => {
  console.log(3);
});

console.log(4);
//

/**
 *  测试 2
 */
const promise = new Promise((resolve, reject) => {
  resolve("success1");
  reject("error");
  resolve("success2");
});

promise
  .then(res => {
    console.log("then:", res);
  })
  .catch(err => {
    console.log("catch:", err);
  });
//

/**
 *  测试 3
 */
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log);
/*
  解析：1. Promise.resolve(1)
   Promise.resolve 方法的参数如果是一个原始值，或者是一个不具有 then 方法的对象，则 Promise.resolve 方法返回一个新的 Promise 对象，状态为resolved，Promise.resolve 方法的参数，会同时传给回调函数。
    2. then(2)
    then 方法接受的参数是函数，而如果传递的并非是一个函数，它实际上会将其解释为 then(null)，这就会导致前一个 Promise 的结果会穿透下面。
 */

/**
 *  测试 4
 *  题目： 红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？（用Promse实现）三个亮灯函数已经存在：
 *  程序运行请见 promise.html
 */
function red() {
  console.log("red");
}
function green() {
  console.log("green");
}
function yellow() {
  console.log("yellow");
}

var light = function(timmer, cb) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      cb();
      resolve();
    }, timmer);
  });
};

var step = function() {
  Promise.resolve()
    .then(function() {
      return light(3000, red);
    })
    .then(function() {
      return light(2000, green);
    })
    .then(function() {
      return light(1000, yellow);
    })
    .then(function() {
      step();
    });
};

// step();

/**
 *  测试 5
 *  实现 mergePromise 函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组 data 中。
 *  演示见 promise-test-5.html
 */
const timeout = ms =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const ajax1 = () =>
  timeout(2000).then(() => {
    console.log("1");
    return 1;
  });

const ajax2 = () =>
  timeout(1000).then(() => {
    console.log("2");
    return 2;
  });

const ajax3 = () =>
  timeout(2000).then(() => {
    console.log("3");
    return 3;
  });
let ajaxArray = [ajax1, ajax2, ajax3];
const mergePromise = ajaxArray => {
  // 在这里实现你的代码
  let data = [];
  let sequence = Promise.resolve();
  ajaxArray.forEach(item => {
    sequence = sequence.then(item).then(res => {
      data.push(res);
      return data;
    });
  });
  return sequence;
};
mergePromise(ajaxArray).then(data => {
  console.log(data);
});

/**
 * 测试 6
 * 以下代码的输出？
 */
const first = () =>
  new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
      console.log(7);
      setTimeout(() => {
        console.log(5);
        resolve(6);
      }, 0);
      resolve(1);
    });
    resolve(2);
    p.then(arg => {
      console.log(arg);
    });
  });

first().then(arg => {
  console.log(arg);
});
console.log(4);

/**
 * 测试 7
 * 有 8 个图片资源的 url，已经存储在数组 urls 中
 * （即urls = ['http://example.com/1.jpg', ...., 'http://example.com/8.jpg']），而且已经有一个函数 function loadImg，
 * 输入一个 url 链接，返回一个 Promise，该 Promise 在图片下载完成的时候 resolve，下载失败则 reject。
 * 但是我们要求，任意时刻，同时下载的链接数量不可以超过 3 个。
 * 请写一段代码实现这个需求，要求尽可能快速地将所有图片下载完成。
 */
var urls = [
  "getImgDatadata.jpg",
  "gray.gif",
  "Particle.gif",
  "arithmetic.png",
  "arithmetic2.gif",
  "getImgDataError.jpg",
  "arithmetic.gif",
  "wxQrCode2.png"
];
function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function() {
      console.log("一张图片加载完成");
      resolve();
    };
    img.onerror = reject;
    img.src = url;
  });
}

function limitLoad(urls, handler, limit) {
    // 对数组做一个拷贝
    const sequence = [].concat(urls)
    let promises = [];

    //并发请求到最大数
    promises = sequence.splice(0, limit).map((url, index) => {
        // 这里返回的 index 是任务在 promises 的脚标，用于在 Promise.race 之后找到完成的任务脚标
        return handler(url).then(() => {
            return index
        }); 
    });

    // 利用数组的 reduce 方法来以队列的形式执行
    return sequence.reduce((last, url, currentIndex) => {
        return last.then(() => {
            // 返回最快改变状态的 Promise
            return Promise.race(promises)
        }).catch(err => {
            // 这里的 catch 不仅用来捕获 前面 then 方法抛出的错误
            // 更重要的是防止中断整个链式调用
            console.error(err)
        }).then((res) => {
            // 用新的 Promise 替换掉最快改变状态的 Promise
            promises[res] = handler(sequence[currentIndex]).then(() => { return res });
        })
    }, Promise.resolve()).then(() => {
        return Promise.all(promises)
    })

}
limitLoad(urls, loadImg, 3)

/*
因为 limitLoad 函数也返回一个 Promise，所以当 所有图片加载完成后，可以继续链式调用

limitLoad(urls, loadImg, 3).then(() => {
    console.log('所有图片加载完成');
}).catch(err => {
    console.error(err);
})
*/

let a = {
  a: "111",
  b: "222"
}
a.b

