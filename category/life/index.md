---
layout: page
title: 记录生活
---
> きっといいことがあります~
<p class="clearfix"><cite>— 《白雪姬杀人事件》</cite></p>

<div class="wrapper">
<ul class="post-list">
{% for post in site.categories.life %}
  <li class="post-list-li"><a href="{{ site.url }}{{ post.url }}">{{ post.title }} <span class="entry-date"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time></span></a></li>
{% endfor %}
</ul>
</div>

