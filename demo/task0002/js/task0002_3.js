(function(){
	var defaults = {
		reverse: false,
		loop: true,
		interval: 2000
	}
	
	function Carousel(el, options){
		this.options = $.extend(defaults, options);
		this.el = el;
		this.indicator = $('#indicator')[0];
		this.indList = $.query('li', this.indicator);
		this.itemLen = this.indList.length;
		this.height = el.getSize().height / this.itemLen;
		this.flag = false;
		this.index = 0;
		this.show();
		this.autoPlay();
	}
	
	Carousel.prototype.moveTo = function(index){
		if(this.flag) return;
		this.indList[this.index].className = '';
		index = (index + this.itemLen) % this.itemLen;
		this.el.setCss3Style('transition', 'all 800ms ease-in-out');		
		this.el[0].style.top = - this.height * index + 'px';						
		this.index = index;
		this.indList[this.index].className = 'selected';
		this.flag = true;
	};
	
	Carousel.prototype.show = function(){
		var that = this;
		var idcArray = $.slice.call(this.indList);
		$.delegate('#indicator', 'li', 'click', function(e){
			var idx = idcArray.indexOf(e.target);
			that.moveTo(idx);
			this.flag = false;
		});
	};
	
	Carousel.prototype.autoPlay = function(){
		this.flag = false;
		var that = this;
		if(this.options.reverse === true){
			setTimeout(function(){
				that.moveTo(that.index - 1);
				that.autoPlay();			
			}, that.options.interval);
		} else {
			setTimeout(function(){
				that.moveTo(that.index + 1);
				that.autoPlay();
			}, that.options.interval);
		}
	};
	
	$.fn.carousel = function(options){
		var that = this;
		var carousel = new Carousel(this, options);
	};
})();