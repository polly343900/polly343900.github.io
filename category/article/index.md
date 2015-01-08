---
layout: page
title: 编程是为了更好的生活。。。
---
<div class="wrapper">
<ul class="post-list clearfix">
{% for post in site.categories.articles %}
  <li><a href="{{ site.url }}{{ post.url }}">{{ post.title }} <span class="entry-date"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time></span></a></li>
{% endfor %}
</ul>
</div>

