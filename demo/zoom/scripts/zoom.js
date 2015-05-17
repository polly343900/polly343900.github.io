(function (root, factory) {

    // AMD加载模块
    if ( typeof define === 'function' && define.amd ) {
        define([], factory(root));
    } else if ( typeof exports === 'object' ) {  // Common JS方式
        module.exports = factory(root);
    } else {
        root.zoom = factory(root);    //普通的
    }
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {

    // 深拷贝函数
    function extend(out){
        out = out || {};

        for(var i = 1; i < arguments.length; i++){
            var obj = arguments[i];

            if(!obj) continue;

            for(var key in obj){
                if(obj.hasOwnProperty(key)){
                    if(typeof obj[key] === 'object' && obj[key] !== null){

                        // 若obj[key]也是个对象且不为null时递归执行
                        extend(out[key], obj[key]);
                    } else {
                        out[key] = obj[key];
                    }
                }
            }
        }
        return out;
    }

    // 检测是否存在某个类
    function hasClass(ele, name){
        if(!name) return;

        // classList是IE10才开始支持
        if(ele.classList) return ele.classList.contains(name);
        else {
            var classRE = new RegExp('(^|\\s)' + name + '(\\s|$)');
            return classRE.test(ele.className);
        }
    }

    // 添加类
    function addClass(ele, name){
        if(!name) return;
        if(ele.classList) return ele.classList.add(name);
        else if(!hasClass(ele, name)){
            ele.className += ' ' + name;
            console.log(true);
        }
    }

    // 删除类
    function removeClass(ele, name){
        if(!name) return;
        if(ele.classList) return ele.classList.remove(name);
        else if(hasClass(ele, name)){
            var classRE = new RegExp('(^|\\s)' + name + '(\\s|$)');
            ele.className = ele.className.replace(classRE, ' ');
        }
    }
    // 之前以为需要，现在没用上，不知道以后要不要用
    function offset(ele){
        var pos = {
            x: 0,
            y: 0
        }

        while(ele.offsetParent !== null){
            pos.x += ele.offsetLeft;
            pos.y += ele.offsetTop;
            ele = ele.offsetParent;
        }
        return pos;
    }

    // 默认参数
    var defaults = {
        url: '',  // 图片url
        ratio: 1,  // 初始图片比例
        pace: 0.5  // 图片缩放幅度
    }

    // zoom就是一个插件/模块
    var Zoom = function(){
    };

    Zoom.prototype.load = function(){
        if(this.settings.url) {
            this.zoomImg.setAttribute('src', this.settings.url);
        } else {
            this.zoomImg.setAttribute('src', this.img.getAttribute('src'));
        }
        addClass(this.zoomImg, 'zoom');
        var that = this;
        this.zoomImg.onload = function() {
            that.change();
        }
        this.target.appendChild(that.zoomImg);
    };

    Zoom.prototype.change = function(){

        this.zoomImg.style.height = this.settings.ratio * this.img.height + 'px';
        this.zoomImg.style.width = this.settings.ratio * this.img.width + 'px';
        this.zoomImg.style.top = 0;
        this.zoomImg.style.left = 0;
    }

    Zoom.prototype.from = function(e){

        this.prevX = e.pageX;
        this.prevY = e.pageY;

    };

    Zoom.prototype.to = function(e){

        // 之所以没用上offset是因为，在这里offset已经被抵消了。不知是否理解有误
        var diffX = e.pageX - this.prevX;
        var diffY = e.pageY - this.prevY;

        // XX.style.left等是带有单位的，要去掉单位
        var left = parseInt(this.zoomImg.style.left) + diffX;
        var top = parseInt(this.zoomImg.style.top) + diffY;

        var bottom = Math.abs(top) / (this.settings.ratio - 1);
        var right = Math.abs(left) / (this.settings.ratio - 1 );

        // 上下左右边缘检测
        if(left > 0) left = 0;
        if(top > 0) top = 0;
        if(right > this.img.width) left = -this.img.width * (this.settings.ratio - 1);
        if(bottom > this.img.height) top = -this.img.height * (this.settings.ratio - 1);

        this.zoomImg.style.left = left + 'px';
        this.zoomImg.style.top = top + 'px';
    };

    Zoom.prototype.destroy = function(){
        if(!this.settings) return;

        this.settings = null;
        this.target.removeChild(this.zoomImg);
        this.zoomImg = null;

    }

    // 这里还是没有设计好，本来应该只暴露init方法的
    Zoom.prototype.init = function(element, options){

        // 删除上一个实例所含的信息，不然会造成比如图片重叠等
        this.destroy();

        this.settings = extend({}, defaults, options);

        this.target = element;
        this.img = element.querySelector('img');
        this.zoomImg = new Image();

        this.plus = document.getElementById('plus');
        this.minus = document.getElementById('minus');
        if(this.settings.ratio <= 1) addClass(this.minus, 'disabled');

        this.load();
        var that = this;

        this.plus.addEventListener('click', function(e){
            that.settings.ratio += that.settings.pace;
            removeClass(that.minus, 'disabled');
            that.change();
        });

        this.minus.addEventListener('click', function(e){

            // 缩放的图片大小等于原图时，不往下执行了
            if(that.settings.ratio <= 1) {
                return;
            }
            that.settings.ratio -= that.settings.pace;
            that.change();

            if(that.settings.ratio <= 1) addClass(this, 'disabled');
        });

        // 监测到鼠标按下的动作后，记录其所在位置，为了防止图片本身具有的拖动属性，使用e.preventDefault()
        this.zoomImg.addEventListener('mousedown', function(e){
            that.from(e);
            e.preventDefault();
        });

        // 监测到鼠标松开的动作，计算位移差，也就是图片需要移动的距离
        this.zoomImg.addEventListener('mouseup', function(e){

            // 缩放图片大小等于原图时，不能拖动
            if(that.settings.ratio <= 1) return;
            that.to(e);
        })


    };

    var zoom = new Zoom();

    return zoom;

});
