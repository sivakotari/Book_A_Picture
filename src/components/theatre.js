import React, { Component } from 'react';
import SeatingSetup from './seatingsetup';
// import { connect } from 'react-redux';

export default class Theatre extends Component {
	constructor(props){
		super(props);
		this.state = {}
	}

	render() {
		return (
			<div id="theatre">
				<div id="screen">
					<svg width="550" height="100">
					  {/*<polygon points="10,10 500,10 480,30 30,30" fill="silver" strokeWidth="5" stroke="rgba(0,0,0,0.5)" />*/}
					  <path d="M10,25 Q270,-5 520,25 L475,40 Q270,7 55,40 Z" fill="gainsboro" strokeWidth="2" stroke="rgba(0,0,0,0.5)" />
					  <path d="M55,50 L475,50 L475,55 L55,55 Z" fill="gainsboro" />
					</svg>
				</div>
				<SeatingSetup/>
			</div>
		);
	}
}

// function mapDispatchToProps(dispatch) {
//   return {}
// }

// function mapStateToProps(state, ownProps){
//   return {
//   	reserved: state.reserved
//   }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(Theatre);