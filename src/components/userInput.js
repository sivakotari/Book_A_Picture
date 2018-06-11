import React, { Component } from 'react';
import Theatre from './theatre';
import {updateSeatsCount, registerUser} from './../actions';
import { connect } from 'react-redux';
import UserTable from './usertable';

class UserInput extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			number: 0,
			inputError: ''
		}
	}

	registerUser =(e) => {
		const {availableSeats, registerUser} = this.props;
		e.preventDefault();
		let userName = document.forms["userForm"]["username"].value;
		let noSeats = document.forms["userForm"]["seats"].value;
		if( !userName || !noSeats || parseInt(noSeats)>availableSeats){
			this.setState({
				inputError: "Wrong with your input!"
			})
		}else{
			registerUser(userName, noSeats);
			this.setState({
				inputError: ""
			})
		}
	}

	componentWillMount = () => {
		const {updateSeatsCount} = this.props;
		updateSeatsCount();
	}

	render() {
		const {availableSeats,userDetails} = this.props;
		return (
			<div id="userInput">
				<form id="userForm">
					<label>Name <input name="username" type="text" placeholder="Enter your name" autoFocus/></label>
					<label>No of tickets <input name="seats" type="number" placeholder={`Enter below ${availableSeats}`} size="4" /></label>
					<button id="okay" onClick={(e)=>this.registerUser(e)}>OK</button>
				</form>
				{
					this.state.inputError ?
					<span className="inputError">{this.state.inputError}</span>
					: null
				}
				<Theatre />
				{
					userDetails&&Object.keys(userDetails).length > 0 ?
						<UserTable userDetails={userDetails} />
					: null
				}
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
  return {
    updateSeatsCount: () => {
      dispatch(updateSeatsCount());
    },
    registerUser: (userName, noSeats) => {
    	dispatch(registerUser(userName, noSeats));
    }
 }
}

function mapStateToProps(state, ownProps){
  return {
  	availableSeats: state.availableSeats,
  	userDetails: state.userDetails
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserInput);