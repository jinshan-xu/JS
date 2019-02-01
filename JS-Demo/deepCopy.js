/** 
 * 深拷贝
*/
// demo-1 JSON
const ary1 = [1,2,[3,4]];
const res1 = JSON.parse(JSON.stringify(ary1));
console.log('res1: ', res1);
console.log('equ ? :', ary1 == res1);

// demo-2
function deepCopy(obj){
  if(typeof obj !== "object"){
    return obj;
  }
  const newObj = Array.isArray(obj) ? [] : {};
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      if(typeof obj[key] === "object"){
        newObj[key] = deepCopy(obj[key]);
      }else{
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
}
const obj2 = {
  a: "a",
  b: {
    c: "c"
  },
  d: [1,2,[3,4]]
}
const res2 = deepCopy(obj2);
console.log('res2: ', res2);
console.log('eq ? : ',obj2 == res2);