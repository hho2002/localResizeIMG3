## 介绍一下
lrz3

* 基于原生js
* 提供pc & mobile版本，修复之前各位提到的BUG和疑问。
* 仔细思考后，再一次重构了代码，移除了UI，仅作为纯粹的工具，方便二次开发。

希望这一版本能够真正帮到大家。 ：）

## 演示
![](http://think2011.qiniudn.com/lrz3-demo.gif)

[在线演示](http://lrz3.herokuapp.com/)

## 基本例子
请先根据情况引入 `lrz.mobile.min.js` 或 `lrz.pc.min.js`。

```javascript
var input = document.querySelector('input');

input.onchange = function () {
	lrz(this.files[0], function (results) {
	  // 你需要的数据都在这里，可以以字符串的形式传送base64给服务端转存为图片。
      console.log(results); 
	});
}
```

[详细API，点我](https://github.com/think2011/localResizeIMG3/wiki)

## 兼容性
* IE9 及 以上
* chrome 什么的都支持。
* 移动设备几乎都支持，若有问题，请先在 [在线演示](http://lrz3.herokuapp.com/) 测试一下。

![移动设备请扫描](http://think2011.qiniudn.com/lrz3-qrcode.png)

## lrz的历史
* lrz1，基于jquery。
* lrz2，基于原生js，却是用coffeescript写的 Orz, 有UI，存在已知BUG。

[有疑问请直接在 issues 中提问](https://github.com/think2011/localResizeIMG3/issues)

---
> ##### 时间： 2015年02月
> ##### 演示： [在线演示](http://lrz3.herokuapp.com/)
> ##### 源码： [lrz3](https://github.com/think2011/localResizeIMG3/blob/master/src/lrz.js)
> ##### 博客： [think2011](http://think2011.github.io)

