import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ className, outline, children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className={`button ${className} ${outline ? 'button--outline' : ''}`}
		>
			{children}
		</button>
	);
};

Button.propTypes = {
	className: PropTypes.string,
	outline: PropTypes.bool,
	onClick: PropTypes.func,
};

export default Button;
