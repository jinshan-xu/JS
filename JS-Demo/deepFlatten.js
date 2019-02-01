/**
 *  1. 一维化多维数组
 */
//  demo-1
const ary1 = [1, 2, [3, 4, [5, 6]]];
const res1 = [];
const flatenArray1 = ary =>
  ary.forEach(item =>
    Array.isArray(item) ? flatenArray1(item) : res1.push(item)
  );
flatenArray1(ary1);
console.log("res1:", res1);

// demo-2
const ary2 = [1, 2, [3, 4, [5, 6]]];
const flatenArray2 = ary =>
  [].concat(
    ...ary.map(item => (Array.isArray(item) ? flatenArray2(item) : item))
  );
const res2 = flatenArray2(ary2);
console.log("res2: ", res2);

// 下面说明了为何例2可以正常工作！
const ary21 = [1, 2, [3, 4, [5, 6]]];
const flatenArray21 = ary =>
  ary.map(item => (Array.isArray(item) ? flatenArray21(item) : item));

const res21 = flatenArray21(ary21);
console.log("res21: ", res21)
console.log([1].concat(...[2, [3]]));
console.log(...[1, [2, 3]]);

// 小结： demo-2 在于 Array.concat 方法的理解。

// demo-3
const ary3 = [1, 2, [3, 4, [5, 6]]];
const flatenArray3 = ary =>
  ary.reduce(
    (pre, next) => pre.concat(Array.isArray(next) ? flatenArray3(next) : next),
    []
  );
const res3 = flatenArray3(ary3);
console.log("res3: ", res3);
