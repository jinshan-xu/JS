// const filter = i => i % 2 === 0;
// let ary = [1,2,3,4,5];
// let bifurcate = ary.reduce((pre,next,i) => (pre[filter(i) ? 0 : 1].push(next), pre), [[],[]]);
// console.log('bifurcate: ', bifurcate);

// let res = ary.reduce((pre,next,i)=>{ return (pre.push(next), pre)},[])
// console.log('res: ', res);

// function foo(){
//   return (1,2+5,3+9);
// }
// console.log(foo());

// function fo1(){
//   return a = 1;
// }
// console.log(fo1());

console.log("test ------------");

let a = (b = {});
console.log(a == b);
console.log(a === b);

let c = {};
let d = c;
console.log(c == d);
console.log( c === d);
