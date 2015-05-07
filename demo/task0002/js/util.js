(function(){

    var 
        arrProto = Array.prototype,
        objProto = Object.prototype,
        funProto = Function.prototype;
    
    // useful method for short
    var slice         = arrProto.slice,
        toString      = objProto.toString,
        hasOwnProperty = objProto.hasOwnProperty;

    // RegExp
    var emailRE = /^[a-z0-9]+[.]*[a-z0-9]*@([a-z0-9]+[.-])+[a-z0-9]+$/gi;
    var phoneRE = /^1[34578]\d{9}$/g;

    var root = this;
    var $ = function(args){
        return new Utils(args);
    };
    root.util = root.$ = $;

    var isArray = Array.isArray || function(arr){
        return toString.call(arr) === '[object Array]';
    };

    var isFunction = function(fun){
        return typeof(fun) === 'function';
    };

    var isObject = function(obj){
        return typeof(obj) === 'object';
    };

    var isWindow = function(obj){
        return obj!==null && obj === obj.window;
    };

    var isPlainObject = function(obj){
        return isObject && Object.getPrototypeOf(obj) == objProto && !isWindow;
    };

    var isRegExp = function(re){
        return toString.call(re) === '[object RegExp]';
    };

    var isArrayLike = function(obj){
        return (obj.length === +obj.length);
    };

    $.isArray = isArray;

    $.isFunction = isFunction;

    $.isObject = isObject;
    
    $.slice = slice;

    // clone object
    function clone(target, src, deep){
        var prop;
        for(prop in src){
            // if it is object(except window and other object) or array
            if(deep && isPlainObject(src[prop]) || isArray(src[prop])){
                clone(target[prop], src[prop]);
            }
            else if(hasOwnProperty.call(src, prop)){
                target[prop] = src[prop];
            }
        }
        return target;
    }

    $.extend = $.clone = clone;

    function unique(arr){
        var map = {};
        var i;
        for(i = 0; i < arr.length; i++){
            if(typeof map[arr[i]] === 'undefined'){
                map[arr[i]] = arr[i];
            }
            else{
                arr.splice(i,1);
                i--;
            }
        }
        return arr;
    }
    
    $.unique = unique;

    function trim(str){
        return str.replace(/^\s*|\s*$/g, '');
    }

    $.trim = String.trim || trim;

    function each(arr, fn){
        if(!isFunction(fn)){
            throw new TypeError(fn + ' is not a function');
        }
        var brr;
        if(!isArray(fn)){
            brr = slice.call(arr);
        }
        var i;
        for(i = 0; i < brr.length; i++){
            fn.call(brr,brr[i]);
        }
    }
    
    $.each = each;

    function some(arr, fn){
        if(!isFunction(fn)){
            throw new TypeError(fn + ' is not a function');
        }
        var brr;
        if(!isArray(arr)){
            if(!arr.length){
                brr = [arr];
            }
            else brr = slice.call(arr);
        }
        var i;
        for(i = 0; i < brr.length; i++){
            if(fn.call(brr,brr[i])){
                return true;
            }
        }
        return false;
    }

    function isEmail(emailStr){
        return emailRE.test(emailStr);
    }

    function isMobilePhone(phone){
        return phoneRE.test(phone);
    }

    // return Array
    function query(selectors, scope){
        var dom = [];
        if(typeof selectors !== 'string') return;
        selectors = trim(selectors);
        var isSimple = /^[\w-.#]+$/.test(selectors);
        if(isSimple){
            switch(selectors.charAt(0)){
                case '#': 
                    dom = [scope.getElementById(selectors.substring(1))];
                    break;
                case '.':
                    dom = scope.getElementsByClassName(selectors.substring(1));
                    break;
                default:
                    dom = scope.getElementsByTagName(selectors);
            }
        }
        else {
            dom = scope.querySelectorAll(selectors);
        }
        return dom;
    }
    
    $.query = query;

    // make the instance $() arraylike object 
    function Utils(selectors){
        var dom = query(selectors, document);
        for(var i = 0; i < dom.length; i++){
            this[i] = dom[i];
        }
        this.length = dom.length;
    }
    
    function hasClass(eles, name){
        if(!name) return false;
        return some(eles, function(j){
            var eleClassName = j.className;
            // make class regexp like this: /(^|\s)name(\s|$)/
            var classRE = new RegExp('(^|\\s)' + name + '(\\s|$)');
            if(classRE.test(eleClassName)) return true;
            else return false;
        });        
    }
    $.hasClass = hasClass;
    
    // DOM operation
    Utils.prototype = {
        constructor: Utils,
        length: 0,
        splice: [].splice,

        addClass: function(name){
            if(!name) return this;
            var i;
            for(i = 0;i < this.length;i++){
                if(!hasClass(this[i], name)){
                    this[i].className = this[i].className + " " + name;
                }   
            }
            return this;
        },

        removeClass: function(name){
            if(!name) return this;
            var i;
            var classRE = new RegExp('(^|\\s)' + name + '(\\s|$)');
            for(i = 0;i < this.length;i++){
                if(hasClass(this[i], name)){
                    // 1.match and delete classname 2.remove extra space
                    this[i].className = trim(this[i].className.replace(classRE, ' '));
                }
            }
            return this;
        },

        isSiblingNode: function(node){
            var ele = this[0];
            if(isArrayLike(node)) node = node[0];
            return ele.parentNode === node.parentNode;
        },

        getPosition: function(){
            var ele = this[0];
            var pos = {
                x: 0,
                y: 0
            };
            while(ele.offsetParent !== null){
                pos.x += ele.offsetLeft;
                pos.y += ele.offsetTop;
                ele = ele.offsetParent;
            }
            return pos;
        },
        
        getSize: function(){
            var ele = this[0];
            var size = ele.getBoundingClientRect();
            return {
                width: size.width,
                height: size.height
            }
        },
        
        setCss3Style: function(prop, val){
            var i;
            var ele = this[0];
            var flag = true;
            var vendors = ['-webkit-', '-moz-', '-o-', ''];
            function toCamelCase(str){
                return str.replace(/(-[a-z])/gi, function($1){
                    return $1.toUpperCase().replace('-','');
                });
            }
            for(i = 0; flag && i < vendors.length; i++){
                var p = toCamelCase(vendors[i] + prop);
                if(p in ele.style){
                    ele.style[p] = val;
                    flag = false;
                }
            }
            
        }
    };
    
    $.fn = Utils.prototype;

    // Events Handler
    function addEvent(element, event, listener){
        if(element.addEventListener){
            element.addEventListener(event, listener, false);
        } else if(element.attachEvent){
            element.attachEvent('on' + event, function(e){
                return listener.call(element, e);
            });
        } else {
            element['on' + event] = listener;
        }
    }

    function removeEvent(element, event, listener){
        if(element.removeEventListener){
            element.removeEventListener(event, listener, false);
        } else if(element.attachEvent){
            element.detachEvent('on' + event, listener);
        } else {
            element['on' + event] = null;
        }
    }

    function delegateEvent(element, tag, eventName, listener) {
        var tags = query(tag, element);
        addEvent(element, eventName, function(e){
            each(tags, function(i){
                if(e.target === i){
                    listener.call(i, e);
                }
            });
        });
    }

    $.on = function(selectors, event, listener){
        var elements = query(selectors, document);
        each(elements, function(element){
            addEvent(element, event, listener);
        });     
    };

    $.off = function(selectors, event, listener){
        var elements = query(selectors, document);
        each(elements, function(element){
            removeEvent(element, event, listener);
        });  
    };

    $.delegate = function(selectors, tag, event, listener){
        var elements = query(selectors, document);
        each(elements, function(element){
            delegateEvent(element, tag, event, listener);
        });
    };

    // BOM
    function isIE(){
        return /Trident/.test(navigator.userAgent);
    }

    function setCookie(cookieName, cookieValue, expiredays){
        var expires = new Date(Date.now() + expiredays * 24 * 60 * 60 * 1000);
        var cookieText = encodeURLComponent(cookieName) + '=' + encodeURLComponent(cookieValue)
            + '; expires=' + expires.toGMTString(); 
        document.cookie = cookieText;
    }

    function getCookie(cookieName) {
        // /=([^;]+)/ exclude semicolon
        var match = document.cookie.match(new RegExp(cookieName + '=([^;]+)'));
        if(match) return match[1];
    }

    function ajax(url, options){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 || xhr.status === 0){
                    options.onsuccess(xhr.responseText);
            }
                else {
                    console.log("unsucessful" + xhr.status);
                }
            }
        };
        xhr.open(options.type, url, true);
        xhr.send(null);
    }

    $.ajax = ajax;



}.call(this));