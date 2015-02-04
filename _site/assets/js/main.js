/**
 * Created by shoko on 15/1/18.
 */
window.onscroll = function(){
    var site_nav = document.getElementById("site-nav");
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if(scrollTop > 70) {
        site_nav.className = "site-nav";
    }
    else {
        site_nav.className = " ";
    }
}