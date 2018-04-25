/*
Ruben Albuquerque
Donut/PieChart Chart using RGraph with options  to  customize

*/
define( [
		'jquery'
		,'qlik'
        ,'./properties/properties'
		,'./properties/initialProperties'
		,'./libraries/RGraph.common.core'
		,'./libraries/RGraph.common.dynamic'
		,'./libraries/RGraph.common.tooltips'
		,'./libraries/RGraph.common.resizing'
		,'./libraries/RGraph.drawing.text'
		,'./libraries/RGraph.pie'  
		
    ],
	
    function ( $, qlik, props, initProps) {
        'use strict';	
		//Inject Stylesheet into header of current document
		//$( '<style>' ).html(styleSheet).appendTo( 'head' );
        return {
			//Define the properties tab - these are defined in the properties.js file
             definition: props,
			
			//Define the data properties - how many rows and columns to load.
			 initialProperties: initProps,
			
			//Allow export to print object 
			support : { export: true,
						snapshot:true
			},
			
			//Not sure if there are any other options available here.
			 snapshot: {cantTakeSnapshot: true
			 },

			//paint function creates the visualisation. - this one makes a very basic table with no selections etc.
            paint: function ($element, layout) {
			//debug propose only, please comment
			//console.log('Data returned: ', layout.qHyperCube);
			
			var app = qlik.currApp(this);
			
			// Get the Number of Dimensions and Measures on the hypercube
			var numberOfDimensions = layout.qHyperCube.qDimensionInfo.length;
			//console.log(numberOfDimensions);
			var numberOfMeasures = layout.qHyperCube.qMeasureInfo.length;
			//console.log(numberOfMeasures);
			
			// Get the Measure Name and the Dimension Name
			var measureName = layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;
			//console.log(measureName);
			var dimensionName = layout.qHyperCube.qDimensionInfo[0].qFallbackTitle;
			//console.log(dimensionName);

			
			// Get the number of fields of a dimension
			var numberOfDimValues = layout.qHyperCube.qDataPages[0].qMatrix.length;
			//console.log(numberOfDimValues);
			
			// Get the values of the dimension
			var dimMeasArray=[];
			var dimMeasTPArray=[];
			var dimArray =[];
			var measArray =[];
			var total= 0;
			var palette =["RGB(141,170,203)","RGB(252,115,98)","RGB(187,216,84)","RGB(255,217,47)","RGB(102,194,150)","RGB(229,182,148)","RGB(231,138,210)","RGB(179,179,179)","RGB(166,216,227)","RGB(171,233,188)","RGB(27,125,156)","RGB(255,191,201)","RGB(77,167,65)","RGB(196,178,214)","RGB(178,36,36)","RGB(0,172,172)","RGB(190,108,44)","RGB(105,84,150)","RGB(80,160,240)","RGB(240,160,80)"];	



			var	paletteBlue=["#051D5C","#0F2662","#193068","#23396E","#2D4374","#374C7A","#415680","#4C5F86","#56698C","#607292","#6A7C98","#74859E","#7E8FA4","#8998AA","#93A2B0","#9DABB6","#A7B5BC","#B1BEC2","#BBC8C8","#C5D2CF"];
			var paletteGreen=["#034502","#0D4C0C","#185316","#225B20","#2D622B","#376A35","#42713F","#4C784A","#578054","#61875E","#6C8F69","#769673","#819E7D","#8BA588","#96AC92","#A0B49C","#ABBBA7","#B5C3B1","#C0CABB","#CBD2C6"];
			var paletteRed=["#940005","#97090D","#9B1216","#9F1C1F","#A32528","#A62E31","#AA383A","#AE4142","#B24A4B","#B65454","#B95D5D","#BD6766","#C1706F","#C57977","#C98380","#CC8C89","#D09592","#D49F9B","#D8A8A4","#DCB2AD"];
			
			var paletteYellowWhite =["#ffc22b","rgba(0,0,0,0)","RGB(141,170,203)","RGB(252,115,98)","RGB(187,216,84)","RGB(255,217,47)","RGB(102,194,150)","RGB(229,182,148)","RGB(231,138,210)","RGB(179,179,179)","RGB(166,216,227)","RGB(171,233,188)","RGB(27,125,156)","RGB(255,191,201)","RGB(77,167,65)","RGB(196,178,214)","RGB(178,36,36)","RGB(0,172,172)","RGB(190,108,44)","RGB(105,84,150)","RGB(80,160,240)","RGB(240,160,80)"];
			
			var paletteWhiteYellow =["rgba(0,0,0,0)","#ffc22b","RGB(141,170,203)","RGB(252,115,98)","RGB(187,216,84)","RGB(255,217,47)","RGB(102,194,150)","RGB(229,182,148)","RGB(231,138,210)","RGB(179,179,179)","RGB(166,216,227)","RGB(171,233,188)","RGB(27,125,156)","RGB(255,191,201)","RGB(77,167,65)","RGB(196,178,214)","RGB(178,36,36)","RGB(0,172,172)","RGB(190,108,44)","RGB(105,84,150)","RGB(80,160,240)","RGB(240,160,80)"];

			var paletteBlueWhite =["RGB(141,170,203)","rgba(0,0,0,0)","RGB(252,115,98)","RGB(187,216,84)","RGB(255,217,47)","RGB(102,194,150)","RGB(229,182,148)","RGB(231,138,210)","RGB(179,179,179)","RGB(166,216,227)","RGB(171,233,188)","RGB(27,125,156)","RGB(255,191,201)","RGB(77,167,65)","RGB(196,178,214)","RGB(178,36,36)","RGB(0,172,172)","RGB(190,108,44)","RGB(105,84,150)","RGB(80,160,240)","RGB(240,160,80)"];			
			var paletteWhiteBlue =["rgba(0,0,0,0)","RGB(141,170,203)","RGB(252,115,98)","RGB(187,216,84)","RGB(255,217,47)","RGB(102,194,150)","RGB(229,182,148)","RGB(231,138,210)","RGB(179,179,179)","RGB(166,216,227)","RGB(171,233,188)","RGB(27,125,156)","RGB(255,191,201)","RGB(77,167,65)","RGB(196,178,214)","RGB(178,36,36)","RGB(0,172,172)","RGB(190,108,44)","RGB(105,84,150)","RGB(80,160,240)","RGB(240,160,80)"];
			
			var paletteRedWhite =["RGB(252,115,98)","rgba(0,0,0,0)","RGB(141,170,203)","RGB(187,216,84)","RGB(255,217,47)","RGB(102,194,150)","RGB(229,182,148)","RGB(231,138,210)","RGB(179,179,179)","RGB(166,216,227)","RGB(171,233,188)","RGB(27,125,156)","RGB(255,191,201)","RGB(77,167,65)","RGB(196,178,214)","RGB(178,36,36)","RGB(0,172,172)","RGB(190,108,44)","RGB(105,84,150)","RGB(80,160,240)","RGB(240,160,80)"];
			
			
			var paletteWhiteRed =["rgba(0,0,0,0)","RGB(252,115,98)","RGB(141,170,203)","RGB(187,216,84)","RGB(255,217,47)","RGB(102,194,150)","RGB(229,182,148)","RGB(231,138,210)","RGB(179,179,179)","RGB(166,216,227)","RGB(171,233,188)","RGB(27,125,156)","RGB(255,191,201)","RGB(77,167,65)","RGB(196,178,214)","RGB(178,36,36)","RGB(0,172,172)","RGB(190,108,44)","RGB(105,84,150)","RGB(80,160,240)","RGB(240,160,80)"];			
			
			if(numberOfDimValues<=6){
				paletteBlue=["#051D5C","#2D4374","#56698C","#7E8FA4","#A7B5BC","#C5D2CF"];
				paletteGreen=["#034502","#2D622B","#578054","#819E7D","#ABBBA7","#CBD2C6"];
				paletteRed=["#940005","#A32528","#B24A4B","#C1706F","#D09592","#DCB2AD"];				
			}
			else if(numberOfDimValues<=10){
				paletteBlue=["#051D5C","#193068","#2D4374","#415680","#56698C","#6A7C98","#7E8FA4","#93A2B0","#A7B5BC","#BBC8C8"];
				paletteGreen=["#034502","#185316","#2D622B","#42713F","#578054","#6C8F69","#819E7D","#96AC92","#ABBBA7","#C0CABB"];
				paletteRed=["#940005","#9B1216","#A32528","#AA383A","#B24A4B","#B95D5D","#C1706F","#C98380","#D09592","#D8A8A4"];				
			}

			if(layout.palette=="default")
				palette=palette;
			else if(layout.palette=="bluegradient")
				palette=paletteBlue;
			else if(layout.palette=="redgradient")
				palette=paletteRed;
			else if(layout.palette=="greengradient")
				palette=paletteGreen;
			else if(layout.palette=="yellowwhite")
				palette=paletteYellowWhite;	
			else if(layout.palette=="whiteyellow")
				palette=paletteWhiteYellow;				
			else if(layout.palette=="redwhite")
				palette=paletteRedWhite;	
			else if(layout.palette=="whitered")
				palette=paletteWhiteRed;	
			else if(layout.palette=="bluewhite")
				palette=paletteBlueWhite;	
			else if(layout.palette=="whiteblue")
				palette=paletteWhiteBlue;				
			/** TODO Pedir decimal e milhar do QS **/
			for (var i=0; i<numberOfDimValues;i++){
				dimArray[i] = layout.qHyperCube.qDataPages[0].qMatrix[i][0].qText;
				measArray[i] = layout.qHyperCube.qDataPages[0].qMatrix[i][1].qText;
				total=total+parseFloat(measArray[i].replace(",","."));
				//console.log(parseFloat(measArray[i]));
				dimMeasArray[i] = dimArray[i] + " \n " +measArray[i];
				dimMeasTPArray[i] = dimArray[i] + " </br>- " +measArray[i];
			}
			//console.log(total);
			
			var dimMeasPercArray=[];
			var dimMeasPercTPArray=[];			
			for (var i=0; i<numberOfDimValues;i++){
				var measPercArray = (parseFloat(layout.qHyperCube.qDataPages[0].qMatrix[i][1].qText.replace(",","."))/total)*100;
				
				measPercArray= parseFloat(measPercArray).toFixed(1);

				dimMeasPercArray[i] = dimArray[i] + " \n " +measPercArray + "%";
				dimMeasPercTPArray[i] = dimensionName+'</br>' +
										'<div style="color:' + palette[i]+';">' + dimArray[i]+": " +measArray[i]+"</div>" +
										"Percentual: " + measPercArray + "%";
				
				
			}
			
			
			
			var dimensionLength=layout.qHyperCube.qDataPages[0].qMatrix.length;
			
			var chart;
			
			
			
			
			
			

					
			
			
			// set shadow color to allow shadow to switch on and off
			var shadowYN = 'rgba(0,0,0,0)';

			//console.log(shadowYN);
			
			
			// set exploding segments based off easy selection variable (will not store string required)
			switch(layout.explodeSegment) {
				case 0:
					var explodeSegment2 = [0];
					
					break;
				case 1:
					var explodeSegment2 = [20];					
					break;
				case 2:
					var explodeSegment2 = [0,20];
					break;
				case 3:
					var explodeSegment2 = [0,0,20];
					break;
				case 4:
					var explodeSegment2 = [0,0,0,20];
					break;
				case 5:
					var explodeSegment2 = [0,0,0,0,20];
					break;
			}
			
			
			// set segment border color to allow border to switch on and off
			if (layout.segmentBorder) {
				var segmentBorder2 = '#fff';
				
				if(layout.segmentBorderInOne=="1")
					segmentBorder2 = ['black', 'rgba(0,0,0,0)'];
				else if (layout.segmentBorderInOne=="2")
					segmentBorder2 = ['rgba(0,0,0,0)', 'black'];
			} else {
				var segmentBorder2 = 'rgba(0,0,0,0)';
			}
			
			//Always Toolptip  completed?
			var labelDimMeasArray = dimMeasPercTPArray;
			// Activate or Deactivate Labels Sticks as sticks should not show if labels not selected.
			if (layout.chartLabels) {
				var labelsArray = dimArray;
				//var labelDimMeasArray =dimArray;
				
				if(layout.showValues=="value"||layout.showValues=="percent"){
					var labelsArray = dimMeasArray;
					//var labelDimMeasArray =dimMeasTPArray;		
					if(layout.showValues=="percent"){
						var labelsArray = dimMeasPercArray;
						//var labelDimMeasArray = dimMeasPercTPArray;
					}					
				}
				

			} else {
				var labelsArray = [];
				//var labelDimMeasArray =[];
			}
			//layout.labelSticks
			
			//layout.showValues =  true;
			// se
			
			
			// Swtich between charts to draw below 
			switch(layout.chartEffect) {
				case "Halo":
					var chartTypeEffect = "Halo";
					var chartVariant = layout.chartType;
					break;
				case "2d":
					var chartTypeEffect = "Default";
					var chartVariant = layout.chartType;
					break;
			}
					
			
			
			
/* 			
			var html = '';
			
			var width = $element.width(), height = $element.height();
			html+='<div id="canvas-wrapper"><canvas id="cvs" width="'+width+'" height="'+height+'">[No canvas support]</canvas></div>';
			
			$element.html(html);
			
			RGraph.Reset(document.getElementById('cvs'));
			
	 */		
			
			//To generate random numbers to allow multiple charts to present on one sheet:
			function guid() {return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();};
			function s4() {return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);};
			var tmpCVSID = guid();
						


			var html = '';			
			var width = $element.width(), height = $element.height();
			// add canvas for chart			
			html+='<div id="canvas-wrapper"><canvas id="' + tmpCVSID + '" width="'+width+'" height="'+height+'">[No canvas support]</canvas></div>';

			$element.html(html);

			var testRadius = width;
			if(width>height)
				testRadius=height;
			testRadius=testRadius*(layout.chartRadius/75);
			//console.log(testRadius);
			//layout.chartRadius = (layout.chartRadius/300)*testRadius;
			//testRadius=(layout.chartRadius/300)*testRadius;
			RGraph.Reset(document.getElementById(tmpCVSID));

			//console.log(testDonut);
			//console.log(testRadius);
			var testDonut=testRadius*0.1*(layout.donutWidth/100);
			
			//var testDonut = layout.donutWidth;
			if(testDonut <= 0)
				testDonut = 1;
			if(testDonut >= 0.30*testRadius)
				testDonut = (0.30*testRadius)-1;

			var labelTextSize = parseInt(testRadius*0.03);
			if(labelTextSize< 7)
				labelTextSize=7;
			switch(chartTypeEffect) {
				// Draws 3d pie chart
				case "Default":
					chart = new RGraph.Pie({
						id: tmpCVSID,
						data: measArray,
						options: {
							gutterLeft: 100,
							gutterRight: 100,
							gutterTop: 30,
							gutterBottom: 50, 
							linewidth: layout.segmentBorderWidth,
							textSize: labelTextSize,
							textColor: '#aaa',
							halign: 'center',
							strokestyle: segmentBorder2,
							//tooltips: layout.showValues ? dimMeasTPArray : dimArray,
							tooltips: labelDimMeasArray,
							tooltipsEvent: 'onmousemove',					
							//labels: layout.showValues ? labelDimMeasArray : labelsArray,	
							labels: labelsArray,				
							colors: palette,
							labelsColors:palette,
							labelsSticksUsecolors:true,
							labelsBold:true,
							variant: chartVariant,
							//radius: layout.chartRadius,
							radius: 0.30*testRadius,
							labelsSticksList: layout.labelSticks,
							labelsSticksBold: true,
							//labelsSticksColors: [,'#cc0',,,'#0f0',,'black'],
							labelsSticksColors:'#aaa',
							//radius: 80,
							//width:200,
							shadowOffsety: 0,
							shadowColor: shadowYN,
							// ********************** you can change which segment explodes here, the first dimension in order is currently set [20,,] to explode by 20 pixels
							exploded: explodeSegment2,
							textAccessible: false,
							eventsClick: onClickDimension
							,
							variantDonutWidth:testDonut
							
							//eventsMousemove: onMouseMove,
						}
					});
					//var animation=true;
					if(layout.animation)//.grow();
						chart.roundRobin({frames: 30});
					else
						chart.draw();
					//.draw();
					

					
					break;

					// Draws Halo chart	
					case "Halo":
					chart = new RGraph.Pie({
						id: tmpCVSID,
						data: measArray,
						options: {
							gutterLeft: 100,
							gutterRight: 100,
							gutterTop: 30,
							gutterBottom: 50,
							linewidth: layout.segmentBorderWidth,
							textSize: labelTextSize,
							textColor: '#9fcfff',
							strokestyle: segmentBorder2,
							//tooltips: layout.showValues ? dimMeasTPArray : dimArray,
							tooltips: labelDimMeasArray,
							tooltipsEvent: 'onmousemove',					
							//labels: layout.showValues ? labelDimMeasArray : labelsArray,					
							labels: labelsArray,					
							colors: palette,
							labelsColors:palette,
							labelsSticksUsecolors:true,
							labelsBold:true,
							variant: chartVariant,
							//radius: layout.chartRadius,
							radius: 0.30*testRadius,
							//width: 50,
							labelsSticksList: layout.labelSticks,
							labelsSticksBold: true,
							labelsSticksColors: '#aaa',
							//radius: 80,
							shadowOffsety: 0,
							shadowColor: shadowYN,
							// ********************** you can change which segment explodes here, the first dimension in order is currently set [20,,] to explode by 20 pixels
							//exploded: explodeSegment2,
							textAccessible: false,
							eventsClick: onClickDimension,
							variantDonutWidth:testDonut
							//eventsMousemove: onMouseMove,
						}
					}).on('draw', function(obj)
							{
								RGraph.path2(
									obj.context,
									'lw 5 b a % % % 0 6.2830 false s white',
									obj.centerx,
									obj.centery,
									obj.radius - 12
								);
								
								
								

							}).draw();
							
	
								
					break;
				
					
			}
			
			
			chart.canvas.onmouseout = function (e)
			{
				// Hide the tooltip
				RGraph.hideTooltip();
				
				// Redraw the canvas so that any highlighting is gone
				RGraph.redraw();
			}
			//console.log(layout.colorText.color);
			if(layout.textMiddle){
					
					
					
					
					var x = (chart.canvas.width / 2)+layout.textPosX;
					//var y = chart.get('gutterTop') + 5;
					var y = ((chart.canvas.height / 2)*0.80)+layout.textPosY;
					//console.log(layout.textPosX);
					//console.log(layout.textPosY);
					var textSizeBase = parseInt(testRadius*0.05*(layout.sizeText/100));
					
					var sizeTextTest= textSizeBase;


					
					//console.log(x);
					
					var text = new RGraph.Drawing.Text({
						id: tmpCVSID,
						x: x,
						y: y,
						text: layout.textMiddle.replace(/\\n/g,"\n"),
						options: {
							valign: 'top',
							halign: 'center',
							marker: false,
							//size: layout.sizeText,
							size: sizeTextTest,
							colors:[layout.colorText.color],
							bold:true,
							font: 'QlikView Sans',
							tooltips: [layout.textMiddle.replace(/\\n/g,"\n")],
							tooltipsHighlight: false,
							tooltipsEvent: 'mousemove',
							bounding: false
						}
					}).on('beforedraw', function (obj)
					{
						//RGraph.setShadow(obj,'#aaa',2,2,5);
					}).on('draw', function (obj)
					{
						RGraph.noShadow(obj);
					}).draw();
			}
			
			
			
			
			
			
			
			
			
			// On Click actions
			function onClickDimension (e, shape)
			{
				var index = shape.index;
				//alert(dimensionName);
				//console.log(shape);
				app.field(dimensionName).toggleSelect(dimArray[index], true);
			}	
			
			// On Mouse Over actions
			function onMouseMove (e, shape)
			{
				var index = shape.index;
				//self.backendApi.selectValues(0, dimArray[index], true);
				app.field(dimensionName).toggleSelect(dimArray[index], true);
				return true;
			}					
			
			//needed for export
			return qlik.Promise.resolve();
		}	
		
		
		
	};

} );

