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
		,'./libraries/RGraph.drawing.rect'
		,'./libraries/RGraph.pie'  
		,'./libraries/RGraph.common.key'
		
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
				
			if(typeof(layout.gutterTop) == "undefined")
				layout.gutterTop=30;			
			if(typeof(layout.gutterLeft) == "undefined")
				layout.gutterLeft=100;
			if(typeof(layout.chartRadius) == "undefined")
				layout.chartRadius=100;			
			if(typeof(layout.donutWidth) == "undefined")
				layout.donutWidth=100;	
			if(typeof(layout.labelTextSize) == "undefined")
				layout.labelTextSize=100;	
			if(typeof(layout.segmentBorderWidth) == "undefined")
				layout.segmentBorderWidth=5;		
			if(typeof(layout.labelDistance) == "undefined")
				layout.labelDistance=10;
			if(typeof(layout.keyHalign) == "undefined")
				layout.keyHalign="right";	
			if(typeof(layout.keyPositionX) == "undefined")
				layout.keyPositionX=0;	
			if(typeof(layout.keyPositionY) == "undefined")
				layout.keyPositionY=0;	
			if(typeof(layout.graphGutter) == "undefined")
				layout.graphGutter="graph";
			if(typeof(layout.borderColor) == "undefined"){
				layout.borderColor={};
				layout.borderColor.color="#fff";	
			}
			/*
			if(typeof(layout.thousandSeparator) == "undefined")
				layout.thousandSeparator=".";
			if(typeof(layout.decimalSeparator) == "undefined")
				layout.decimalSeparator=",";			
			*/

			//debug propose only, please comment
			//console.log('Data returned: ', layout.qHyperCube);
			
			var app = qlik.currApp(this);
			var html="";
			/*this.backendApi.eachDataRow(function(rownum, row) {
				html += row[0].qState + ' - ' +
					row[0].qElemNumber + ' - ' + row[0].qText + '</br>';
			
			});
			console.log(html);
			if(this.backendApi.hasSelections())
				teste="Teve Seleção";
			*/
			//console.log(teste);
			
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
			var dimArray =[];
			var measArrayNum =[];
			var measArrayText =[];
			var total= 0;
			var palette =["RGB(141,170,203)","RGB(252,115,98)","RGB(187,216,84)","RGB(255,217,47)","RGB(102,194,150)","RGB(229,182,148)","RGB(231,138,210)","RGB(179,179,179)","RGB(166,216,227)","RGB(171,233,188)","RGB(27,125,156)","RGB(255,191,201)","RGB(77,167,65)","RGB(196,178,214)","RGB(178,36,36)","RGB(0,172,172)","RGB(190,108,44)","RGB(105,84,150)","RGB(80,160,240)","RGB(240,160,80)","RGB(141,170,203)","RGB(252,115,98)","RGB(187,216,84)","RGB(255,217,47)","RGB(102,194,150)","RGB(229,182,148)","RGB(231,138,210)","RGB(179,179,179)","RGB(166,216,227)","RGB(171,233,188)","RGB(27,125,156)","RGB(255,191,201)","RGB(77,167,65)","RGB(196,178,214)","RGB(178,36,36)","RGB(0,172,172)","RGB(190,108,44)","RGB(105,84,150)","RGB(80,160,240)","RGB(240,160,80)","RGB(141,170,203)","RGB(252,115,98)","RGB(187,216,84)","RGB(255,217,47)","RGB(102,194,150)","RGB(229,182,148)","RGB(231,138,210)","RGB(179,179,179)","RGB(166,216,227)","RGB(171,233,188)","RGB(27,125,156)","RGB(255,191,201)","RGB(77,167,65)","RGB(196,178,214)","RGB(178,36,36)","RGB(0,172,172)","RGB(190,108,44)","RGB(105,84,150)","RGB(80,160,240)","RGB(240,160,80)"];	



			var	paletteBlue=["#051D5C","#0F2662","#193068","#23396E","#2D4374","#374C7A","#415680","#4C5F86","#56698C","#607292","#6A7C98","#74859E","#7E8FA4","#8998AA","#93A2B0","#9DABB6","#A7B5BC","#B1BEC2","#BBC8C8","#C5D2CF"];
			var paletteGreen=["#034502","#0D4C0C","#185316","#225B20","#2D622B","#376A35","#42713F","#4C784A","#578054","#61875E","#6C8F69","#769673","#819E7D","#8BA588","#96AC92","#A0B49C","#ABBBA7","#B5C3B1","#C0CABB","#CBD2C6"];
			var paletteRed=["#940005","#97090D","#9B1216","#9F1C1F","#A32528","#A62E31","#AA383A","#AE4142","#B24A4B","#B65454","#B95D5D","#BD6766","#C1706F","#C57977","#C98380","#CC8C89","#D09592","#D49F9B","#D8A8A4","#DCB2AD"];
			
			var paletteYellowWhite =["#ffc22b","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)"];
			
			var paletteWhiteYellow =["rgba(0,0,0,0)","#ffc22b","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)"];

			var paletteBlueWhite =["RGB(141,170,203)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)"];			
			var paletteWhiteBlue =["rgba(0,0,0,0)","RGB(141,170,203)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)"];
			
			var paletteRedWhite =["RGB(252,115,98)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)"];
			
			
			var paletteWhiteRed =["rgba(0,0,0,0)","RGB(252,115,98)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)","rgba(0,0,0,0)"];			
			
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
			
			var paletteBG=
			[
			'Gradient(white:RGB(141,170,203))',
                    'Gradient(white:#ff0:#aa0:#660)', 'Gradient(white:#f00:#a00:#600)',
                    'Gradient(white:#0ff:#0aa:#066)', 'Gradient(white:#0f0:#0a0:#060)',
                    'Gradient(white:#fff:#aaa:#666)', 'Gradient(white:#f0f:#a0a:#606)',
                    'Gradient(white:#ff0:#aa0:#660)','Gradient(white:#f00:#a00:#600)',
                    'Gradient(white:#0ff:#0aa:#066)','Gradient(white:#0f0:#0a0:#060)',
                    'Gradient(white:#fff:#aaa:#666)', 'Gradient(white:#f0f:#a0a:#606)',
                    'Gradient(white:#fff:#aaa:#666)'			];
					

			if(layout.palette=="default")
				palette=palette;
			else if(layout.palette=="bluegradient")
				palette=paletteBlue;
			else if(layout.palette=="redgradient")
				palette=paletteRed;
			else if(layout.palette=="greengradient")
				palette=paletteGreen;
			else if(layout.palette=="paletteBG")
				palette=paletteBG;			
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
			
			var paletteKeep = [];
			var valueBelow = " - ";
			if(layout.valueBelow)
				valueBelow = " \n ";
			for (var i=0; i<numberOfDimValues;i++){

				paletteKeep[i]=palette[layout.qHyperCube.qDataPages[0].qMatrix[i][0].qElemNumber];
				dimArray[i] = layout.qHyperCube.qDataPages[0].qMatrix[i][0].qText;
				console.log(layout.qHyperCube.qDataPages[0].qMatrix[i][1]);
				//measArray[i] = layout.qHyperCube.qDataPages[0].qMatrix[i][1].qText.replace(",",".");
				measArrayNum[i] = layout.qHyperCube.qDataPages[0].qMatrix[i][1].qNum;
				measArrayText[i] = layout.qHyperCube.qDataPages[0].qMatrix[i][1].qText;
				dimMeasArray[i] = dimArray[i] + valueBelow +measArrayText[i];
				
				total=total+parseFloat(measArrayNum[i]);				
				
			}
			
			if(layout.keepColors)
				palette=paletteKeep;
			
			/*TODO -->await works on  here to get variable
			
			
			  var obj = await app.variable.getContent('ThousandSep').then( reply => {obj=reply;});
			*/
			
			
			
			//console.log(app.variable.getContent("ThousandSep").$$state.value);
			//console.log(layout.thousandSeparator);
			//% to Only Values
			var measArrayPerc = [];
			//var measArrayValue = [];
			
			var dimMeasPercArray=[];
			var dimMeasPercTPArray=[];			
			
			var origin=-Math.PI/2;
			var originAcc = 0;
			for (var i=0; i<numberOfDimValues;i++){
				
				//measArrayValue[i]=layout.qHyperCube.qDataPages[0].qMatrix[i][1].qText.replace(",",".");
				//measArrayValue[i]=measArray[i];
				
				var measPercArray = (parseFloat(measArrayNum[i])/total)*100;
				
				originAcc=originAcc+(2*(Math.PI*(parseFloat(measArrayNum[i])/total)));
				if(dimArray[i]==layout.rotateUpFor){
					origin = 
					-1.57
					-(originAcc
					-(Math.PI*(parseFloat(measArrayNum[i])/total))
					//*(i+1)
					);
				}
				
				
				measPercArray= parseFloat(measPercArray).toFixed(1);
				
				
				
				measArrayPerc[i]=measPercArray + "%";
				//measArrayValue[i]=measTransformed;
				
				
				dimMeasPercArray[i] = dimArray[i] +valueBelow +measPercArray + "%";
				dimMeasPercTPArray[i] = dimensionName+'</br>' +
										'<div style="color:' + palette[i]+';">' + dimArray[i]+": " +measArrayText[i]+"</div>" +
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
			
			//var origin = -Math.PI/2;
			
			
			
			// set segment border color to allow border to switch on and off
			if (layout.segmentBorder) {
				//console.log(layout.borderColor.color);
				var segmentBorder2 = [layout.borderColor.color];
				
				if(layout.segmentBorderInOne=="1"){
					segmentBorder2 = [layout.borderColor.color, 'rgba(0,0,0,0)'];
					//(-1.57+0.144),
					//origin=-1.57+origins[1];
				}				
				else if (layout.segmentBorderInOne=="2"){
					segmentBorder2 = ['rgba(0,0,0,0)', layout.borderColor.color];
					//origin=-1.57-origins[0];
				}
					
					
				
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
					if(layout.onlyValues)
						labelsArray=measArrayText;		
					if(layout.showValues=="percent"){
						var labelsArray = dimMeasPercArray;
						if(layout.onlyValues)
							labelsArray=measArrayPerc;						
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
			//chartVariant="pie3d";
					
			
			
			
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
			html+='<div id="canvas-wrapper-'+tmpCVSID+'"><canvas id="' + tmpCVSID + '" width="'+width+'" height="'+height+'">[No canvas support]</canvas></div><div id="myKey-'+tmpCVSID+'"></div>';

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

			var labelTextSize = parseInt(testRadius*0.04)*(layout.labelTextSize/100);
			if(labelTextSize< 7)
				labelTextSize=7;


			
			//console.log(layout.gutterLeft);
			//console.log(layout.gutterTop);

			
			
			
			switch(chartTypeEffect) {
				// Draws 3d pie chart
				case "Default":
					chart = new RGraph.Pie({
						id: tmpCVSID,
						data: measArrayNum,
						options: {
							origin:origin,
							gutterLeft: layout.gutterLeft,
							gutterRight: 100,
							gutterTop: layout.gutterTop,
							gutterBottom: 50, 
							linewidth: layout.segmentBorderWidth,
							textSize: labelTextSize,
							textColor: '#aaa',
							halign: 'center',
							strokestyle: segmentBorder2,
							tooltips: labelDimMeasArray,
							tooltipsEvent: 'onmousemove',
							/*Nao  funciona  ainda
							tooltipsOverride: tooltip_override,
							*/								
							labels: labelsArray,
							key:layout.showLegends ? dimArray: null,
							keyHalign:layout.keyHalign,
							keyPositionX:layout.keyPositionX,
							keyPositionY:layout.keyPositionY,
							keyPositionGraphBoxed:false,
							keyPosition:layout.graphGutter,
							keyTextBold:true,
							keyTextSize:labelTextSize-2,
							//keyInteractive: true,
							labelsDistance:layout.labelDistance,
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
						data: measArrayNum,
						options: {
							origin:origin,
							gutterLeft: layout.gutterLeft,
							gutterRight: 100,
							gutterTop: layout.gutterTop,
							gutterBottom: 50,
							linewidth: layout.segmentBorderWidth,
							textSize: labelTextSize,
							textColor: '#9fcfff',
							strokestyle: segmentBorder2,
							tooltips: labelDimMeasArray,
							tooltipsEvent: 'onmousemove',										
							labels: labelsArray,
							key:layout.showLegends ? dimArray: null,
							keyHalign:layout.keyHalign,
							keyPositionX:layout.keyPositionX,
							keyPositionY:layout.keyPositionY,
							keyPositionGraphBoxed:false,
							keyPosition:layout.graphGutter,
							keyTextBold:true,
							keyTextSize:labelTextSize-2,							
							labelsDistance:layout.labelDistance,							
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
								/*RGraph.path2(
									obj.context,
									'lw 5 b a % % % 0 6.2830 false s black',
									obj.centerx,
									obj.centery,
									obj.radius - 24
								);	*/							
								
								
								

							});
							
					if(layout.animation)//.grow();
						chart.roundRobin({frames: 30});
					else
						chart.draw();
							//.draw();
							
	
								
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
					
					
					
					
					//var x = (chart.canvas.width / 2)+((layout.textPosX/100)*chart.canvas.width);
					var x = (chart.canvas.width / 2)+(layout.textPosX);
					//console.log(x);
					//console.log(layout.textPosX);
					x=chart.centerx +layout.textPosX*(testRadius/100);
					//console.log(x);
					//var y = chart.get('gutterTop') + 5;
					//var y = ((chart.canvas.height / 2)*0.80)+((layout.textPosY/100)*chart.canvas.height);
					//var y = (((chart.canvas.height) / 2))+(layout.textPosY);
					var y = chart.centery + layout.textPosY*(testRadius/100);
					//console.log(y);
					//y=y-50;
					//y=y+layout.gutterTop;
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

			
			/** TODO KEY TO 3D PIE
			console.log(width)
			console.log(layout.keyPositionX*(testRadius/100));
			var rightX=(width - layout.keyPositionX*(testRadius/100));
			var topY = layout.keyPositionY*(testRadius/100);			
			var key = RGraph.HTML.Key('myKey-'+tmpCVSID,
			{
				colors: palette,
				labels:dimArray,
				tableCss: {
					position: 'relative',
					top: topY+"px",
					right: rightX+"px",
					transform: 'translateY(-50%)',
					backgroundColor:'rgba(0,0,0,0)'
				}
			});			
			**/
			
			/*Não funciona  ainda
			function tooltip_override (obj, text, x, y, idx,e,r)
			{
				if(idx==0){
					console.log("esse foi " +  y + " " + x + r);
					return true;
				}
				obj.tooltip(obj, text, 50, 50, idx);
				
				// Redraw the canvas so that any highlighting is gone
				obj.draw();
			}*/			
			
			
			
			// On Click actions
			function onClickDimension (e, shape)
			{
				var index = shape.index;
				//alert(dimensionName);
				//console.log(shape);
				//if(index==1)
					app.field(dimensionName).toggleSelect(dimArray[index], true);
				return  true;
			}	
			
			// On Mouse Over actions
			function onMouseMove (e, shape)
			{
				console.log("aaa");
				var index = shape.index;
				//self.backendApi.selectValues(0, dimArray[index], true);
				//if(index==1)
					app.field(dimensionName).toggleSelect(dimArray[index], true);
				return true;
			}					
			
			//needed for export
			return qlik.Promise.resolve();
		}	
		
		
		
	};

} );

