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
        
		var diff = this.endDate - Date.now();
		if(diff > 0){
		    this.remainDays = Math.floor(diff / days);
		    this.remainHours = Math.floor((diff % days) / hours);
		    this.remainMinutes = Math.floor((diff % hours) / minutes);
		    this.remainSeconds = Math.round((diff % minutes) / seconds);
		}		
	};
	
	CountDown.prototype.show = function () {
	    this.calculate();
		var timeDisplay = $('#time')[0];
		timeDisplay.innerHTML = '距离 ' + this.endDate.toString() + ' 还剩 ' + this.remainDays + 
		        ' Days ' + this.remainHours + 
			    ' Hours ' + this.remainMinutes + 
			    ' Minutes ' + this.remainSeconds + ' Seconds';
		var that = this;
		setTimeout(function(){
			that.show();
		}, 1000);		
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