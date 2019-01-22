/**
 * demo-1
*/
const a = "a";
// a = "b";  //  TypeError

const b = [1];
b.push(2); // Yes

const c = { c: "c" };
c.d = "d";  // Yes


/* 
 *  demo-2
 *  JS可变对象属性
*/
let name2 = "aaa";
let obj2 = {  
  [name2]: '123'
}
console.log('obj2: ', obj2);