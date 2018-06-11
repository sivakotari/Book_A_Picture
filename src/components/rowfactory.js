import React, { Component } from 'react';
import classNames from 'classnames';

export default class RowFactory extends Component {
	constructor(props){
		super(props);
		this.state = {}
	}

	cellFactory = (i) => {
		const {reserved} = this.props;
		let classes = classNames('seatBlock', {'reserved': reserved&&reserved.indexOf(i) > -1 ? true : false}, {'available': reserved ? reserved.indexOf(i) === -1 : true});
		return(
			<td className='' key={i}>
				<div className={classes} onClick={reserved && reserved.indexOf(i) > -1 ? null : (e) => this.props.cellClick(e)} >
					<span>{i+1}</span>
				</div>
			</td>
		)
	}

	render() {
		const {columns} = this.props;
		return (
			<tr>
				{
					[...Array(columns)].map((_, i) => this.cellFactory(i))
				}
			</tr>
		);
	}
}