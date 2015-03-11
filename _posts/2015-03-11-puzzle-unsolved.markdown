---
layout: post
title: "一个尚未解决的问题"
categories: articles
tags: [HTTP,字体,浏览器]
---
<div class="text-info">正确的标题不应该是这样的，但是由于此问题尚未解决，不知道该起什么名字好。:)</div>

起因是某日搜东西的跳到搜狗问问页面，字体混乱地无力吐槽。如下图：
<figure>
    <img src="{{ site.img-url }}sogou.png" alt="搜狗问问首页侧栏">
    <figcaption>Chrome下搜狗问问首页侧栏</figcaption>
</figure>

再查看渲染字体，把我一惊，居然有日文字体。可是明明样式里字体设置`font-family: Tahoma,Arial,Helvetica,sans-serif,SimSun;`除了把宋体错
误地写在最后以外，并没有什么地方设置了日文字体啊。而且，除了`html`标签未设置lang属性外，也没有什么问题啊。
<figure>
    <img src="{{ site.img-url}}rendered-fonts.png " alt="Rendered fonts">
    <figcaption>Chrome下该页面的渲染字体</figcaption>
</figure>

一个月后才发现：原来是Chrome的设置问题啊！因为Safari和FireFox没有这个问题啊！(T_T)。刚好那时候学了一点HTTP方面的知识，发现：原来Chrome
下网页的HTTP response header的content-language为ja。而FireFox为en-us,Safari为zh-cn。所以，Chrome下会出现日文字体不足为奇啊。同时
发现，出现这个问题的不仅仅是搜狗问问，还有丁香园。以及后来发现的，支付宝支付页面。可是，又是什么原因导致响应头的content-language为ja呢？
为什么查看别的正常的网页的响应头里不会有content-language信息呢？
<figure>
    <img src="{{ site.img-url }}res-header.png" alt="Content-language information">
    <figcaption>Chrome下该网页的响应头部信息</figcaption>
</figure>

一段时间我都认为是Google account的缘故，因为在Chrome登录的Google account是在日本实习的时候注册的，信息什么的都以在日实习信息为准。而且
切换账号后，content-language为zh-cn。

直到今天才发现，原来在Chrome语言设置里，日文被我稀里糊涂地排在了首位！尝试了下在FF下，设置语言为日文时，搜狗问问的字体也是混乱的。至此，应
该可以得出结论--浏览器的语言设置会影响content-language，进而会导致一些font-family书写错误的网页出现字体混乱。

但是问题没有结束，为什么有的响应头有content-language信息，有的响应头又没有呢？

还有，试用了node的Express框架，故意把`font-family`写成`arial,sans-serif,simsun`，浏览器渲染的字体为`stheiti`，并不是日文字体，而是
Mac下Chrome默认的字体。响应头里也没有content-language的信息。究竟是后端的什么东西影响了呢？