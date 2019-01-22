/**
 * 手动实现一个 bind - myBind 函数
 */
Function.prototype.myBind = function() {
  let _this = this;
  let thisArg = arguments[0];
  let params = [].slice.call(arguments, 1);  // for Curring
  return function() {
    return _this.apply(thisArg, params.concat(arguments));
  };
};

// test myBind Fun
function sayName(){
  console.log("name: ",this.name);
}

let obj1 = {
  name: "obj1"
}

let sayName2 = sayName.myBind(obj1);
sayName2();  // name:  obj1

let obj2 = {
  name: "obj2",
  sayName: sayName2
}
obj2.sayName(); // name:  obj1