/**
 * 测试数组的迭代运算时，对数组元素直接进行赋值操作是否有效。
 * 
 * 结论： 1. 直接对数组元素赋值无效
 *       2. 对于引用类型元素，操作元素有效。
 *       3. for 循环中直接 ary[i] 操作有效
 */

// demo-1
let obj = {
  a: "1",
  b: [1, 2]
};
let ary = [1, 2, 3, obj];

ary.forEach(item => {
  if (typeof item === "object") {
    item.c = "c";
    Object.assign(item, { d: "d" });
  } else {
    item = 100000;
  }
});

console.log(ary);

// demo-2
let ary2 = [1,2,{a:"a"}];
for(let i=0;i<ary2.length;i++){
  ary2[i] = 1000;
}
console.log(ary2);

// demo-3
let ary3 = [1,2,{b:"b"}];
for(let value of ary3){
  value = 1000;
}
console.log(ary3);