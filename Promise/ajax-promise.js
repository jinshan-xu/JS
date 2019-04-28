/*
   1. 作为使用 Promise 封装 ajax 的尝试
   2. 暂时只实现 get 方法
*/

function ajax(url) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    console.log('stateChange!');
    if (this.readyState === 4) {
      if( this.status === 200){
        console.log('this.status: ',this.status);
        // return new Promise(function(resolve, reject) {  
        //   resolve(this.response);
        // });
        return 1;   // xhr 是异步操作，因此 ajax 函数不会等待异步操作完成才 return, 而是直接 return undefined
      }else{
        console.log('!200');
        return new Promise(function(resolve, reject) {
          reject(new Error(this.statusText));
        });
      }      
    }    
  };  
  xhr.open("get",url);
  xhr.send();
  return "直接 return 而不会等待 xhr"
}

function ajax(url){
  // 不能像上面一样在异步操作里面返回数据，否则函数执行会忽略掉异步操作直接返回 undefined
  return new Promise(function(resolve,reject){   // Promise 将会保存异步操作
    let xhr = new XMLHttpRequest();
    xhr.open("get",url);
    xhr.send();
    xhr.onreadystatechange = function(){
      if(this.readyState === 4){
        if(this.status === 200){
          resolve(JSON.parse( this.response ));
        }
        else{
          reject(new Error(this.response));
        }
      }
    }
  });
}
