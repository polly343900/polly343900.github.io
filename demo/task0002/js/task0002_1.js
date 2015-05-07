(function(){
	
	// \uff0c: full width semicolon;
	// \u3001: ideographic comma;
	// \uff1b: full width comma
	var inputRE = /[\n\s,\uff0c\u3001;\uff1b]/;
	
	function InterestList(){
		this.submit = $('#submit')[0];
	    this.validate();
		this.showList();
	}
	
	InterestList.prototype.split = function(){
		var textInput = $('#textInput')[0].value;
		this.list = textInput.split(inputRE);
	};
	
	InterestList.prototype.validate = function(){
		var that = this;
		$.on('#textInput', 'keyup', function(){
			that.split();
			var len = that.list.length;
			if(len > 10 || that.list[0] === ''){
				that.submit.disabled = true;
				$('#bResult').addClass('show');
			} else {
				that.submit.disabled = false;
				$('#bResult').removeClass('show');
			}
		});
	};
	
	InterestList.prototype.showList = function(){
		var that = this;
		$.on('#submit', 'click', function(){
			$("#gResult")[0].innerHTML = '';
			var uniqueList = $.unique(that.list);
			var i;
			var len = uniqueList.length;
			for(i = 0; i < len; i++){
				var li = document.createElement('li');
				li.innerHTML = '<label><input type="checkbox">' +
				    uniqueList[i] + '</label>';
				$('#gResult')[0].appendChild(li);
			}
		});
	};
	
	$.fn.interestlist = function(){
		var ll = new InterestList();
	}
})();