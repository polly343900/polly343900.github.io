---
layout: post
title: "jQuery Dom"
categories: articles
tags: [jQuery]
---
#####1. append(), appendTo()与after(), insertAfter()

存在dom里的被插元素.append(新建的插入元素), 新建的插入元素.appendTo(存在dom里的被插元素).

插入元素作为被插元素的最后一个子孩子。

after()/insertAfter()相当于append()/appendTo()的关系，不同的是，插入元素是作为被插元素的后相邻节点插入的。

#####2. wrap(), wrapAll(), wrapInner()

已有节点：`<strong></strong><strong></strong>`

代码：

+  `$("strong").wrap("<b></b>");`

Result: ` <b><strong></strong></b><b><strong></strong></b>`

+ `$("strong").wrapAll("<b></b>");`

Result: ` <b><strong></strong><strong></strong></b>`

+ `$("strong").wrapInner("<b></b>");`

Result: ` <strong><b></b></strong><strong><b></b></strong>`
