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
			if(typeof(layout.borderColor) == "undefined")
				layout.borderColor.color="#fff";				

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
			var dimMeasTPArray=[];
			var dimArray =[];
			var measArray =[];
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
			
			var paletteBG = ["Gradient(white:RGB(141,170,203))","Gradient(white:RGB(252,115,98))","Gradient(white:RGB(187,216,84))","Gradient(white:RGB(255,217,47))","Gradient(white:RGB(102,194,150))","Gradient(white:RGB(229,182,148))","Gradient(white:RGB(231,138,210))","Gradient(white:RGB(179,179,179))","Gradient(white:RGB(166,216,227))","Gradient(white:RGB(171,233,188))","Gradient(white:RGB(27,125,156))","Gradient(white:RGB(255,191,201))","Gradient(white:RGB(77,167,65))","Gradient(white:RGB(196,178,214))","Gradient(white:RGB(178,36,36))","Gradient(white:RGB(0,172,172))","Gradient(white:RGB(190,108,44))","Gradient(white:RGB(105,84,150))","Gradient(white:RGB(80,160,240))","Gradient(white:RGB(240,160,80))","Gradient(white:RGB(141,170,203))","Gradient(white:RGB(252,115,98))","Gradient(white:RGB(187,216,84))","Gradient(white:RGB(255,217,47))","Gradient(white:RGB(102,194,150))","Gradient(white:RGB(229,182,148))","Gradient(white:RGB(231,138,210))","Gradient(white:RGB(179,179,179))","Gradient(white:RGB(166,216,227))","Gradient(white:RGB(171,233,188))","Gradient(white:RGB(27,125,156))","Gradient(white:RGB(255,191,201))","Gradient(white:RGB(77,167,65))","Gradient(white:RGB(196,178,214))","Gradient(white:RGB(178,36,36))","Gradient(white:RGB(0,172,172))","Gradient(white:RGB(190,108,44))","Gradient(white:RGB(105,84,150))","Gradient(white:RGB(80,160,240))","Gradient(white:RGB(240,160,80))","Gradient(white:RGB(141,170,203))","Gradient(white:RGB(252,115,98))","Gradient(white:RGB(187,216,84))","Gradient(white:RGB(255,217,47))","Gradient(white:RGB(102,194,150))","Gradient(white:RGB(229,182,148))","Gradient(white:RGB(231,138,210))","Gradient(white:RGB(179,179,179))","Gradient(white:RGB(166,216,227))","Gradient(white:RGB(171,233,188))","Gradient(white:RGB(27,125,156))","Gradient(white:RGB(255,191,201))","Gradient(white:RGB(77,167,65))","Gradient(white:RGB(196,178,214))","Gradient(white:RGB(178,36,36))","Gradient(white:RGB(0,172,172))","Gradient(white:RGB(190,108,44))","Gradient(white:RGB(105,84,150))","Gradient(white:RGB(80,160,240))","Gradient(white:RGB(240,160,80))"];
			
			//paletteBG=["Gradient(white:RGB(141,170,203):RGB(141,170,203))","Gradient(white:RGB(252,115,98):RGB(252,115,98))","Gradient(white:RGB(187,216,84):RGB(187,216,84))","Gradient(white:RGB(255,217,47):RGB(255,217,47))","Gradient(white:RGB(102,194,150):RGB(102,194,150))","Gradient(white:RGB(229,182,148):RGB(229,182,148))","Gradient(white:RGB(231,138,210):RGB(231,138,210))","Gradient(white:RGB(179,179,179):RGB(179,179,179))","Gradient(white:RGB(166,216,227):RGB(166,216,227))","Gradient(white:RGB(171,233,188):RGB(171,233,188))","Gradient(white:RGB(27,125,156):RGB(27,125,156))","Gradient(white:RGB(255,191,201):RGB(255,191,201))","Gradient(white:RGB(77,167,65):RGB(77,167,65))","Gradient(white:RGB(196,178,214):RGB(196,178,214))","Gradient(white:RGB(178,36,36):RGB(178,36,36))","Gradient(white:RGB(0,172,172):RGB(0,172,172))","Gradient(white:RGB(190,108,44):RGB(190,108,44))","Gradient(white:RGB(105,84,150):RGB(105,84,150))","Gradient(white:RGB(80,160,240):RGB(80,160,240))","Gradient(white:RGB(240,160,80):RGB(240,160,80))","Gradient(white:RGB(141,170,203):RGB(141,170,203))","Gradient(white:RGB(252,115,98):RGB(252,115,98))","Gradient(white:RGB(187,216,84):RGB(187,216,84))","Gradient(white:RGB(255,217,47):RGB(255,217,47))","Gradient(white:RGB(102,194,150):RGB(102,194,150))","Gradient(white:RGB(229,182,148):RGB(229,182,148))","Gradient(white:RGB(231,138,210):RGB(231,138,210))","Gradient(white:RGB(179,179,179):RGB(179,179,179))","Gradient(white:RGB(166,216,227):RGB(166,216,227))","Gradient(white:RGB(171,233,188):RGB(171,233,188))","Gradient(white:RGB(27,125,156):RGB(27,125,156))","Gradient(white:RGB(255,191,201):RGB(255,191,201))","Gradient(white:RGB(77,167,65):RGB(77,167,65))","Gradient(white:RGB(196,178,214):RGB(196,178,214))","Gradient(white:RGB(178,36,36):RGB(178,36,36))","Gradient(white:RGB(0,172,172):RGB(0,172,172))","Gradient(white:RGB(190,108,44):RGB(190,108,44))","Gradient(white:RGB(105,84,150):RGB(105,84,150))","Gradient(white:RGB(80,160,240):RGB(80,160,240))","Gradient(white:RGB(240,160,80):RGB(240,160,80))","Gradient(white:RGB(141,170,203):RGB(141,170,203))","Gradient(white:RGB(252,115,98):RGB(252,115,98))","Gradient(white:RGB(187,216,84):RGB(187,216,84))","Gradient(white:RGB(255,217,47):RGB(255,217,47))","Gradient(white:RGB(102,194,150):RGB(102,194,150))","Gradient(white:RGB(229,182,148):RGB(229,182,148))","Gradient(white:RGB(231,138,210):RGB(231,138,210))","Gradient(white:RGB(179,179,179):RGB(179,179,179))","Gradient(white:RGB(166,216,227):RGB(166,216,227))","Gradient(white:RGB(171,233,188):RGB(171,233,188))","Gradient(white:RGB(27,125,156):RGB(27,125,156))","Gradient(white:RGB(255,191,201):RGB(255,191,201))","Gradient(white:RGB(77,167,65):RGB(77,167,65))","Gradient(white:RGB(196,178,214):RGB(196,178,214))","Gradient(white:RGB(178,36,36):RGB(178,36,36))","Gradient(white:RGB(0,172,172):RGB(0,172,172))","Gradient(white:RGB(190,108,44):RGB(190,108,44))","Gradient(white:RGB(105,84,150):RGB(105,84,150))","Gradient(white:RGB(80,160,240):RGB(80,160,240))","Gradient(white:RGB(240,160,80):RGB(240,160,80))"]
			paletteBG=["Gradient(RGB(141,170,203):white:RGB(141,170,203):RGB(141,170,203))","Gradient(white:white:RGB(252,115,98):RGB(252,115,98))","Gradient(white:white:RGB(187,216,84):RGB(187,216,84))","Gradient(white:white:RGB(255,217,47):RGB(255,217,47))","Gradient(white:white:RGB(102,194,150):RGB(102,194,150))","Gradient(white:white:RGB(229,182,148):RGB(229,182,148))","Gradient(white:white:RGB(231,138,210):RGB(231,138,210))","Gradient(white:white:RGB(179,179,179):RGB(179,179,179))","Gradient(white:white:RGB(166,216,227):RGB(166,216,227))","Gradient(white:white:RGB(171,233,188):RGB(171,233,188))","Gradient(white:white:RGB(27,125,156):RGB(27,125,156))","Gradient(white:white:RGB(255,191,201):RGB(255,191,201))","Gradient(white:white:RGB(77,167,65):RGB(77,167,65))","Gradient(white:white:RGB(196,178,214):RGB(196,178,214))","Gradient(white:white:RGB(178,36,36):RGB(178,36,36))","Gradient(white:white:RGB(0,172,172):RGB(0,172,172))","Gradient(white:white:RGB(190,108,44):RGB(190,108,44))","Gradient(white:white:RGB(105,84,150):RGB(105,84,150))","Gradient(white:white:RGB(80,160,240):RGB(80,160,240))","Gradient(white:white:RGB(240,160,80):RGB(240,160,80))","Gradient(white:white:RGB(141,170,203):RGB(141,170,203))","Gradient(white:white:RGB(252,115,98):RGB(252,115,98))","Gradient(white:white:RGB(187,216,84):RGB(187,216,84))","Gradient(white:white:RGB(255,217,47):RGB(255,217,47))","Gradient(white:white:RGB(102,194,150):RGB(102,194,150))","Gradient(white:white:RGB(229,182,148):RGB(229,182,148))","Gradient(white:white:RGB(231,138,210):RGB(231,138,210))","Gradient(white:white:RGB(179,179,179):RGB(179,179,179))","Gradient(white:white:RGB(166,216,227):RGB(166,216,227))","Gradient(white:white:RGB(171,233,188):RGB(171,233,188))","Gradient(white:white:RGB(27,125,156):RGB(27,125,156))","Gradient(white:white:RGB(255,191,201):RGB(255,191,201))","Gradient(white:white:RGB(77,167,65):RGB(77,167,65))","Gradient(white:white:RGB(196,178,214):RGB(196,178,214))","Gradient(white:white:RGB(178,36,36):RGB(178,36,36))","Gradient(white:white:RGB(0,172,172):RGB(0,172,172))","Gradient(white:white:RGB(190,108,44):RGB(190,108,44))","Gradient(white:white:RGB(105,84,150):RGB(105,84,150))","Gradient(white:white:RGB(80,160,240):RGB(80,160,240))","Gradient(white:white:RGB(240,160,80):RGB(240,160,80))","Gradient(white:white:RGB(141,170,203):RGB(141,170,203))","Gradient(white:white:RGB(252,115,98):RGB(252,115,98))","Gradient(white:white:RGB(187,216,84):RGB(187,216,84))","Gradient(white:white:RGB(255,217,47):RGB(255,217,47))","Gradient(white:white:RGB(102,194,150):RGB(102,194,150))","Gradient(white:white:RGB(229,182,148):RGB(229,182,148))","Gradient(white:white:RGB(231,138,210):RGB(231,138,210))","Gradient(white:white:RGB(179,179,179):RGB(179,179,179))","Gradient(white:white:RGB(166,216,227):RGB(166,216,227))","Gradient(white:white:RGB(171,233,188):RGB(171,233,188))","Gradient(white:white:RGB(27,125,156):RGB(27,125,156))","Gradient(white:white:RGB(255,191,201):RGB(255,191,201))","Gradient(white:white:RGB(77,167,65):RGB(77,167,65))","Gradient(white:white:RGB(196,178,214):RGB(196,178,214))","Gradient(white:white:RGB(178,36,36):RGB(178,36,36))","Gradient(white:white:RGB(0,172,172):RGB(0,172,172))","Gradient(white:white:RGB(190,108,44):RGB(190,108,44))","Gradient(white:white:RGB(105,84,150):RGB(105,84,150))","Gradient(white:white:RGB(80,160,240):RGB(80,160,240))","Gradient(white:white:RGB(240,160,80):RGB(240,160,80))"];
			paletteBG=["Gradient(RGB(141,170,203):white:RGB(141,170,203):white:RGB(141,170,203))","Gradient(RGB(252,115,98):white:RGB(252,115,98):white:RGB(252,115,98))","Gradient(RGB(187,216,84):white:RGB(187,216,84):white:RGB(187,216,84))","Gradient(RGB(255,217,47):white:RGB(255,217,47):white:RGB(255,217,47))","Gradient(RGB(102,194,150):white:RGB(102,194,150):white:RGB(102,194,150))","Gradient(RGB(229,182,148):white:RGB(229,182,148):white:RGB(229,182,148))","Gradient(RGB(231,138,210):white:RGB(231,138,210):white:RGB(231,138,210))","Gradient(RGB(179,179,179):white:RGB(179,179,179):white:RGB(179,179,179))","Gradient(RGB(166,216,227):white:RGB(166,216,227):white:RGB(166,216,227))","Gradient(RGB(171,233,188):white:RGB(171,233,188):white:RGB(171,233,188))","Gradient(RGB(27,125,156):white:RGB(27,125,156):white:RGB(27,125,156))","Gradient(RGB(255,191,201):white:RGB(255,191,201):white:RGB(255,191,201))","Gradient(RGB(77,167,65):white:RGB(77,167,65):white:RGB(77,167,65))","Gradient(RGB(196,178,214):white:RGB(196,178,214):white:RGB(196,178,214))","Gradient(RGB(178,36,36):white:RGB(178,36,36):white:RGB(178,36,36))","Gradient(RGB(0,172,172):white:RGB(0,172,172):white:RGB(0,172,172))","Gradient(RGB(190,108,44):white:RGB(190,108,44):white:RGB(190,108,44))","Gradient(RGB(105,84,150):white:RGB(105,84,150):white:RGB(105,84,150))","Gradient(RGB(80,160,240):white:RGB(80,160,240):white:RGB(80,160,240))","Gradient(RGB(240,160,80):white:RGB(240,160,80):white:RGB(240,160,80))","Gradient(RGB(141,170,203):white:RGB(141,170,203):white:RGB(141,170,203))","Gradient(RGB(252,115,98):white:RGB(252,115,98):white:RGB(252,115,98))","Gradient(RGB(187,216,84):white:RGB(187,216,84):white:RGB(187,216,84))","Gradient(RGB(255,217,47):white:RGB(255,217,47):white:RGB(255,217,47))","Gradient(RGB(102,194,150):white:RGB(102,194,150):white:RGB(102,194,150))","Gradient(RGB(229,182,148):white:RGB(229,182,148):white:RGB(229,182,148))","Gradient(RGB(231,138,210):white:RGB(231,138,210):white:RGB(231,138,210))","Gradient(RGB(179,179,179):white:RGB(179,179,179):white:RGB(179,179,179))","Gradient(RGB(166,216,227):white:RGB(166,216,227):white:RGB(166,216,227))","Gradient(RGB(171,233,188):white:RGB(171,233,188):white:RGB(171,233,188))","Gradient(RGB(27,125,156):white:RGB(27,125,156):white:RGB(27,125,156))","Gradient(RGB(255,191,201):white:RGB(255,191,201):white:RGB(255,191,201))","Gradient(RGB(77,167,65):white:RGB(77,167,65):white:RGB(77,167,65))","Gradient(RGB(196,178,214):white:RGB(196,178,214):white:RGB(196,178,214))","Gradient(RGB(178,36,36):white:RGB(178,36,36):white:RGB(178,36,36))","Gradient(RGB(0,172,172):white:RGB(0,172,172):white:RGB(0,172,172))","Gradient(RGB(190,108,44):white:RGB(190,108,44):white:RGB(190,108,44))","Gradient(RGB(105,84,150):white:RGB(105,84,150):white:RGB(105,84,150))","Gradient(RGB(80,160,240):white:RGB(80,160,240):white:RGB(80,160,240))","Gradient(RGB(240,160,80):white:RGB(240,160,80):white:RGB(240,160,80))","Gradient(RGB(141,170,203):white:RGB(141,170,203):white:RGB(141,170,203))","Gradient(RGB(252,115,98):white:RGB(252,115,98):white:RGB(252,115,98))","Gradient(RGB(187,216,84):white:RGB(187,216,84):white:RGB(187,216,84))","Gradient(RGB(255,217,47):white:RGB(255,217,47):white:RGB(255,217,47))","Gradient(RGB(102,194,150):white:RGB(102,194,150):white:RGB(102,194,150))","Gradient(RGB(229,182,148):white:RGB(229,182,148):white:RGB(229,182,148))","Gradient(RGB(231,138,210):white:RGB(231,138,210):white:RGB(231,138,210))","Gradient(RGB(179,179,179):white:RGB(179,179,179):white:RGB(179,179,179))","Gradient(RGB(166,216,227):white:RGB(166,216,227):white:RGB(166,216,227))","Gradient(RGB(171,233,188):white:RGB(171,233,188):white:RGB(171,233,188))","Gradient(RGB(27,125,156):white:RGB(27,125,156):white:RGB(27,125,156))","Gradient(RGB(255,191,201):white:RGB(255,191,201):white:RGB(255,191,201))","Gradient(RGB(77,167,65):white:RGB(77,167,65):white:RGB(77,167,65))","Gradient(RGB(196,178,214):white:RGB(196,178,214):white:RGB(196,178,214))","Gradient(RGB(178,36,36):white:RGB(178,36,36):white:RGB(178,36,36))","Gradient(RGB(0,172,172):white:RGB(0,172,172):white:RGB(0,172,172))","Gradient(RGB(190,108,44):white:RGB(190,108,44):white:RGB(190,108,44))","Gradient(RGB(105,84,150):white:RGB(105,84,150):white:RGB(105,84,150))","Gradient(RGB(80,160,240):white:RGB(80,160,240):white:RGB(80,160,240))","Gradient(RGB(240,160,80):white:RGB(240,160,80):white:RGB(240,160,80))"];
			paletteBG=["linear-gradient(to right, rgb(0, 90, 167), rgb(255, 253, 228));","linear-gradient(to right, rgb(218, 68, 83), rgb(137, 33, 107))","linear-gradient(to right, rgb(99, 99, 99), rgb(162, 171, 88))","linear-gradient(to right, rgb(173, 83, 137), rgb(60, 16, 83))","linear-gradient(to right, rgb(168, 192, 255), rgb(63, 43, 150))","linear-gradient(to right, rgb(51, 51, 51), rgb(221, 24, 24))","linear-gradient(to right, rgb(78, 84, 200), rgb(143, 148, 251))","linear-gradient(to right, rgb(53, 92, 125), rgb(108, 91, 123), rgb(192, 108, 132))","linear-gradient(to right, rgb(188, 78, 156), rgb(248, 7, 89))","linear-gradient(to right, rgb(64, 224, 208), rgb(255, 140, 0), rgb(255, 0, 128))","linear-gradient(to right, rgb(62, 81, 81), rgb(222, 203, 164))","linear-gradient(to right, rgb(17, 153, 142), rgb(56, 239, 125))","linear-gradient(to right, rgb(16, 141, 199), rgb(239, 142, 56))","linear-gradient(to right, rgb(252, 92, 125), rgb(106, 130, 251))","linear-gradient(to right, rgb(252, 70, 107), rgb(63, 94, 251))","linear-gradient(to right, rgb(201, 75, 75), rgb(75, 19, 79))","linear-gradient(to right, rgb(35, 7, 77), rgb(204, 83, 51))","linear-gradient(to right, rgb(255, 251, 213), rgb(178, 10, 44))","linear-gradient(to right, rgb(15, 12, 41), rgb(48, 43, 99), rgb(36, 36, 62))","linear-gradient(to right, rgb(0, 176, 155), rgb(150, 201, 61))","linear-gradient(to right, rgb(211, 204, 227), rgb(233, 228, 240))","linear-gradient(to right, rgb(60, 59, 63), rgb(96, 92, 60))","linear-gradient(to right, rgb(202, 197, 49), rgb(243, 249, 167))","linear-gradient(to right, rgb(128, 0, 128), rgb(255, 192, 203))","linear-gradient(to right, rgb(0, 242, 96), rgb(5, 117, 230))","linear-gradient(to right, rgb(252, 74, 26), rgb(247, 183, 51))","linear-gradient(to right, rgb(225, 238, 195), rgb(240, 80, 83))","linear-gradient(to right, rgb(116, 235, 213), rgb(172, 182, 229))","linear-gradient(to right, rgb(109, 96, 39), rgb(211, 203, 184))","linear-gradient(to right, rgb(3, 0, 30), rgb(115, 3, 192), rgb(236, 56, 188), rgb(253, 239, 249))","linear-gradient(to right, rgb(102, 125, 182), rgb(0, 130, 200), rgb(0, 130, 200), rgb(102, 125, 182))","linear-gradient(to right, rgb(173, 169, 150), rgb(242, 242, 242), rgb(219, 219, 219), rgb(234, 234, 234))","linear-gradient(to right, rgb(225, 238, 195), rgb(240, 80, 83))","linear-gradient(to right, rgb(26, 42, 108), rgb(178, 31, 31), rgb(253, 187, 45))","linear-gradient(to right, rgb(34, 193, 195), rgb(253, 187, 45))","linear-gradient(to right, rgb(255, 153, 102), rgb(255, 94, 98))","linear-gradient(to right, rgb(127, 0, 255), rgb(225, 0, 255))","linear-gradient(to right, rgb(201, 214, 255), rgb(226, 226, 226))","linear-gradient(to right, rgb(57, 106, 252), rgb(41, 72, 255))","linear-gradient(to right, rgb(217, 167, 199), rgb(255, 252, 220))","linear-gradient(to right, rgb(7, 0, 0), rgb(76, 0, 1), rgb(7, 0, 0))","linear-gradient(to right, rgb(0, 0, 0), rgb(229, 0, 141), rgb(255, 7, 11))","linear-gradient(to right, rgb(12, 235, 235), rgb(32, 227, 178), rgb(41, 255, 198))","linear-gradient(to right, rgb(6, 190, 182), rgb(72, 177, 191))","linear-gradient(to right, rgb(100, 43, 115), rgb(198, 66, 110))","linear-gradient(to right, rgb(28, 146, 210), rgb(242, 252, 254))","linear-gradient(to right, rgb(0, 0, 0), rgb(15, 155, 15))","linear-gradient(to right, rgb(54, 209, 220), rgb(91, 134, 229))","linear-gradient(to right, rgb(203, 53, 107), rgb(189, 63, 50))","linear-gradient(to right, rgb(58, 28, 113), rgb(215, 109, 119), rgb(255, 175, 123))","linear-gradient(to right, rgb(40, 60, 134), rgb(69, 162, 71))","linear-gradient(to right, rgb(239, 59, 54), rgb(255, 255, 255))","linear-gradient(to right, rgb(192, 57, 43), rgb(142, 68, 173))","linear-gradient(to right, rgb(21, 153, 87), rgb(21, 87, 153))","linear-gradient(to right, rgb(0, 0, 70), rgb(28, 181, 224))","linear-gradient(to right, rgb(0, 121, 145), rgb(120, 255, 214))","linear-gradient(to right, rgb(86, 204, 242), rgb(47, 128, 237))","linear-gradient(to right, rgb(242, 153, 74), rgb(242, 201, 76))","linear-gradient(to right, rgb(235, 87, 87), rgb(0, 0, 0))","linear-gradient(to right, rgb(228, 77, 38), rgb(241, 101, 41))","linear-gradient(to right, rgb(74, 194, 154), rgb(189, 255, 243))","linear-gradient(to right, rgb(178, 254, 250), rgb(14, 210, 247))","linear-gradient(to right, rgb(48, 232, 191), rgb(255, 130, 53))","linear-gradient(to right, rgb(214, 109, 117), rgb(226, 149, 135))","linear-gradient(to right, rgb(32, 0, 44), rgb(203, 180, 212))","linear-gradient(to right, rgb(195, 55, 100), rgb(29, 38, 113))","linear-gradient(to right, rgb(247, 151, 30), rgb(255, 210, 0))","linear-gradient(to right, rgb(52, 232, 158), rgb(15, 52, 67))","linear-gradient(to right, rgb(97, 144, 232), rgb(167, 191, 232))","linear-gradient(to right, rgb(68, 160, 141), rgb(9, 54, 55))","linear-gradient(to right, rgb(32, 1, 34), rgb(111, 0, 0))","linear-gradient(to right, rgb(5, 117, 230), rgb(2, 27, 121))","linear-gradient(to right, rgb(69, 104, 220), rgb(176, 106, 179))","linear-gradient(to right, rgb(67, 198, 172), rgb(25, 22, 84))","linear-gradient(to right, rgb(9, 48, 40), rgb(35, 122, 87))","linear-gradient(to right, rgb(67, 198, 172), rgb(248, 255, 174))","linear-gradient(to right, rgb(255, 175, 189), rgb(255, 195, 160))","linear-gradient(to right, rgb(240, 242, 240), rgb(0, 12, 64))","linear-gradient(to right, rgb(232, 203, 192), rgb(99, 111, 164))","linear-gradient(to right, rgb(220, 227, 91), rgb(69, 182, 73))","linear-gradient(to right, rgb(192, 192, 170), rgb(28, 239, 255))","linear-gradient(to right, rgb(156, 236, 251), rgb(101, 199, 247), rgb(0, 82, 212))","linear-gradient(to right, rgb(219, 230, 246), rgb(197, 121, 109))","linear-gradient(to right, rgb(52, 148, 230), rgb(236, 110, 173))","linear-gradient(to right, rgb(103, 178, 111), rgb(76, 162, 205))","linear-gradient(to right, rgb(243, 144, 79), rgb(59, 67, 113))","linear-gradient(to right, rgb(238, 9, 121), rgb(255, 106, 0))","linear-gradient(to right, rgb(167, 112, 239), rgb(207, 139, 243), rgb(253, 185, 155))","linear-gradient(to right, rgb(65, 41, 90), rgb(47, 7, 67))","linear-gradient(to right, rgb(244, 196, 243), rgb(252, 103, 250))","linear-gradient(to right, rgb(0, 195, 255), rgb(255, 255, 28))","linear-gradient(to right, rgb(255, 126, 95), rgb(254, 180, 123))","linear-gradient(to right, rgb(255, 252, 0), rgb(255, 255, 255))","linear-gradient(to right, rgb(255, 0, 204), rgb(51, 51, 153))","linear-gradient(to right, rgb(222, 97, 97), rgb(38, 87, 235))","linear-gradient(to right, rgb(239, 50, 217), rgb(137, 255, 253))","linear-gradient(to right, rgb(58, 97, 134), rgb(137, 37, 62))","linear-gradient(to right, rgb(78, 205, 196), rgb(85, 98, 112))","linear-gradient(to right, rgb(161, 255, 206), rgb(250, 255, 209))","linear-gradient(to right, rgb(190, 147, 197), rgb(123, 198, 204))","linear-gradient(to right, rgb(189, 195, 199), rgb(44, 62, 80))","linear-gradient(to right, rgb(255, 216, 155), rgb(25, 84, 123))","linear-gradient(to right, rgb(128, 128, 128), rgb(63, 173, 168))","linear-gradient(to right, rgb(252, 234, 187), rgb(248, 181, 0))","linear-gradient(to right, rgb(248, 80, 50), rgb(231, 56, 39))","linear-gradient(to right, rgb(247, 157, 0), rgb(100, 243, 140))","linear-gradient(to right, rgb(203, 45, 62), rgb(239, 71, 58))","linear-gradient(to right, rgb(86, 171, 47), rgb(168, 224, 99))","linear-gradient(to right, rgb(0, 4, 40), rgb(0, 78, 146))","linear-gradient(to right, rgb(66, 39, 90), rgb(115, 75, 109))","linear-gradient(to right, rgb(20, 30, 48), rgb(36, 59, 85))","linear-gradient(to right, rgb(240, 0, 0), rgb(220, 40, 30))","linear-gradient(to right, rgb(44, 62, 80), rgb(253, 116, 108))","linear-gradient(to right, rgb(44, 62, 80), rgb(76, 161, 175))","linear-gradient(to right, rgb(233, 100, 67), rgb(144, 78, 149))","linear-gradient(to right, rgb(11, 72, 107), rgb(245, 98, 23))","linear-gradient(to right, rgb(58, 123, 213), rgb(58, 96, 115))","linear-gradient(to right, rgb(0, 210, 255), rgb(146, 141, 171))","linear-gradient(to right, rgb(33, 150, 243), rgb(244, 67, 54))","linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))","linear-gradient(to right, rgb(255, 75, 31), rgb(255, 144, 104))","linear-gradient(to right, rgb(22, 191, 253), rgb(203, 48, 102))","linear-gradient(to right, rgb(238, 205, 163), rgb(239, 98, 159))","linear-gradient(to right, rgb(29, 67, 80), rgb(164, 57, 49))","linear-gradient(to right, rgb(168, 0, 119), rgb(102, 255, 0))","linear-gradient(to right, rgb(247, 255, 0), rgb(219, 54, 164))","linear-gradient(to right, rgb(255, 75, 31), rgb(31, 221, 255))","linear-gradient(to right, rgb(186, 83, 112), rgb(244, 226, 216))","linear-gradient(to right, rgb(224, 234, 252), rgb(207, 222, 243))","linear-gradient(to right, rgb(76, 161, 175), rgb(196, 224, 229))","linear-gradient(to right, rgb(0, 0, 0), rgb(67, 67, 67))","linear-gradient(to right, rgb(75, 121, 161), rgb(40, 62, 81))","linear-gradient(to right, rgb(131, 77, 155), rgb(208, 78, 214))","linear-gradient(to right, rgb(0, 153, 247), rgb(241, 23, 18))","linear-gradient(to right, rgb(41, 128, 185), rgb(44, 62, 80))","linear-gradient(to right, rgb(90, 63, 55), rgb(44, 119, 68))","linear-gradient(to right, rgb(77, 160, 176), rgb(211, 157, 56))","linear-gradient(to right, rgb(86, 20, 176), rgb(219, 214, 92))","linear-gradient(to right, rgb(47, 115, 54), rgb(170, 58, 56))","linear-gradient(to right, rgb(30, 60, 114), rgb(42, 82, 152))","linear-gradient(to right, rgb(17, 67, 87), rgb(242, 148, 146))","linear-gradient(to right, rgb(253, 116, 108), rgb(255, 144, 104))","linear-gradient(to right, rgb(234, 205, 163), rgb(214, 174, 123))","linear-gradient(to right, rgb(106, 48, 147), rgb(160, 68, 255))","linear-gradient(to right, rgb(69, 127, 202), rgb(86, 145, 200))","linear-gradient(to right, rgb(178, 69, 146), rgb(241, 95, 121))","linear-gradient(to right, rgb(192, 36, 37), rgb(240, 203, 53))","linear-gradient(to right, rgb(64, 58, 62), rgb(190, 88, 105))","linear-gradient(to right, rgb(194, 229, 156), rgb(100, 179, 244))","linear-gradient(to right, rgb(255, 183, 94), rgb(237, 143, 3))","linear-gradient(to right, rgb(142, 14, 0), rgb(31, 28, 24))","linear-gradient(to right, rgb(118, 184, 82), rgb(141, 194, 111))","linear-gradient(to right, rgb(103, 58, 183), rgb(81, 45, 168))","linear-gradient(to right, rgb(0, 201, 255), rgb(146, 254, 157))","linear-gradient(to right, rgb(244, 107, 69), rgb(238, 168, 73))","linear-gradient(to right, rgb(0, 92, 151), rgb(54, 55, 149))","linear-gradient(to right, rgb(229, 57, 53), rgb(227, 93, 91))","linear-gradient(to right, rgb(252, 0, 255), rgb(0, 219, 222))","linear-gradient(to right, rgb(44, 62, 80), rgb(52, 152, 219))","linear-gradient(to right, rgb(204, 204, 178), rgb(117, 117, 25))","linear-gradient(to right, rgb(48, 67, 82), rgb(215, 210, 204))","linear-gradient(to right, rgb(238, 156, 167), rgb(255, 221, 225))","linear-gradient(to right, rgb(186, 139, 2), rgb(24, 24, 24))","linear-gradient(to right, rgb(82, 82, 82), rgb(61, 114, 180))","linear-gradient(to right, rgb(0, 79, 249), rgb(255, 249, 76))","linear-gradient(to right, rgb(106, 145, 19), rgb(20, 21, 23))","linear-gradient(to right, rgb(241, 242, 181), rgb(19, 80, 88))","linear-gradient(to right, rgb(209, 145, 60), rgb(255, 209, 148))","linear-gradient(to right, rgb(123, 67, 151), rgb(220, 36, 48))","linear-gradient(to right, rgb(142, 158, 171), rgb(238, 242, 243))","linear-gradient(to right, rgb(19, 106, 138), rgb(38, 120, 113))","linear-gradient(to right, rgb(0, 191, 143), rgb(0, 21, 16))","linear-gradient(to right, rgb(255, 0, 132), rgb(51, 0, 27))","linear-gradient(to right, rgb(131, 58, 180), rgb(253, 29, 29), rgb(252, 176, 69))","linear-gradient(to right, rgb(254, 172, 94), rgb(199, 121, 208), rgb(75, 192, 200))","linear-gradient(to right, rgb(100, 65, 165), rgb(42, 8, 69))","linear-gradient(to right, rgb(255, 179, 71), rgb(255, 204, 51))","linear-gradient(to right, rgb(67, 206, 162), rgb(24, 90, 157))","linear-gradient(to right, rgb(255, 161, 127), rgb(0, 34, 62))","linear-gradient(to right, rgb(54, 0, 51), rgb(11, 135, 147))","linear-gradient(to right, rgb(148, 142, 153), rgb(46, 20, 55))","linear-gradient(to right, rgb(30, 19, 12), rgb(154, 132, 120))","linear-gradient(to right, rgb(211, 131, 18), rgb(168, 50, 121))","linear-gradient(to right, rgb(115, 200, 169), rgb(55, 59, 68))","linear-gradient(to right, rgb(171, 186, 171), rgb(255, 255, 255))","linear-gradient(to right, rgb(253, 252, 71), rgb(36, 254, 65))","linear-gradient(to right, rgb(131, 164, 212), rgb(182, 251, 255))","linear-gradient(to right, rgb(72, 85, 99), rgb(41, 50, 60))","linear-gradient(to right, rgb(82, 194, 52), rgb(6, 23, 0))","linear-gradient(to right, rgb(254, 140, 0), rgb(248, 54, 0))","linear-gradient(to right, rgb(0, 198, 255), rgb(0, 114, 255))","linear-gradient(to right, rgb(112, 225, 245), rgb(255, 209, 148))","linear-gradient(to right, rgb(85, 98, 112), rgb(255, 107, 107))","linear-gradient(to right, rgb(157, 80, 187), rgb(110, 72, 170))","linear-gradient(to right, rgb(120, 2, 6), rgb(6, 17, 97))","linear-gradient(to right, rgb(179, 255, 171), rgb(18, 255, 247))","linear-gradient(to right, rgb(170, 255, 169), rgb(17, 255, 189))","linear-gradient(to right, rgb(0, 0, 0), rgb(231, 76, 60))","linear-gradient(to right, rgb(240, 194, 123), rgb(75, 18, 72))","linear-gradient(to right, rgb(255, 78, 80), rgb(249, 212, 35))","linear-gradient(to right, rgb(173, 209, 0), rgb(123, 146, 10))","linear-gradient(to right, rgb(251, 211, 233), rgb(187, 55, 125))","linear-gradient(to right, rgb(0, 0, 0), rgb(83, 52, 109))","linear-gradient(to right, rgb(96, 108, 136), rgb(63, 76, 107))","linear-gradient(to right, rgb(201, 255, 191), rgb(255, 175, 189))","linear-gradient(to right, rgb(100, 145, 115), rgb(219, 213, 164))","linear-gradient(to right, rgb(185, 147, 214), rgb(140, 166, 219))","linear-gradient(to right, rgb(135, 0, 0), rgb(25, 10, 5))","linear-gradient(to right, rgb(0, 210, 255), rgb(58, 123, 213))","linear-gradient(to right, rgb(211, 149, 155), rgb(191, 230, 186))","linear-gradient(to right, rgb(218, 210, 153), rgb(176, 218, 185))","linear-gradient(to right, rgb(230, 218, 218), rgb(39, 64, 70))","linear-gradient(to right, rgb(93, 65, 87), rgb(168, 202, 186))","linear-gradient(to right, rgb(221, 214, 243), rgb(250, 172, 168))","linear-gradient(to right, rgb(97, 97, 97), rgb(155, 197, 195))","linear-gradient(to right, rgb(80, 201, 195), rgb(150, 222, 218))","linear-gradient(to right, rgb(33, 95, 0), rgb(228, 228, 217))","linear-gradient(to right, rgb(194, 21, 0), rgb(255, 197, 0))","linear-gradient(to right, rgb(239, 239, 187), rgb(212, 211, 221))","linear-gradient(to right, rgb(255, 238, 238), rgb(221, 239, 187))","linear-gradient(to right, rgb(102, 102, 0), rgb(153, 153, 102))","linear-gradient(to right, rgb(222, 98, 98), rgb(255, 184, 140))","linear-gradient(to right, rgb(233, 211, 98), rgb(51, 51, 51))","linear-gradient(to right, rgb(213, 51, 105), rgb(203, 173, 109))","linear-gradient(to right, rgb(167, 55, 55), rgb(122, 40, 40))","linear-gradient(to right, rgb(248, 87, 166), rgb(255, 88, 88))","linear-gradient(to right, rgb(75, 108, 183), rgb(24, 40, 72))","linear-gradient(to right, rgb(252, 53, 76), rgb(10, 191, 188))","linear-gradient(to right, rgb(65, 77, 11), rgb(114, 122, 23))","linear-gradient(to right, rgb(228, 58, 21), rgb(230, 82, 69))","linear-gradient(to right, rgb(192, 72, 72), rgb(72, 0, 72))","linear-gradient(to right, rgb(95, 44, 130), rgb(73, 160, 157))","linear-gradient(to right, rgb(236, 111, 102), rgb(243, 161, 131))","linear-gradient(to right, rgb(116, 116, 191), rgb(52, 138, 199))","linear-gradient(to right, rgb(236, 233, 230), rgb(255, 255, 255))","linear-gradient(to right, rgb(218, 226, 248), rgb(214, 164, 164))","linear-gradient(to right, rgb(237, 66, 100), rgb(255, 237, 188))","linear-gradient(to right, rgb(220, 36, 36), rgb(74, 86, 157))","linear-gradient(to right, rgb(36, 198, 220), rgb(81, 74, 157))","linear-gradient(to right, rgb(40, 48, 72), rgb(133, 147, 152))","linear-gradient(to right, rgb(61, 126, 170), rgb(255, 228, 122))","linear-gradient(to right, rgb(28, 216, 210), rgb(147, 237, 199))","linear-gradient(to right, rgb(35, 37, 38), rgb(65, 67, 69))","linear-gradient(to right, rgb(117, 127, 154), rgb(215, 221, 232))","linear-gradient(to right, rgb(92, 37, 141), rgb(67, 137, 162))","linear-gradient(to right, rgb(19, 78, 94), rgb(113, 178, 128))","linear-gradient(to right, rgb(43, 192, 228), rgb(234, 236, 198))","linear-gradient(to right, rgb(8, 80, 120), rgb(133, 216, 206))","linear-gradient(to right, rgb(71, 118, 230), rgb(142, 84, 233))","linear-gradient(to right, rgb(97, 67, 133), rgb(81, 99, 149))","linear-gradient(to right, rgb(31, 28, 44), rgb(146, 141, 171))","linear-gradient(to right, rgb(22, 34, 42), rgb(58, 96, 115))","linear-gradient(to right, rgb(255, 128, 8), rgb(255, 200, 55))","linear-gradient(to right, rgb(29, 151, 108), rgb(147, 249, 185))","linear-gradient(to right, rgb(235, 51, 73), rgb(244, 92, 67))","linear-gradient(to right, rgb(221, 94, 137), rgb(247, 187, 151))","linear-gradient(to right, rgb(76, 184, 196), rgb(60, 211, 173))","linear-gradient(to right, rgb(31, 162, 255), rgb(18, 216, 250), rgb(166, 255, 203))","linear-gradient(to right, rgb(29, 43, 100), rgb(248, 205, 218))","linear-gradient(to right, rgb(255, 81, 47), rgb(240, 152, 25))","linear-gradient(to right, rgb(26, 41, 128), rgb(38, 208, 206))","linear-gradient(to right, rgb(170, 7, 107), rgb(97, 4, 95))","linear-gradient(to right, rgb(255, 81, 47), rgb(221, 36, 118))","linear-gradient(to right, rgb(240, 152, 25), rgb(237, 222, 93))","linear-gradient(to right, rgb(64, 59, 74), rgb(231, 233, 187))","linear-gradient(to right, rgb(229, 93, 135), rgb(95, 195, 228))","linear-gradient(to right, rgb(0, 57, 115), rgb(229, 229, 190))","linear-gradient(to right, rgb(204, 149, 192), rgb(219, 212, 180), rgb(122, 161, 210))","linear-gradient(to right, rgb(60, 165, 92), rgb(181, 172, 73))","linear-gradient(to right, rgb(52, 143, 80), rgb(86, 180, 211))","linear-gradient(to right, rgb(218, 34, 255), rgb(151, 51, 238))","linear-gradient(to right, rgb(2, 170, 176), rgb(0, 205, 172))","linear-gradient(to right, rgb(237, 229, 116), rgb(225, 245, 196))","linear-gradient(to right, rgb(211, 16, 39), rgb(234, 56, 77))","linear-gradient(to right, rgb(22, 160, 133), rgb(244, 208, 63))","linear-gradient(to right, rgb(96, 56, 19), rgb(178, 159, 148))","linear-gradient(to right, rgb(229, 45, 39), rgb(179, 18, 23))","linear-gradient(to right, rgb(255, 110, 127), rgb(191, 233, 255))","linear-gradient(to right, rgb(119, 161, 211), rgb(121, 203, 202), rgb(230, 132, 174))","linear-gradient(to right, rgb(49, 71, 85), rgb(38, 160, 218))","linear-gradient(to right, rgb(43, 88, 118), rgb(78, 67, 118))","linear-gradient(to right, rgb(230, 92, 0), rgb(249, 212, 35))","linear-gradient(to right, rgb(33, 147, 176), rgb(109, 213, 237))","linear-gradient(to right, rgb(204, 43, 94), rgb(117, 58, 136))","linear-gradient(to right, rgb(236, 0, 140), rgb(252, 103, 103))","linear-gradient(to right, rgb(20, 136, 204), rgb(43, 50, 178))","linear-gradient(to right, rgb(0, 70, 127), rgb(165, 204, 130))","linear-gradient(to right, rgb(7, 101, 133), rgb(255, 255, 255))","linear-gradient(to right, rgb(187, 210, 197), rgb(83, 105, 118))","linear-gradient(to right, rgb(183, 152, 145), rgb(148, 113, 107))","linear-gradient(to right, rgb(187, 210, 197), rgb(83, 105, 118), rgb(41, 46, 73))","linear-gradient(to right, rgb(83, 105, 118), rgb(41, 46, 73))","linear-gradient(to right, rgb(172, 182, 229), rgb(134, 253, 232))","linear-gradient(to right, rgb(255, 226, 89), rgb(255, 167, 81))","linear-gradient(to right, rgb(2, 17, 29), rgb(3, 123, 181), rgb(2, 17, 29))"];
			/*
			[
			'Gradient(white:RGB(141,170,203))',
                    'Gradient(white:#ff0:#aa0:#660)', 'Gradient(white:#f00:#a00:#600)',
                    'Gradient(white:#0ff:#0aa:#066)', 'Gradient(white:#0f0:#0a0:#060)',
                    'Gradient(white:#fff:#aaa:#666)', 'Gradient(white:#f0f:#a0a:#606)',
                    'Gradient(white:#ff0:#aa0:#660)','Gradient(white:#f00:#a00:#600)',
                    'Gradient(white:#0ff:#0aa:#066)','Gradient(white:#0f0:#0a0:#060)',
                    'Gradient(white:#fff:#aaa:#666)', 'Gradient(white:#f0f:#a0a:#606)',
                    'Gradient(white:#fff:#aaa:#666)'			]
					*/

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
				measArray[i] = layout.qHyperCube.qDataPages[0].qMatrix[i][1].qText.replace(",",".");
				total=total+parseFloat(measArray[i].replace(",","."));
				//console.log(parseFloat(measArray[i]));
				dimMeasArray[i] = dimArray[i] + valueBelow +measArray[i];
				dimMeasTPArray[i] = dimArray[i] + " </br>- " +measArray[i];
			}
			
			if(layout.keepColors)
				palette=paletteKeep;
			//console.log(total);
			
			//% to Only Values
			var measArrayPerc = [];
			var measArrayValue = [];
			
			var dimMeasPercArray=[];
			var dimMeasPercTPArray=[];			
			
			var origin=-Math.PI/2;
			var originAcc = 0;
			for (var i=0; i<numberOfDimValues;i++){
				var measPercArray = (parseFloat(layout.qHyperCube.qDataPages[0].qMatrix[i][1].qText.replace(",","."))/total)*100;
				
				originAcc=originAcc+(2*(Math.PI*(parseFloat(layout.qHyperCube.qDataPages[0].qMatrix[i][1].qText.replace(",","."))/total)));
				if(dimArray[i]==layout.rotateUpFor){
					origin = 
					-1.57
					-(originAcc
					-(Math.PI*(parseFloat(layout.qHyperCube.qDataPages[0].qMatrix[i][1].qText.replace(",","."))/total))
					//*(i+1)
					);
				}
				
				
				measPercArray= parseFloat(measPercArray).toFixed(1);
				
				
				
				measArrayPerc[i]=measPercArray + "%";
				measArrayValue[i]=layout.qHyperCube.qDataPages[0].qMatrix[i][1].qText.replace(",",".");
				
				
				dimMeasPercArray[i] = dimArray[i] +valueBelow +measPercArray + "%";
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
			
			//var origin = -Math.PI/2;
			
			
			
			// set segment border color to allow border to switch on and off
			if (layout.segmentBorder) {
				//console.log(layout.borderColor.color);
				var segmentBorder2 = [layout.borderColor.color];
				
				if(layout.segmentBorderInOne=="1"){
					segmentBorder2 = ['black', 'rgba(0,0,0,0)'];
					//(-1.57+0.144),
					//origin=-1.57+origins[1];
				}				
				else if (layout.segmentBorderInOne=="2"){
					segmentBorder2 = ['rgba(0,0,0,0)', 'black'];
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
						labelsArray=measArrayValue;
					//var labelDimMeasArray =dimMeasTPArray;		
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
						data: measArray,
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
							//tooltips: layout.showValues ? dimMeasTPArray : dimArray,
							tooltips: labelDimMeasArray,
							tooltipsEvent: 'onmousemove',
							/*Nao  funciona  ainda
							tooltipsOverride: tooltip_override,
							*/							
							//labels: layout.showValues ? labelDimMeasArray : labelsArray,	
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
						data: measArray,
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
							//tooltips: layout.showValues ? dimMeasTPArray : dimArray,
							tooltips: labelDimMeasArray,
							tooltipsEvent: 'onmousemove',					
							//labels: layout.showValues ? labelDimMeasArray : labelsArray,					
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

