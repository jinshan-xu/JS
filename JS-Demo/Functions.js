/**
 * 常见问题的实现
 * 1. 阶乘
 */

// 1. 阶乘
function factorial(n) {
  if (n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
// console.log("demo1-res: ",factorial(10));

// 1.1 阶乘(尾递归)
function factorial2(n, res = 1) {
  if (n === 1) {
    return res;
  } else {
    res *= n;
    return factorial2(n - 1, res);
  }
}
// console.log('demo1.1-res: ',factorial2(10));


// 2. 斐波那契数列 1, 1, 2, 3, 5, ...
function fibo(n) {
  if (n < 3) {
    return 1;
  } else {
    return fibo(n - 2) + fibo(n - 1);
  }
}
// console.log('demo2-res: ',fibo(10));

// 2.1 斐波那契数列 (尾递归)
function fibo2(n, fir=0, sec=1) {
  if (n === 0) {
    return fir;
  } else {
    return fibo2(n - 1, sec, fir + sec);
  }
}
// console.log('demo2-res: ',fibo2(10));