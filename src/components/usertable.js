import React, { Component } from 'react';
// import TableRow from './tablerow';

export default class UserTable extends Component {
	constructor(props){
		super(props);
		this.state = {}
	}

	render() {
		const {userDetails} = this.props;
		let customUserObj = {};
		let alphas = Array(26).fill(1).map((_,i) => String.fromCharCode(65+i));
		Object.keys(userDetails).map(user => {
			let tktCount = 0;
			let tkts = [];
			Object.keys(userDetails[user]).map(row => {
				customUserObj[user] = {};
				tktCount = tktCount+userDetails[user][row].length;
				Object.keys(userDetails[user][row]).map(tkt => {
					tkts.push(alphas[row]+(userDetails[user][row][tkt]+1));
				});
				customUserObj[user]['tktCount'] = tktCount;
				customUserObj[user]['tkts'] = tkts;
			});
		});
		return (
			<div id="userTable">
				<div id="userTableContainer">Booking History
				<div className="tableRow head">
					<div className="userName">Name</div>
					<div className="ticketcount">No of tickets</div>
					<div className="tickets">Seats</div>
				</div>
				{
					Object.keys(customUserObj).map(user => 
						(
							<div key={user} className="tableRow">
								<div className="userName">{user}</div>
								<div className="ticketcount">{customUserObj[user]['tktCount']}</div>
								<div className="tickets">
									{
										customUserObj[user]['tkts'].map((tkt,i) => (
											i == customUserObj[user]['tkts'].length-1 ? <span className="ticket" key={tkt}>{tkt}</span> : <span className="ticket" key={tkt}>{tkt}, </span>
										))
									}
								</div>
							</div>
						)
					)
				}
				</div>
			</div>
		)
	}
}