
#移动web相关的学习和demo
##1.关于设备逻辑像素与物理像素
在 iPhone 4 前的时代，逻辑像素和物理像素是一一对应的——即，设计中的一个点对应屏幕硬件上的一个像素点<br/>
而 iPhone 4 之后，Retina 屏幕出现。在 Retina 屏幕上，使用 4 个硬件上的像素点 (2 x 2) 来表示一个逻辑像素点。<br/>
* 在开发环境中，使用 12 pt 的字体，在非 Retina 屏幕上字面高度为 12 个物理像素点；而同样是 12 pt 的字体，在 Retina (@2x) 屏幕上的字面高度，是 24 个像素点。
* 同样，使用代码来生成的一个 20 pt x 30 pt 尺寸的举行，在非 Retina 屏幕中尺寸为 20 x 30 个物理像素；而在 Retina (@2x) 屏幕上，其尺寸为 40 x 60 个物理像素。<br/>

![](http://img.kuqin.com/upimg/allimg/140725/13132G950-0.png)  

>在 Retina 屏幕上进行设计，文字尺寸、空间大小等等都应该遵照逻辑像素进行。比如，为 iPhone 4/4s （逻辑像素 320 pt x 480 pt，物理像素 620 px x 960）设计，则界面中各个元素的尺度应当以 320 x 480 为准；在 Retina 屏幕上的「2x」，可以理解为元素的精细度翻了一倍。换言之，多出来的那些像素并不是用来显示更多内容的，而是用来提高这些内容的精细程度的。这样，同样界面在 iPhone 4/4s 和旧设备上的差别，就仅在于画面的精细程度，而非内容的多寡。使用设计软件制作界面元素时尺寸的翻倍，也是为了提高精细度；在开发环境中，仍是按照 @1x 的逻辑来设计界面；如果误用 @2x 的尺度，则会导致文字、控件等过小。
>用 pt (points) 这个单位，也是强调了逻辑像素与物理像素不应等同理解。

总而言之，逻辑像素是设计时应当参考的尺度；而物理像素，则是设备屏幕实际具有的像素数目。<br/>

##2.移动设备缩放比(meta标签与viewport)
基于移动设备的逻辑像素与物理像素的关系衍生出一个概念`DPR`<br/>
简而言之就是设备上物理像素和逻辑像素(device-independent pixels (dips))的比例。<br/>
例如iphone5的dpr为2，那么它的逻辑像素为320x568,而它的物理像素则为(320x2)x(568x2)<br/>
为了页面在手机端以逻辑像素为基准正确显示，我们的meta标签应该这样写<br/>

>\<meta name="viewport" content="width=device-width">

这样写页面的宽度始终是设备的逻辑像素，对于iphone5而言就是320px<br/>
再加一句`initial-scale=1`则表示页面首次被显示按实际尺寸显示，无任何缩放<br/>
user-scalable:是否可对页面进行缩放，no 禁止缩放<br/>
这样就构成了移动web页面meta标签的常用写法
>\<meta name="viewport" content="width=device-width,initial-scale=1.0">

##3.flex布局与百分比布局
flex布局就是`弹性盒子布局`，旨在提供一个更加有效的方式来布置，对齐和分布在容器之间的各项内容，即使它们的大小是未知或者动态变化的<br/>
>弹性布局的主要思想是让容器有能力来改变项目的宽度和高度，以填满可用空间（主要是为了容纳所有类型的显示设备和屏幕尺寸）的能力。
最重要的是弹性盒子布局与方向无关，相对于常规的布局（块是垂直和内联水平为基础），很显然，这些工作以及网页设计缺乏灵活性，无法支持大型和复杂的应用程序（特别当它涉及到改变方向，缩放、拉伸和收缩等）。

###属性介绍
display: flex | inline-flex; (适用于父类容器元素上)<br/>
定义一个flex容器，内联或者根据指定的值，来作用于下面的子类容器。<br/>
* box：将对象作为弹性伸缩盒显示。（伸缩盒最老版本）（css3）
* inline-box：将对象作为内联块级弹性伸缩盒显示。（伸缩盒最老版本）（CSS3）
* flexbox：将对象作为弹性伸缩盒显示。（伸缩盒过渡版本）（CSS3）
* inline-flexbox：将对象作为内联块级弹性伸缩盒显示。（伸缩盒过渡版本）（CSS3）
* flex：将对象作为弹性伸缩盒显示。（伸缩盒最新版本）（CSS3）
* inline-flex：将对象作为内联块级弹性伸缩盒显示。（伸缩盒最新版本）（CSS3）

>css 列（CSS columns）在弹性盒子中不起作用
float, clear and vertical-align 在flex项目中不起作用

###栗子
####1.居中对齐
>.flex-container {<br/>
  display: flex;<br/>
  flex-flow: row wrap;<br/>
  justify-content: space-around;<br/>
}<br/>

    * 通过设置父类容器的css代码控制子元素的排列方式（flex-direction:row）从左到右（默认方式）。
    * 子元素超出内容时是否换行。flex-wrap:wrap（采用换行的方式）。
    * 合起来就是flex-flow:row wrap
    * 设置子元素的弹性盒堆叠伸缩行的对齐方式为在盒子中平局分布 justify-content:space-around
####2.自适应导航
>
.navigation {<br/>
  display: flex;<br/>
  flex-flow: row wrap;<br/>
  justify-content: flex-end;<br/>
}<br/>
@media all and (max-width: 800px) {<br/>
  .navigation {<br/>
    justify-content: space-around;<br/>
  }<br/>
}<br/>
@media all and (max-width: 500px) {<br/>
  .navigation {<br/>
    flex-direction: column;<br/>
  }<br/>
}<br/>

    * 设置子元素为从左到右（flex-direction:row），内容超出换行（flex-wrap:wrap）.
    * 设置子元素的内容向右对齐（justify-content:flex-end）
    * 当小于800px时，内容为居中，当小于500px时，内容纵向排列，从上到下。
####3.常见3栏移动优先布局
>.wrapper {<br/>
  display: flex;<br/>
  flex-flow: row wrap;<br/>
}<br/>
.header, .main, .nav, .aside, .footer {<br/>
  flex: 1 100%;<br/>
}<br/>
@media all and (min-width: 600px) {<br/>
  .aside { flex: 1 auto; }<br/>
}<br/>
@media all and (min-width: 800px) {<br/>
  .main { flex: 2 0px; }<br/>
  .aside-1 { order: 1; }<br/>
  .main    { order: 2; }<br/>
  .aside-2 { order: 3; }<br/>
  .footer  { order: 4; }<br/>
}<br/>

    * 设置子元素从左到右，超出换行（flex-flow:row wrap;）。
    * 默认情况下所有子元素拓展比例为1（flex-grow:1），伸缩比例为100%（flex-basis:100%）。
    * 大于800px时，.main的拓展比例为2.伸缩值为0（flex-basis:0px）,并且侧栏aside-1排列在第一位，main在第二位，aside-2在第三位。
    * 大于600时。.aside元素的拓展比例为1（flex-grow:1），伸缩比例为auto（flex-basis:auto）。

我们知道常见的PC端页面都是固定宽高的，而到了移动端由于设备逻辑像素的限制，固定宽高的布局将不适合于在小屏幕上显示<br/>
而百分比布局的好处就是可以根据不同设备宽度来自适应布局<br/>
简单来说百分比布局就是把DOM元素的宽从原来的固定宽度改变为所占设备屏幕总宽度的百分比，通过换算得到百分比的值在相应的应用到元素上<br/>
###栗子
>假设页面上有一个div，class为div1
.div1{
    width:50%;height:200px;background:#ff004f;
}
这个div的宽度就是它父级的50%，百分比布局的元素的宽度始终都是相对于其父级的宽度

其次，应用百分比布局的元素，其内部的图片也应当使用弹性图片

>div1中有一个图片，为了使图片随div的缩放而缩放
.div img{
    max-width:100%;
}

##响应式设计
传统的一些网站在应用于PC和移动端时会采取PC移动各一套的方案，常见的www.XXX.com为PC，同时也单独开发m.XXX.com应用于移动端，这样既增加了工作量，同时也产生了许多重复的开发工作<br/>
响应式设计最根本要解决的就是这种pc移动两套网站的痛点，采用css3 MediaQuery来为不同宽度的设备应用不同的css样式，使一个网站在不同设备下自适应页面布局，减少了重复开发的工作量同时也提升了用户体验<br/>
###媒体查询
响应式设计最核心的技术点就是CSS3的`媒体查询`（Mediaquery）<br/>
###相对单位rem
为了适应各种屏幕尺寸的设备，使用传统的px作为单位并不能根据尺寸的大小而改变，而使用相对单位更能体现页面的兼容性<br/>
常见的相对单位有两个<br/>
* em:根据父节点的font-size作为参照点
* rem:根据html根节点的font-size作为参照点

很明显em在多层节点嵌套下会变得非常复杂，难以控制<br/>
而rem使用html根节点的font-size作为全局统一的参照点，便于计算<br/>

##交互
>移动web页面上的lcick事件有300ms延迟

在移动页面上应该使用自定义的事件来代替click事件<br/>
自定义Tap事件原理：<br/>
在touchstart、touchend时记录事件、手指位置，在touchend时进行比较，如果手指位置为同一位置（或可以允许移动一个非常小的位移值）且事件间隔较短（200ms），过程中未曾处罚过touchmove事件，即可认为出发了移动设备上的'click'，一般称为`Tap`<br/>
移动端的zepto库实现了tap事件<br/>
但是Tap事件会有一个点穿的bug<br/>

##ZeptoJS
1.可以无缝接入和改造现有的jQuery相关项目<br/>
2.学习成本低<br/>

zepto中的$看起来和jquery的$相同<br/>
zepto中的$也主要用于选择器<br/>
zepto选择器返回的是一个数组
>$('#sidebar').toString()---->>"[object Array]"

###Core模块(核心模块)
如果将一个dom节点直接传给$，也会返回一个数组对象<br/>
>var dom=document.getElementById('sidebar')---->>$(dom)<br/>

$.camelCase方法<br/>
把一个字符串返回为驼峰命名格式的字符串<br/>
...<br/>

$.each方法<br/>
遍历数组<br/>

$.extend方法<br/>
继承<br/>

以及与jQuery相同的一些常用方法<br/>

###Event模块
zepto的event模块与jQuery稍有不同<br/>
支持以下方法用于绑定和解除事件<br/>
>bind<br/>
delegate<br/>
die<br/>
live<br/>
off<br/>
on<br/>
one<br/>
trigger<br/>
triggerHandler<br/>

$.Event自定义事件方法<br/>
>$.Event('mylib:change', { bubbles: false })<br/>
trigger方法用于触发自定义事件

Touch events<br/>
扩展事件，用于移动端触屏的手势等事件<br/>
* tap       ---->>点击事件
* singleTap、doubleTap     ---->>单击和双击
* longTap       ---->>长按
* swipe, swipeLeft, swipeRight, swipeUp     ---->>上下左右滑动
###Ajax模块
支持以下方法用于ajax与服务器通信<br/>
>$.ajax<br/>
$.ajaxJSONP<br/>
$.ajaxSettings<br/>
$.get<br/>
$.getJSON<br/>
$.param<br/>
$.post<br/>
load<br/>

基本与jQuery相同，但是zepto使用`XMLHttpRequest` lv2协议，可以直接实现跨域请求<br/>

###Form模块
包含三个方法用于表单相关操作<br/>
>serialize<br/>
serializeArray<br/>
submit<br/>

###Effects模块
包含两个方法用于动画相关<br/>
>$.fx<br/>
animate<br/>

以上是zeptoJS所有自带模块相关简介
