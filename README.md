小巧实用的轮播插件
=================================== 
基本功能：
* 图片轮播
* 图片支持标题和内容
* 自定义切换图片间隔
* 支持指示器

###使用
下载并解压`slideBox.js`至工作目录<br>
在html中引入`slideBox.js`和`jquery.js`
```javascript
<script src="/js/jquery.js"></script>
<script src="/js/slideBox.js"></script>
```

在js代码中使用slideBox
```javascript
$('.slidebox').slideBox({//your config
    carousel:'#list',
	showCursor:true,
	timeout: 3500,
	toggleBtn:true
});
```

打开浏览器查看效果:)

###参数配置
####carousel
图片列表容器，id或者容器
####showCursor
是否显示指示器。默认为`true`：显示
####timeout
设置翻页间隔，默认`3500`毫秒
####toggleBtn
是否显示翻页按钮，默认为`true`：显示
