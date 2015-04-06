---
layout: post
title: "一个尚未解决的问题"
categories: articles
tags: [HTTP,字体,浏览器]
key: 10005
---
<div class="text-info">正确的标题不应该是这样的，但是由于此问题尚未解决，不知道该起什么名字好。:)</div>

起因是某日搜东西的跳到搜狗问问页面，字体如下图般混乱得无力吐槽。
<figure>
    <img src="{{ site.img-url }}sogou.png" alt="搜狗问问首页侧栏">
    <figcaption>Chrome下搜狗问问首页侧栏</figcaption>
</figure>

再查看渲染字体，把我一惊，居然有日文字体。可是明明样式里字体设置`font-family: tahoma,arial,helvetica,sans-serif,simsun;`除了把宋体错
误地写在最后以外，并没有什么地方设置了日文字体啊。而且，除了`html`标签未设置lang属性外，也没有什么问题啊。
<figure>
    <img src="{{ site.img-url}}rendered-fonts.png " alt="Rendered fonts">
    <figcaption>Chrome下该页面的渲染字体</figcaption>
</figure>

后来发现：原来是Chrome的设置问题啊！因为Safari和FireFox没有这个问题啊！(T_T)。刚好那时候学了一点HTTP方面的知识，发现：原来Chrome
下该网页的HTTP response header的content-language为ja。而FireFox为en-us,Safari为zh-cn。

<figure>
    <img src="{{ site.img-url }}res-header.png" alt="Content-language information">
    <figcaption>Chrome下该网页的响应头部信息</figcaption>
</figure>

且accept-language里ja也是首位的。
原来在Chrome语言设置里，日文被我稀里糊涂地排在了首位！所以，Chrome下会出现日文字体不足为奇啊。

>Content-Language is from the server, and lets the client know what language(s) are present on the requested page.
>Accept-Language is from the client, and lets the server know the user's preferred language(s).

**可是，为什么相同的设置，大多数网页都是正常的，且响应头里没有content-language信息呢？（后端知识不够啊.T_T）**
