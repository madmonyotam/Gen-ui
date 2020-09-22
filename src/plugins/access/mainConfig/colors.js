export default {
	colors: {
		black: '#000000',
		white: '#ffffff',
		blue01: '#39536f',
		blue02: '#496a8c',
		blue03: '#5980a9',
		blue04: '#aec9e8',
		blue05: '#21354a',
		blue06: '#293d52',
		blueLight01: '#bfd6ef',
		blueLight02: '#e0e7ee',
		blueLight03: '#bac4ce',
		grey01: '#808080',
		grey02: '#e8e8e8',
		greyLight01: '#f6f6f6'
	},
	materialUI: {
		primary: 'colors.blue01',
		secondary: 'colors.blue02',
	},
	backLevelColors: {
		owner: 'colors.blue05',
		admin: 'colors.blueLight01',
		member: 'colors.blueLight02'
	},
	frontLevelColors: {
		owner: 'colors.blueLight02',
		admin: 'colors.blue02',
		member: 'colors.blue05'
	},
	backgrounds: {
		primary: 'colors.blue01',
		secondary: 'colors.blueLight01',
		content: 'colors.blueLight02',
		active: 'colors.blue02',
		hover: 'colors.blue03',
		code: 'colors.grey02',
		light: 'colors.greyLight01',
		badge: '#8fa6c2'
	},
	texts: {
		primary: 'colors.white',
		secondary: 'colors.blue01',
		placeholder: 'colors.grey01',
		title: '#6C829B'
	},
	searchBar: {
		bg: 'backgrounds.primary',
		fg: 'texts.primary',
	},
	bottomBar: {
		bg: 'backgrounds.primary',
		fg: 'texts.primary',
		outline: 'colors.blueLight01',
	},
	schemaPanel: {
		bg: 'colors.white',
		divider: 'colors.blue02',
		selected: 'texts.primary',
		notSelected: 'colors.blue03',
		border: 'backgrounds.primary',
	},
	menuPanel: {
		bg: 'colors.grey02',
		icon: 'colors.grey02',
	},
	canvases: {
		bg: 'backgrounds.secondary',
		fg: 'texts.secondary',
		moveOnCircle: 'colors.blueLight01',
		moveOnText: 'colors.blue01',
		packBgStart: 'backgrounds.primary',
		packBgEnd: 'backgrounds.hover',
		clickColor: 'colors.blue06',
	},
	lineCanvas: {
		bg: 'colors.blue01',
		fg: 'colors.blueLight01',
		move: '#bfd6ef7a',
	},
	types: {
		bg: 'colors.blue05',
		packBgStart: 'colors.blue04',
		packBgEnd: 'colors.white',
		clickColor: 'colors.white',
	},
	tags: {
		bg: 'backgrounds.primary',
		fg: 'texts.primary',
		moveOnTag: 'colors.blueLight01',
		moveOnText: 'colors.blue01',
	},
	menu: {
		bg: 'colors.white',
		headerFg: 'texts.primary',
		headerBg: 'backgrounds.primary',
	},
};
