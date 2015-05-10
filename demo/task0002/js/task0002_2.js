(function(){
	var dateRE = /(\d{4})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/;
	
	function CountDown(el){
		this.el = el[0];
		this.dateInput = $('#dateInput')[0];
		this.dateSubmit = $('#dateSubmit')[0];
		this.validate();
		this.start();		
	}
	
	CountDown.prototype.validate = function(){
		var that = this;
		$.on('#dateInput', 'keyup', function(){
			if(!dateRE.test(that.dateInput.value)){
			    that.dateSubmit.disabled = true;
		    }
		   else that.dateSubmit.disabled = false;
		});
	};
	
	CountDown.prototype.calculate = function(){
		var milliseconds = 1;
	    var seconds = 1000 * milliseconds;
	    var minutes = 60 * seconds;
	    var hours = 60 * minutes;
	    var days = 24 * hours;				
        this.remainDays = Math.floor(this.diff / days);
		this.remainHours = Math.floor((this.diff % days) / hours);
		this.remainMinutes = Math.floor((this.diff % hours) / minutes);
		this.remainSeconds = Math.round((this.diff % minutes) / seconds);		
	};
	
	CountDown.prototype.show = function () {
		var timeDisplay = $('#time')[0];
		this.diff = this.endDate - Date.now();
		if(this.diff >= 0){
	        this.calculate();		
		    timeDisplay.innerHTML = '距离' + this.endDate.getFullYear()
		        + '年' + (this.endDate.getMonth() + 1)
		        + '月' + (this.endDate.getDate())
			    + '日还剩' + this.remainDays 
			    + '天' + this.remainHours 
			    + '小时' + this.remainMinutes 
			    + '分钟' + this.remainSeconds + '秒';
		    var that = this;
		    setTimeout(function(){
			    that.show();
		    }, 1000);
		} else {
			timeDisplay.innerHTML = '您的时间已经过期了哟~';
		}		
	};
	
	CountDown.prototype.start = function(){
		var that = this;				
		$.on('#dateSubmit', 'click', function(){
			var inputDate = that.dateInput.value;
		    var dateArray = inputDate.match(dateRE);
		    that.endDate = new Date(dateArray[1], dateArray[2] - 1, dateArray[3]);
			that.show();
		});
	}
	
	$.fn.countdown = function(){
		var cd = new CountDown(this);
	};	
})();