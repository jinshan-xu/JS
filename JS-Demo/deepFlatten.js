/**
 *  1. 一维化多维数组
 */
//  demo-1
let ary1 = [1, 2, [3, 4, [5, 6]]];
let res1 = [];
let flatenArray1 = ary =>
  ary.forEach(item =>
    Array.isArray(item) ? flatenArray1(item) : res1.push(item)
  );
flatenArray1(ary1);
console.log("res1:", res1);

// demo-2
let ary2 = [1, 2, [3, 4, [5, 6]]];
let flatenArray2 = ary =>
  [].concat(
    ...ary.map(item => (Array.isArray(item) ? flatenArray2(item) : item))
  );
let res2 = flatenArray2(ary2);
console.log("res2: ", res2);

// 下面说明了为何例2可以正常工作！
let ary3 = [1, 2, [3, 4, [5, 6]]];
let flatenArray3 = ary =>
  ary.map(item => (Array.isArray(item) ? flatenArray3(item) : item));
let res3 = flatenArray3(ary3);
console.log("res3: ", res3);

console.log([1].concat(...[2, [3]]));
console.log(...[1, [2, 3]]);

// 小结： demo-2 在于 Array.concat 方法的理解。
