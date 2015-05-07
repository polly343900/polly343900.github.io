(function () {
	var autoInput = $('#autocomplete')[0];
	var resultEle = $('#result')[0];
	var keys = {
		up: 38,
		down: 40,
		enter: 13
	};
	
	function chooseRow(pace){
		var list = $.slice.call(($.query('li', resultEle)));
		var selected = $.query('.selected', resultEle)[0];
		var index = list.indexOf(selected);
		var len = list.length;
		if(!!list){
			if(index > -1){					
				list[index].className = '';
				index = (index + pace + len) % len;
			} else if(pace > 0){
				index = 0;
			} else if(pace < 0) {
				index = len - 1;
			}
			list[index].className = 'selected';
			autoInput.value = list[index].innerHTML;
		}
	}
	
	document.onclick = function(){
		resultEle.style.display = 'none';
	}
	
	$.delegate('#result', 'li', 'click', function(e){
		autoInput.value = e.target.innerHTML;
	});
	
	$.on("form", 'submit', function(e){
		e.preventDefault();
	})
	
	$.on('#autocomplete', 'keyup', function(e){
		var that = this;
		if(e.keyCode > 47 && e.keyCode < 91 || e.keyCode === 8){
		$.ajax('test.json', {
			type: 'get',
			onsuccess: function(_data){
				var data = JSON.parse(_data);
                if(data){
				    var pos = $('#autocomplete').getPosition();				    
				    resultEle.style.left = pos.x + 'px';
				    resultEle.style.top = pos.y + 'px';
				    resultEle.style.display = 'block';
					resultEle.innerHTML = '';
					if(data[that.value]){						
						var len = data[that.value].length > 4 ? 4 : data[that.value].length;
						for(var i = 0; i < len; i++){
							var pass = document.createElement("li");
				            pass.innerHTML = data[that.value][i];
                            resultEle.appendChild(pass);
						}						
					}
                }
			}
		});
		}
		if(e.keyCode === keys.up){
			chooseRow(-1);
		} else if(e.keyCode === keys.down){
			chooseRow(1);
		} else if(e.keyCode === keys.enter){			
			var selected = $.query('.selected', resultEle)[0];
			if(!!selected) autoInput.value = selected.innerHTML;
			resultEle.style.display = 'none';
		}
	});
})();