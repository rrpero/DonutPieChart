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
			//expression: "always",
			defaultValue: 100
	};
	
		var textPosX = {
			type: "integer",
			label: "Text Pos X(Can be Negative)",
			ref: "textPosX",
			//expression: "always",
			defaultValue: 0
	};	
	
		var textPosY = {
			type: "integer",
			label: "Text Pos Y(Can be Negative)",
			ref: "textPosY",
			//expression: "always",
			defaultValue: 0
	};		

	var chartRadius = {
			type: "integer",
			label: "Chart Radius % Size",
			ref: "chartRadius",
			//expression: "always",
			defaultValue: 100
	};

	var donutWidth = {
			type: "integer",
			label: "Donut Width % Size",
			ref: "donutWidth",
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


	
	var segmentBorderWidth = {
			type: "string",
			component: "dropdown",
			label: "Segment Border Width",
			ref: "segmentBorderWidth",
			options: [{
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
			}
			
			],
			defaultValue: "default"
	};	
	
	var Options = {
		type:"items",
		label:"Options",
		items: {
			showValues:showValues,
			chartType:chartType,
			chartRadius:chartRadius,
			donutWidth:donutWidth,
			chartEffect:chartEffect,
			chartLabels:chartLabels,
			labelSticks:labelSticks,
			explodeSegment:explodeSegment,
			segmentBorder:segmentBorder,
			segmentBorderWidth:segmentBorderWidth,
			palette:palette
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
			TextCenter:TextCenter
			//MyColorPicker: MyColorPicker
			//miscSettings: miscSettings

        }
    };

} );
