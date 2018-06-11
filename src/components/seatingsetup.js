import React, { Component } from 'react';
import RowFactory from'./rowfactory';
import {updateRowInfo} from './../actions';
import { connect } from 'react-redux';
import classNames from 'classnames';

class SeatingSetup extends Component {
	constructor(props){
		super(props);
		this.state = {
			rows: 0,
			columns: 0,
			selected: {},
			seatCount: 0,
			maxSelectionErr: ''
		}
	}

	cellClick = (e) => {
		const {currentUser} = this.props;
		const maxSelection = currentUser[Object.keys(currentUser)[0]];
		let cellindex = e.target.closest('td').cellIndex;
		let rowindex = e.target.closest('td').parentNode.rowIndex;
		let mainDiv = e.target.closest('div');
		let rowInfo = {};
		let seatCount = 0;
		let maxSelectionErr = '';

		if(!mainDiv.classList.contains('selected') && this.state.seatCount >= maxSelection){
			this.setState({
				maxSelectionErr: "! You can't select any more"
			})
		}else{
			if(mainDiv.classList.contains('selected')){
				seatCount = this.state.seatCount-1;
				maxSelectionErr = ''
			}
			else{
				seatCount = this.state.seatCount+1;
			}
			mainDiv.classList.toggle('selected');			
			rowInfo[rowindex] = (this.state.selected[rowindex]) ?
				(this.state.selected[rowindex].indexOf(cellindex) === -1) ?
					[...this.state.selected[rowindex], cellindex]
				: [...this.state.selected[rowindex].filter(e => e !== cellindex)]
			: [cellindex];
			this.setState({
				selected: {...this.state.selected, ...rowInfo},
				seatCount,
				maxSelectionErr
			})
		}
	}

	bookSelection = () => {
		const {updateRowInfo} = this.props;
		if(this.state.seatCount){ 
			updateRowInfo(this.state.selected)
			this.setState({
				selected: {},
				maxSelectionErr: '',
				seatCount: 0
			})
			document.forms["userForm"]["username"].value = '';
			document.forms["userForm"]["seats"].value = '';
		}
	}

	componentWillMount = () => {
		const {rows, columns} = this.props;
		this.setState({
			rows,
			columns
		})
	}

	render() {
		const {rows, columns, maxSelectionErr} = this.state;
		const {reserved, currentUser} = this.props;
		let classes = classNames('seatingSetup', {'overlayActive': Object.keys(currentUser).length > 0 ? false : true});
		return (
			<div className={classes}>
				{maxSelectionErr ? <span className="inputError">{maxSelectionErr}</span> : null}
				<table>
					{
						[...Array(rows)].map((_, i) => <RowFactory key={i} columns={columns} cellClick={this.cellClick} reserved={reserved[i]}/> )
					}
				</table>
				<button id="confirm" onClick={()=>this.bookSelection()}>Book selected</button>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
  return {
    updateRowInfo: rowInfo => {
      dispatch(updateRowInfo(rowInfo));
    }
 }
}

function mapStateToProps(state, ownProps){
  return {
  	reserved: state.reserved,
  	reservedSeats: state.reservedSeats,
  	availableSeats: state.availableSeats,
  	rows: state.rows,
  	columns: state.columns,
  	currentUser: state.currentUser
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SeatingSetup);