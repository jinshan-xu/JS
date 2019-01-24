#### 1. <a href="https://github.com/yuche/javascript" target="_blank">Airbnb ES6 代码规范 - 中文翻译版</a></br>
#### 2. <a href="https://github.com/airbnb/javascript" target="_blank">Airbnb ES6 代码规范 - 英文版</a></br>

##### 1. 学习笔记
> 1. 使用 const 定义引用数据类型. const a = [1];

> 2. 使用扩展运算符复制数组. const b = [...a];  PS. a == b -> false

> 3. 使用 Array.from() 将类数组转换为数组. const args = Array.from(Arguments);

> 4. 使用解构存取和使用多属性对象。

> 5. 对数组使用解构赋值. const [first, second] = ary;

> 6. 需要回传多个值时，使用对象解构而不是数组解构. 

> 7. 字符串使用单引号 ''. 

> 8. 使用函数声明代替函数表达式.

> 9. 不要使用 arguments，可以使用 rest 语法 ... 代替.

> 10. 总是使用 class 而避免操作 prototype.

> 11. 总是使用模组（import/export）而不是其他非标准模块系统.

> 12. 一直使用 const 声明变量. PS. ??

> 13. 使用 // FIXME: 标注问题

> 14. 使用 // TODO: 标注问题的解决方式

> 15. 不要保存 this, 使用 箭头函数 或者 bind 绑定 this.

> 16. 需要使用存取函数时，以 getValue() / setValue("value") 命名。
