/*
 *  函数柯里化( Function Curring )
 * 
 *  又称为部分求值，curring 函数会接收一些参数，但是不会立即求值。
 *  而是返回一个函数，刚刚传入的参数被闭包保存。等到函数真正需要求值
 *  的时候之前传入的参数会一次性用来求值。   
*/

let cost  = (function(){
  let args = [];
  return function(){
    let money = 0;
    if( arguments.length !== 0 ){
      [].push.apply(args,arguments);
    }
    else{
      for(let i=0,len=args.length;i<len;i++){
        money += args[i];
      }
      console.log(money);      
    }
  } 
})();

cost(10);  // 传入参数时只会保存参数 
cost(20);
cost(30);
cost();    // 运行函数

/* 
 * Waiting for More ...
*/