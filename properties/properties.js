define( [

	'jquery',
	'qlik',
	'ng!$q',
	'ng!$http'


], function ($, qlik, $q, $http) {
    'use strict';
	//Define the current application
	var app = qlik.currApp();

    // *****************************************************************************
    // Dimensions & Measures
    // *****************************************************************************
    var dimensions = {
        uses: "dimensions",
        min: 1,
        max: 1
    };

    var measures = {
        uses: "measures",
        min: 1,
        max: 1
    };

    // *****************************************************************************
    // Appearance Section
    // *****************************************************************************
    var appearanceSection = {
        uses: "settings"
    };
	
	// *****************************************************************************
    // Sorting Section
    // *****************************************************************************
    var sortingSection = {
        uses: "sorting"
    };
	
	// *****************************************************************************
    // Options Section
    // *****************************************************************************


	var chartType = {
			type: "string",
			component: "dropdown",
			label: "Chart Type",
			ref: "chartType",
			options: [{
				value: "pie",
				label: "Pie"
			}, {
				value: "donut",
				label: "Donut"
			}
			],
			defaultValue: "donut"
	};

	
	var chartEffect = {
			type: "string",
			component: "dropdown",
			label: "Chart Effect",
			ref: "chartEffect",
			options: [{
				value: "2d",
				label: "2D"
			}, {
				value: "Halo",
				label: "Halo"
			}
			],
			defaultValue: "2d"
	};
	
	var chartAnimation = {
			type: "boolean",
			component: "switch",
			label: "Animation",
			ref: "animation",
			options: [{
				value: true,
				label: "On"
			}, {
				value: false,
				label: "Off"
			}],
			defaultValue: false
	};	
		
	var chartLabels = {
			type: "boolean",
			component: "switch",
			label: "Show Chart Labels",
			ref: "chartLabels",
			options: [{
				value: true,
				label: "On"
			}, {
				value: false,
				label: "Off"
			}],
			defaultValue: true
	};
	
		var labelTextSize = {
			type: "integer",
			label: "Label Text % Size",
			ref: "labelTextSize",
			component: "slider",
			min: 10,
			max: 200,
			step: 1,			
			//expression: "always",
			defaultValue: 100
	};	
	
		var labelDistance = {
			type: "integer",
			label: "Label Distance",
			ref: "labelDistance",
			component: "slider",
			min: -100,
			max: 100,
			step: 1,			
			//expression: "always",
			defaultValue: 10
	};		
	
	var labelSticks = {
			type: "boolean",
			component: "switch",
			label: "Show Labels Sticks",
			ref: "labelSticks",
			options: [{
				value: true,
				label: "On"
			}, {
				value: false,
				label: "Off"
			}],
			defaultValue: false
	};
	
	var explodeSegment = {
			type: "string",
			component: "dropdown",
			label: "Explode Segment",
			ref: "explodeSegment",
			options: [{
				value: 0,
				label: "None"
			}, {
				value: 1,
				label: 1
			}, {
				value: 2,
				label: 2
			}, {
				value: 3,
				label: 3
				
			}, {
				value: 4,
				label: 4
			}, {
				value: 5,
				label: 5
			}
			]
	};
	
	
	
	
	var segmentBorder = {
			type: "boolean",
			component: "switch",
			label: "Show Segment Border",
			ref: "segmentBorder",
			options: [{
				value: true,
				label: "On"
			}, {
				value: false,
				label: "Off"
			}],
			defaultValue: false
	};
	
	var segmentBorderInOne = {
			type: "string",
			component: "dropdown",
			label: "Border One Dimension",
			ref: "segmentBorderInOne",
			options: [{
				value: "no",
				label: 'No'
			},{
				value: "1",
				label: 'First Dimension Value'
			}, {
				value: "2",
				label: 'Second Dimension Value'
			}
			
			],
			defaultValue: "no"
	};	
	
	var textMiddle = {
			type: "string",
			label: "Text Center(type \\n to  break  line)",
			ref: "textMiddle",
			expression: "always",
			defaultValue: ""
	};

		var sizeText = {
			type: "integer",
			label: "Text % Size",
			ref: "sizeText",
			component: "slider",
			min: 10,
			max: 200,
			step: 1,			
			//expression: "always",
			defaultValue: 100
	};
	
		var textPosX = {
			type: "integer",
			label: "Text Pos X(Can be Negative)",
			ref: "textPosX",
			component: "slider",
			min: -150,
			max: 150,
			step: 1,			
			//expression: "always",
			defaultValue: 0
	};	
	
		var textPosY = {
			type: "integer",
			label: "Text Pos Y(Can be Negative)",
			ref: "textPosY",
			component: "slider",
			min: -155,
			max: 145,
			step: 1,			
			//expression: "always",
			defaultValue: -5
	};		

	var chartRadius = {
			type: "integer",
			label: "Chart Radius % Size",
			ref: "chartRadius",
			component: "slider",
			min: 10,
			max: 200,
			step: 1,			
			//expression: "always",
			defaultValue: 75
	};

	var donutWidth = {
			type: "integer",
			label: "Donut Width % Size",
			ref: "donutWidth",
			component: "slider",
			min: 10,
			max: 200,
			step: 1,
			//expression: "always",
			defaultValue: 100
	};		
	

	
	var colorText = {
			type: "string",
			label: "Text Color",
			ref: "colorText",
			component:"color-picker",
			//expression: "always",
			defaultValue: "#ffffff"
	};	
	
	
	
	var showValues = {
			type: "string",
			component: "dropdown",
			label: "Show Values",
			ref: "showValues",
			options: [{
				value: "value",
				label: 'Values'
			},{
				value: "percent",
				label: 'Percent'
			}, {
				value: "no",
				label: 'No'
			}
			
			],
			defaultValue: "no"
	};
	
	var valueBelow = {
			type: "boolean",
			component: "switch",
			label: "Value Below",
			ref: "valueBelow",
			options: [{
				value: true,
				label: "On"
			}, {
				value: false,
				label: "Off"
			}],
			defaultValue: false
	};	
		
	
	var onlyValues = {
			type: "boolean",
			component: "switch",
			label: "Only Values",
			ref: "onlyValues",
			options: [{
				value: true,
				label: "On"
			}, {
				value: false,
				label: "Off"
			}],
			defaultValue: false
	};


	var keepColors = {
			type: "boolean",
			component: "switch",
			label: "Keep Colors",
			ref: "keepColors",
			options: [{
				value: true,
				label: "On"
			}, {
				value: false,
				label: "Off"
			}],
			defaultValue: false
	};		
	


	
	var segmentBorderWidth = {
			type: "string",
			component: "dropdown",
			label: "Segment Border Width",
			ref: "segmentBorderWidth",
			options: [{
				value: 1,
				label: '1 pixels'
			},{
				value: 2,
				label: '2 pixels'
			}, {
				value: 3,
				label: '3 pixels'
			}, {
				value: 4,
				label: '4 pixels'
			}, {
				value: 5,
				label: '5 pixels'
			}, {
				value: 6,
				label: '6 pixels'
			}, {
				value: 7,
				label: '7 pixels'
			}, {
				value: 8,
				label: '8 pixels'
			}, {
				value: 9,
				label: '9 pixels'
			}, {
				value: 10,
				label: '10 pixels'
			}
			
			],
			defaultValue: 5
	};
	
	var borderColor = {
			type: "string",
			label: "Border Color",
			ref: "borderColor",
			component:"color-picker",
			//expression: "always",
			defaultValue: "#ffffff"
	};		
	
	var palette = {
			type: "string",
			component: "dropdown",
			label: "Colors",
			ref: "palette",
			options: [{
				value: "default",
				label: 'Standard QS'
			},{
				value: "bluegradient",
				label: 'Blue Gradient'
			},{
				value: "redgradient",
				label: 'Red Gradient'
			},{
				value: "greengradient",
				label: 'Green Gradient'
			},{
				value: "paletteBG",
				label: 'Beautiful Gradients'
			},{
				value: "yellowwhite",
				label: 'Yellow-White'
			},{
				value: "whiteyellow",
				label: 'White-Yellow'
			},{
				value: "bluewhite",
				label: 'Blue-White'
			},{
				value: "whiteblue",
				label: 'White-Blue'
			},{
				value: "redwhite",
				label: 'Red-White'
			},{
				value: "whitered",
				label: 'White-Red'
			}
			
			],
			defaultValue: "default"
	};	
	
	var gutterTop = {
			type: "integer",
			label: "Top",
			ref: "gutterTop",
			component: "slider",
			min: -20,
			max: 100,
			step: 1,
			//expression: "always",
			defaultValue: 30
	};
	
	var gutterLeft = {
			type: "integer",
			label: "Left",
			ref: "gutterLeft",
			component: "slider",
			min: -20,
			max: 200,
			step: 1,
			//expression: "always",
			defaultValue: 90
	};	
	
	var rotateUpFor = {
			type: "string",
			label: "Roteta Up For",
			ref: "rotateUpFor",
			//component:"color-picker",
			//expression: "always",
			defaultValue: ""
	};	
	
	var Options = {
		type:"items",
		label:"Options",
		items: {			
			chartType:chartType,
			chartEffect:chartEffect,
			chartAnimation:chartAnimation,
			explodeSegment:explodeSegment,
			palette:palette,
			keepColors:keepColors
		}
	
	};
	
	var chartSizeAndBorders = {
		type:"items",
		label:"Size / Borders",
		items: {
			chartRadius:chartRadius,
			donutWidth:donutWidth,	
			segmentBorder:segmentBorder,
			borderColor:borderColor,
			segmentBorderInOne:segmentBorderInOne,
			segmentBorderWidth:segmentBorderWidth,			

		}
	
	};	
	
	var labelsOptions = {
		type:"items",
		label:"Labels",
		items: {
			chartLabels:chartLabels,
			showValues:showValues,
			valueBelow:valueBelow,
			onlyValues:onlyValues,
			labelTextSize:labelTextSize,
			labelDistance:labelDistance,
			labelSticks:labelSticks
		}
	
	};	
	
	var Position = {
		type:"items",
		label:"Position",
		items: {
			gutterTop:gutterTop,
			gutterLeft:gutterLeft,
			rotateUpFor:rotateUpFor
		}
	
	};	
	
	
	
	var TextCenter = {
		type:"items",
		label:"Text Center",
		items: {			
			textMiddle:textMiddle,
			sizeText:sizeText,
			textPosX:textPosX,
			textPosY:textPosY,
			colorText:colorText
			
		}
	
	};	


	var keyPositionX = {
			type: "integer",
			label: "Position X",
			ref: "keyPositionX",
			component: "slider",
			min: -300,
			max: 300,
			step: 3,
			//expression: "always",
			defaultValue: 0
	};	
	var keyPositionY = {
			type: "integer",
			label: "Position Y",
			ref: "keyPositionY",
			component: "slider",
			min: -300,
			max: 300,
			step: 1,
			//expression: "always",
			defaultValue: 3
	};		

	var showLegends = {
			type: "boolean",
			component: "switch",
			label: "Show Legends",
			ref: "showLegends",
			options: [{
				value: true,
				label: "On"
			}, {
				value: false,
				label: "Off"
			}],
			defaultValue: false
	};

	var graphGutter = {
			type: "string",
			component: "switch",
			label: "Orientation",
			ref: "graphGutter",
			options: [{
				value: "graph",
				label: "Vertical"
			}, {
				value: "gutter",
				label: "Horizontal"
			}],
			defaultValue: "graph"
	};	
	
	var keyHalign = {
			type: "string",
			component: "switch",
			label: "Align",
			ref: "keyHalign",
			options: [{
				value: "left",
				label: "Left"
			},{
				value: "right",
				label: "Right"
			}],
			defaultValue: false
	};	
	
	var legends = {
		type:"items",
		label:"Legends",
		items: {			
			showLegends:showLegends,
			graphGutter:graphGutter,
			//keyHalign:keyHalign,
			keyPositionX:keyPositionX,
			keyPositionY:keyPositionY
			
		}
	
	};		
    // *****************************************************************************
    // Main property panel definition
    // ~~
    // Only what's defined here will be returned from properties.js
    // *****************************************************************************
	  
	//******************************************************************************

    return {
        type: "items",
        component: "accordion",
        items: {
            //Default Sections
			dimensions: dimensions,
            measures: measures,
            appearance: appearanceSection,
			sorting: sortingSection,
			//Custom Sections
			Options: Options,
			chartSizeAndBorders:chartSizeAndBorders,
			labelsOptions:labelsOptions,
			Position:Position,
			TextCenter:TextCenter,
			legends:legends
			//MyColorPicker: MyColorPicker
			//miscSettings: miscSettings

        }
    };

} );
