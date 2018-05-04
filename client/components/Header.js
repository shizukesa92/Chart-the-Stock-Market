import React, {
	Component
} from 'react';

import {
	Link
} from 'react-router-dom';
import {
	connect
} from "react-redux";

export default class Header extends Component {
	render() {
		return (
			<div id="header">
				<span className = "text-center"><a href = "/">Chart the Stock Market</a></span>
        </div>
		);
	}
}
