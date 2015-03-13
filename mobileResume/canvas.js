(function(){

		var can = document.getElementById("mycanvas");
        var ctx = can.getContext("2d");

        // data sets -- set literally or obtain from an ajax call
        var options = {
        	title: "技能表",
        	header: "擅长程度",
        	dataName: [ "HTML基础", "Canvas", "HTML5其余知识", "CSS基础","CSS3","Bootstrap","ES5","DOM","BOM","JQuery&Zepto" ],
        	dataValue: [ 80, 20, 20, 65, 40, 30, 50, 40, 30, 30 ],
        	maxVal: 100,
        	stepSize: 20,
        	colHead: 60,
        	rowHead: 60,
        	margin: 20,
        	colorList: ["#d84315", "#ffab91", "#ffab91", "#1e88e5","#42a5f5","#64b5f6","#ffeb3b","#ffee58","#fff176","#fff176"]
        };
        
 
        function init(ctx, options) {

            // set these values for your data
            var numSamples = options.dataName.length;
            var yScalar = (can.height - options.colHead - options.margin) / (options.maxVal);
        	var xScalar = (can.width - options.rowHead) / (numSamples);
            ctx.fillStyle = "black";
            ctx.strokeStyle = "rgba(128,128,128, 0.9)"; 
            ctx.beginPath();

            // print  column header
            ctx.font = "20px STHeiti";
            ctx.fillText(options.header, 0, options.colHead - options.margin);

            // ctx.font = "30px stheiti";
            // ctx.fillText(options.title, 400, 40, 200);

            // print row header and draw horizontal grid lines
            
            var count =  0;
            for (var scale = options.maxVal; scale >= 0; scale -= options.stepSize) {
                var y = options.colHead + (yScalar * count * options.stepSize);
                ctx.fillText(scale, options.margin, y + options.margin);
                // ctx.moveTo(options.rowHead, y);
                // ctx.lineTo(can.width, y);
                count++;
            }
            ctx.stroke();

            // label samples
            
            ctx.textBaseline = "bottom";
            for (var i = 0; i < numSamples; i++) {
                var newY = calcY(options.dataValue[i], yScalar);
                ctx.fillText(options.dataName[i], xScalar * (i + 1), newY - options.margin,0.8*xScalar);
            }            
            
            // translate to bottom of graph and scale x,y to match data
            ctx.translate(0, can.height - options.margin);
            ctx.scale(1, -1);

            // draw bars
            for (var j = 0; j < numSamples; j++) {
            	// set a color 
            	ctx.fillStyle = options.colorList[j];

                roundRect(ctx,(j + 1)*xScalar, 0, 0.5*xScalar, options.dataValue[j]*yScalar,5,true,false);
            }
        }
 
        function calcY(value, yScalar) {
            var y = can.height - value * yScalar;
            return y;
        }

        // draw a rounded Rectangle
        function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
			if (typeof stroke === "undefined" ) {
				stroke = true;
			}
			if (typeof radius === "undefined") {
				radius = 5;
			}
			ctx.beginPath();
			ctx.moveTo(x + radius, y);
			ctx.lineTo(x + width - radius, y);
			ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
			ctx.lineTo(x + width, y + height - radius);
			ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
			ctx.lineTo(x + radius, y + height);
			ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
			ctx.lineTo(x, y + radius);
			ctx.quadraticCurveTo(x, y, x + radius, y);
			ctx.closePath();
			if (stroke) {
				ctx.stroke();
			}
			if (fill) {
				ctx.fill();
			}        
		}



        init(ctx, options);
})();