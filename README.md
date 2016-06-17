
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
