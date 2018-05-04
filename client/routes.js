import React from "react";
import {
	Route,
	Switch
} from "react-router-dom";

import Main from './modules/App/App';

export default class Routes extends React.Component {

	render() {
		return (

			<Switch>
                    <Route exact path='/' component={Main} />
	  </Switch>);

	}
}
