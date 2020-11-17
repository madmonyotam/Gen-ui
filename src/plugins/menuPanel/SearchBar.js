import React from 'react';
import PropTypes from 'prop-types';

import access from 'plugins/access';

import Row from 'plugins/Layouts/Row';
import Label from 'plugins/tools/Label';
import IconButton from 'plugins/icons/IconButton';

function SearchBar({ label, nested, onBack }) {
	const renderBack = () => {
		if (!nested) return;
		const btnStyle = { marginLeft: 10, marginTop: 2 };

		return (
			<IconButton
				icon={access.icon('searchBar.back')}
				color={access.color('searchBar.fg')}
				onClick={onBack}
				btnStyle={btnStyle}
			/>
		);
	};

	return (
		<Row background={access.color('searchBar.bg')}>
			{renderBack()}
			<Label color={access.color('searchBar.fg')}>{label}</Label>
		</Row>
	);
}

SearchBar.propTypes = {
	label: PropTypes.string, 
	nested: PropTypes.string,
	onBack: PropTypes.func
};

export default SearchBar;
