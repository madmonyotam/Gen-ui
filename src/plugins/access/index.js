import general from 'plugins/access/mainConfig/general.js';
import colors from 'plugins/access/mainConfig/colors.js';
import icons from 'plugins/access/mainConfig/icons.js';
import dimensions from 'plugins/access/mainConfig/dimensions.js';
import timeings from 'plugins/access/mainConfig/time.js';

import access, { addToConfig } from 'access-in';

let config = {
	core: general,
	color: colors,
	icon: icons,
	dim: dimensions,
	time: timeings,
	translate: {}
};

addToConfig(config);

export const translate = (value) => {
	return value;
};

export default access;

