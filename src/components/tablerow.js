import React, { Component } from 'react';

export default class UserTable extends Component {
	constructor(props){
		super(props);
		this.state = {}
	}

	render() {
		const {name,user} = this.props;
		return (
			<div id="tableRow">
				{name}
			</div>
		)
	}
}