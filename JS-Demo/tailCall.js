/**
 * 1. 尾调用
 * 概念：函数内部的最后一个动作是函数的调用。该函数的返回值直接返回给函数。
 * https://juejin.im/post/59b88ede5188256c60692a85
 */

// demo-1 尾调用
function f(x) {
  return g(x);
}

/**
 * 执行上下文栈变换：(伪代码)
 * ECStack.push(<f> functionContext);
 *
 * ECStack.pop();
 *
 * ECStack.push(<g> functionContext);
 *
 * ECStack.pop();
 */

// demo-2 非尾调用
function a(x) {
  return b(x) + 1;
}

/**
 * 执行上下文栈变换：(伪代码)
 * ECStack.push(<a> functionContext);
 * 
 * ECStack.push(<b> functionContext);
 *
 * ECStack.pop();
 *
 * ECStack.pop();
 */