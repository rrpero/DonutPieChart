define( [

	'jquery',
	'qlik',
	'ng!$q',
	'ng!$http'


], function ($, qlik, $q, $http) {
    'use strict';
	//Define the current application
	var messages = {
		en_US: {
			CHART_TYPE: 'Chart Tyoe',
			CHART_EFFECT:"Chart Effect",
			_2D:"2D",
			HALO:"Halo",
			ANIMATION:"Animation",
			ON:"On",
			OFF:"Off",
			SHOW_LABELS:"Show Labels",
			LABEL_TEXT_SIZE:"Label Text Size",
			LABEL_DISTANCE:"Label Distance",
			SHOW_LABEL_STICKS:"Label Sticks",
			EXPLODE_SEGMENT:"Explode Segment",
			NONE:"None",
			SHOW_SEGMENT_BORDER:"Show Segment Border",
			BORDER_ONE_DIMENSION:"Border in one Dimension",
			NO:"No",
			FIRST_DIMENSION_VALUE:"First",
			SECOND_DIMENSION_VALUE:"Second",
			TEXT_MIDDLE:"Text middle(\\n to break line)",
			TEXT_SIZE:"Text Size",
			TEXT_POS_HOR:"Text Horizontal Position",
			TEXT_POS_VER:"Text Vertical Position",
			CHART_RADIUS_SIZE:"Chart Radius Size",
			DONUT_WIDTH_SIZE:"Donut Width",
			TEXT_COLOR:"Text Color",
			SHOW_VALUES:"Show Values",
			VALUES:"Values",
			PERCENT:"Percent",
			VALUES_BELOW:"Values Below",
			YES:"Yes",
			ONLY_VALUES:"Only Values",
			KEEP_COLORS:"Keep Colors",
			SEGMENT_BORDER_WIDTH:"Border Width",
			BORDER_COLOR:"Border Color",
			COLORS:"Colors",
			BLUE_GRADIENTS:"Blue Gradient",
			RED_GRADIENTS:"Red Gradient",
			GREEN_GRADIENTS:"Green Gradient",
			GRADIENTS:"Gradients",
			YELLOW_TRANSPARENCE:"Yellow First All Invisible",
			TRANSPARENCE_YELLOW:"Invisible First Second Yellow",	
			BLUE_TRANSPARENCE:"Blue First All Invisible",
			TRANSPARENCE_BLUE:"Invisible First Second Blue",	
			RED_TRANSPARENCE:"Red First All Invisible",
			TRANSPARENCE_RED:"Invisible First Second Red",	
			STANDARD_QS	:"Standard QS",

			PIE:"Pie",
			DONUT:"Donut",
			CHART_POSITION_HORIZONTAL:"Horizontal",
			CHART_POSITION_VERTICAL:"Vertical",
			ROTATE_UP_FOR:"Rotate Up For",
			ITEM_TEXT_MIDDLE:"Text Middle",
			LEGEND_POSITION_HORIZONTAL:"Horizontal",
			LEGEND_POSITION_VERTICAL:"Vertical",
			SHOW_LEGENDS:"Show Legends",
			SHOW:"Show",
			DONT_SHOW:"Dont Show",
			ORIENTATION:"Orientation",
			VERTICAL:"Vertical",
			HORIZONTAL:"Horizontal",
			ITEM_LEGENDS:"Legends",
			ITEM_LABELS:"Labels",
			ITEM_POSITION:"Position",
			EXPANDABLE_ITEM_LEGEND_LABEL_POSITION:"Legends, Labels and Position",
			ITEM_OPTIONS:"Options",
			ITEM_SIZE:"Size",
			ITEM_BORDERS:"Border",	
			EXPANDABLE_ITEM_OPTIONS_SIZE_BORDER:"Options, Size and Border"				
		},
		pt_BR: {
			CHART_TYPE: "Tipo de Gráfico",
			CHART_EFFECT:"Efeito de Gráfico",
			_2D:"2D",
			HALO:"Halo",
			ANIMATION:"Animação",
			ON:"Ligado",
			OFF:"Desligado",
			SHOW_LABELS:"Mostrar Labels",
			LABEL_TEXT_SIZE:"Tamanho do Texto",
			LABEL_DISTANCE:"Afastamento da Label",
			SHOW_LABEL_STICKS:"Linha de Label",
			EXPLODE_SEGMENT:"Explodir Segmento",
			NONE:"Nenhum",
			SHOW_SEGMENT_BORDER:"Mostrar Bordas",
			BORDER_ONE_DIMENSION:"Borda Somente em 1",
			NO:"Não",
			FIRST_DIMENSION_VALUE:"Primeiro",
			SECOND_DIMENSION_VALUE:"Segundo",
			TEXT_MIDDLE:"Texto no meio(\\n para pular linha)",
			TEXT_SIZE:"Tamanho do Texto",
			TEXT_POS_HOR:"Posição Horizontal do Texto",
			TEXT_POS_VER:"Posição Vertical do Texto",
			CHART_RADIUS_SIZE:"Tamanho do Gráfico",
			DONUT_WIDTH_SIZE:"Espessura",
			TEXT_COLOR:"Cor do Texto",
			SHOW_VALUES:"Mostrar Valores",
			VALUES:"Valores",
			PERCENT:"Porcentagem",
			VALUES_BELOW:"Valores embaixo",
			YES:"Sim",
			ONLY_VALUES:"Mostrar Somente Valores",
			KEEP_COLORS:"Manter Cores",
			SEGMENT_BORDER_WIDTH:"Tamanho da Borda",
			BORDER_COLOR:"Cor da Borda",
			COLORS:"Cores",
			BLUE_GRADIENTS:"Tons Azul",
			RED_GRADIENTS:"Tons Vermelho",
			GREEN_GRADIENTS:"Tons Verde",
			GRADIENTS:"Gradientes",
			YELLOW_TRANSPARENCE:"Amarelo Primeira e Resto Transparente",
			TRANSPARENCE_YELLOW:"Transparente Primeira e Segunda Amarelo",	
			BLUE_TRANSPARENCE:"Azul Primeira e Resto Transparente",
			TRANSPARENCE_BLUE:"Transparente Primeira e Segunda Azul",	
			RED_TRANSPARENCE:"Vermelho Primeira e Resto Transparente",
			TRANSPARENCE_RED:"Transparente Primeira e Segunda Vermelho",	
			STANDARD_QS	:"Padrão QS",

			PIE:"Pizza",
			DONUT:"Rosca",
			CHART_POSITION_HORIZONTAL:"Posição Horizontal",
			CHART_POSITION_VERTICAL:"Posição Vertical",
			ROTATE_UP_FOR:"Rotacionar Para Cima na Dimensão",
			ITEM_TEXT_MIDDLE:"Texto no meio",
			LEGEND_POSITION_HORIZONTAL:"Posição Horizontal",
			LEGEND_POSITION_VERTICAL:"Posição Vertical",
			SHOW_LEGENDS:"Mostrar Legenda",
			SHOW:"Mostrar",
			DONT_SHOW:"Não Mostrar",
			ORIENTATION:"Orientação",
			VERTICAL:"Vertical",
			HORIZONTAL:"Horizontal",
			ITEM_LEGENDS:"Legenda",
			ITEM_LABELS:"Labels",
			ITEM_POSITION:"Posição",
			EXPANDABLE_ITEM_LEGEND_LABEL_POSITION:"Legenda, Labels e Posição",
			ITEM_OPTIONS:"Opções",
			ITEM_SIZE:"Tamanho",
			ITEM_BORDERS:"Borda",	
			EXPANDABLE_ITEM_OPTIONS_SIZE_BORDER:"Opções, Tamanho e Borda"			
		}
	};
	var language="pt_BR";
	//var language="en_US";
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
			label: messages[language].CHART_TYPE,
			
			//label:app.GetLocaleInfo().qReturn.qCollation,
			ref: "chartType",
			options: [{
				value: "pie",
				label: messages[language].PIE
			}, {
				value: "donut",
				label: messages[language].DONUT
			}
			],
			defaultValue: "donut"
	};
	

	var chartEffect = {
			type: "string",
			component: "dropdown",
			label: messages[language].CHART_EFFECT,
			ref: "chartEffect",
			options: [{
				value: "2d",
				label: messages[language]._2D
			}, {
				value: "Halo",
				label: messages[language].HALO
			}
			],
			defaultValue: "2d"
	};

	
	var chartAnimation = {
			type: "boolean",
			component: "switch",
			label: messages[language].ANIMATION,
			ref: "animation",
			options: [{
				value: true,
				label: messages[language].ON
			}, {
				value: false,
				label: messages[language].OFF
			}],
			defaultValue: false
	};	
	/*
	var thousandSeparator = {
			type: "string",
			label: "Thousand Separator",
			ref: "thousandSeparator",
			expression: "always",
			defaultValue: "."
	};
	var decimalSeparator = {
			type: "string",
			label: "Decimal Separator",
			ref: "decimalSeparator",
			expression: "always",
			defaultValue: ","
	};*/	


	
	var chartLabels = {
			type: "boolean",
			component: "switch",
			label: messages[language].SHOW_LABELS,
			ref: "chartLabels",
			options: [{
				value: true,
				label: messages[language].ON
			}, {
				value: false,
				label: messages[language].OFF
			}],
			defaultValue: true
	};

		var labelTextSize = {
			type: "integer",
			label: messages[language].LABEL_TEXT_SIZE,
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
			label: messages[language].LABEL_DISTANCE,
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
			label: messages[language].SHOW_LABEL_STICKS,
			ref: "labelSticks",
			options: [{
				value: true,
				label: messages[language].ON
			}, {
				value: false,
				label: messages[language].OFF
			}],
			defaultValue: false
	};


	
	var explodeSegment = {
			type: "string",
			component: "dropdown",
			label: messages[language].EXPLODE_SEGMENT,
			ref: "explodeSegment",
			options: [{
				value: 0,
				label:messages[language].NONE
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
			label: messages[language].SHOW_SEGMENT_BORDER,
			ref: "segmentBorder",
			options: [{
				value: true,
				label: messages[language].ON
			}, {
				value: false,
				label: messages[language].OFF
			}],
			defaultValue: false
	};
	

	
	var segmentBorderInOne = {
			type: "string",
			component: "dropdown",
			label: messages[language].BORDER_ONE_DIMENSION,
			ref: "segmentBorderInOne",
			options: [{
				value: "no",
				label: messages[language].NO
			},{
				value: "1",
				label: messages[language].FIRST_DIMENSION_VALUE
			}, {
				value: "2",
				label: messages[language].SECOND_DIMENSION_VALUE
			}
			
			],
			defaultValue: "no"
	};	

	
	var textMiddle = {
			type: "string",
			label: messages[language].TEXT_MIDDLE,
			ref: "textMiddle",
			expression: "always",
			defaultValue: ""
	};

		var sizeText = {
			type: "integer",
			label: messages[language].TEXT_SIZE,
			ref: "sizeText",
			component: "slider",
			min: 10,
			max: 200,
			step: 1,			
			//expression: "always",
			defaultValue: 100
	};

	
		var textPosX = {
			type: "number",
			label: messages[language].TEXT_POS_HOR,
			ref: "textPosX",
			component: "slider",
			min: -100,
			max: 100,
			step: 0.1,			
			//expression: "always",
			defaultValue: 0
	};	
	
		var textPosY = {
			type: "number",
			label: messages[language].TEXT_POS_VER,
			ref: "textPosY",
			component: "slider",
			min: -105,
			max: 95,
			step: 0.1,			
			//expression: "always",
			defaultValue: -5
	};		

	
	var chartRadius = {
			type: "integer",
			label: messages[language].CHART_RADIUS_SIZE,
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
			label: messages[language].DONUT_WIDTH_SIZE,
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
			label: messages[language].TEXT_COLOR,
			ref: "colorText",
			component:"color-picker",
			//expression: "always",
			defaultValue: "#ffffff"
	};	
	
	
	var showValues = {
			type: "string",
			component: "dropdown",
			label: messages[language].SHOW_VALUES,
			ref: "showValues",
			options: [{
				value: "value",
				label: messages[language].VALUES
			},{
				value: "percent",
				label: messages[language].PERCENT
			}, {
				value: "no",
				label: messages[language].NO
			}
			
			],
			defaultValue: "no"
	};
	

	
	var valueBelow = {
			type: "boolean",
			component: "switch",
			label: messages[language].VALUES_BELOW,
			ref: "valueBelow",
			options: [{
				value: true,
				label: messages[language].YES
			}, {
				value: false,
				label: messages[language].NO
			}],
			defaultValue: false
	};	
		

		
	var onlyValues = {
			type: "boolean",
			component: "switch",
			label: messages[language].ONLY_VALUES,
			ref: "onlyValues",
			options: [{
				value: true,
				label: messages[language].ON
			}, {
				value: false,
				label: messages[language].OFF
			}],
			defaultValue: false
	};


	
	
	var keepColors = {
			type: "boolean",
			component: "switch",
			label: messages[language].KEEP_COLORS,
			ref: "keepColors",
			options: [{
				value: true,
				label: messages[language].ON
			}, {
				value: false,
				label: messages[language].OFF
			}],
			defaultValue: false
	};		
	


	
	var segmentBorderWidth = {
			type: "string",
			component: "dropdown",
			label: messages[language].SEGMENT_BORDER_WIDTH,
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
			label: messages[language].BORDER_COLOR,
			ref: "borderColor",
			component:"color-picker",
			//expression: "always",
			defaultValue: "#ffffff"
	};		
	
	var palette = {
			type: "string",
			component: "dropdown",
			label: messages[language].COLORS,
			ref: "palette",
			options: [{
				value: "default",
				label: messages[language].STANDARD_QS
			},{
				value: "bluegradient",
				label: messages[language].BLUE_GRADIENTS
			},{
				value: "redgradient",
				label: messages[language].RED_GRADIENTS
			},{
				value: "greengradient",
				label: messages[language].GREEN_GRADIENTS
			}
			//disabled  
			/*,{
				value: "paletteBG",
				label: messages[language].GRADIENTS
			}*/,{
				value: "yellowwhite",
				label: messages[language].YELLOW_TRANSPARENCE
			},{
				value: "whiteyellow",
				label: messages[language].TRANSPARENCE_YELLOW
			},{
				value: "bluewhite",
				label: messages[language].BLUE_TRANSPARENCE
			},{
				value: "whiteblue",
				label: messages[language].TRANSPARENCE_BLUE
			},{
				value: "redwhite",
				label: messages[language].RED_TRANSPARENCE
			},{
				value: "whitered",
				label: messages[language].TRANSPARENCE_RED
			}
			
			],
			defaultValue: "default"
	};	



	
	var gutterTop = {
			type: "integer",
			label: messages[language].CHART_POSITION_VERTICAL,
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
			label: messages[language].CHART_POSITION_HORIZONTAL,
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
			label: messages[language].ROTATE_UP_FOR,
			ref: "rotateUpFor",
			//component:"color-picker",
			expression: "always",
			defaultValue: ""
	};	
	

	
	var TextCenter = {
		type:"items",
		label:messages[language].ITEM_TEXT_MIDDLE,
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
			label: messages[language].LEGEND_POSITION_HORIZONTAL,
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
			label: messages[language].LEGEND_POSITION_VERTICAL,
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
			label: messages[language].SHOW_LEGENDS,
			ref: "showLegends",
			options: [{
				value: true,
				label: messages[language].SHOW
			}, {
				value: false,
				label: messages[language].DONT_SHOW
			}],
			defaultValue: false
	};

	var graphGutter = {
			type: "string",
			component: "switch",
			label: messages[language].ORIENTATION,
			ref: "graphGutter",
			options: [{
				value: "graph",
				label: messages[language].VERTICAL
			}, {
				value: "gutter",
				label: messages[language].HORIZONTAL
			}],
			defaultValue: "graph"
	};	
	


	
	var legends = {
		type:"items",
		//component: "accordion",
		label:messages[language].ITEM_LEGENDS,
		items: {			
			showLegends:showLegends,
			graphGutter:graphGutter,
			keyPositionX:keyPositionX,
			keyPositionY:keyPositionY
			
		}
	
	};	
	

	
		var labelsOptions = {
		type:"items",
		//component: "expandable-items",
		label:messages[language].ITEM_LABELS,
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
		//component: "expandable-items",
		label:messages[language].ITEM_POSITION,
		items: {
			gutterTop:gutterTop,
			gutterLeft:gutterLeft,
			rotateUpFor:rotateUpFor
		}
	
	};	

	var legPosLab = {
		//type:"items",
		component: "expandable-items",
		label:messages[language].EXPANDABLE_ITEM_LEGEND_LABEL_POSITION,
		items: {			
			legends:legends,
			labelsOptions:labelsOptions,
			Position:Position
			
		}
	
	};	
	
	
	
	var Options = {
		type:"items",
		label:messages[language].ITEM_OPTIONS,
		items: {			
			chartType:chartType,
			chartEffect:chartEffect,
			chartAnimation:chartAnimation,
			explodeSegment:explodeSegment,
			palette:palette,
			keepColors:keepColors
			//,thousandSeparator:thousandSeparator
			//,decimalSeparator:decimalSeparator
		}
	
	};


	
	var chartSize = {
		type:"items",
		label:messages[language].ITEM_SIZE,
		items: {
			chartRadius:chartRadius,
			donutWidth:donutWidth		

		}
	
	};


	
	var chartBorders = {
		type:"items",
		label:messages[language].ITEM_BORDERS,
		items: {
			segmentBorder:segmentBorder,
			borderColor:borderColor,
			segmentBorderInOne:segmentBorderInOne,
			segmentBorderWidth:segmentBorderWidth,			

		}
	
	};	
	
	var optionsSizeBorders = {
		//type:"items",
		component: "expandable-items",
		label:messages[language].EXPANDABLE_ITEM_OPTIONS_SIZE_BORDER,
		items: {			
			Options:Options,
			chartSize:chartSize,
			chartBorders:chartBorders
			
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
			optionsSizeBorders:optionsSizeBorders,
			legPosLab:legPosLab,
			//labelsOptions:labelsOptions,
			
			//Position:Position,
			//legends:legends,
			TextCenter:TextCenter

			//MyColorPicker: MyColorPicker
			//miscSettings: miscSettings

        }
    };

} );
