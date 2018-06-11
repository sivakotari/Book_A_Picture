const initialState = {
  reserved: {},
  reservedSeats: 0,
  availableSeats: 0,
  rows: 10,
  columns: 30,
  currentUser: {},
  userDetails: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ROW_SELECTION':
      let reserved ={};
      let availableSeats = 0;
      let reservedSeats = 0;
      let userDetails = {};
      for(let r in action.row){
        reserved[r] = state.reserved[r] ? [...state.reserved[r],...action.row[r]] : [...action.row[r]];
      }
      userDetails[Object.keys(state.currentUser)[0]] = {...action.row};
      userDetails = {...state.userDetails, ...userDetails};
      reserved = {...state.reserved, ...reserved};
      for(let r in reserved){
        reservedSeats = reservedSeats+reserved[r].length;
      }
      availableSeats = (state.rows*state.columns) - reservedSeats;
      return {
        ...state,
        reserved,
        reservedSeats,
        availableSeats,
        userDetails,
        currentUser: {}
      }
    case 'UPDATE_SEAT_COUNT':
      availableSeats = (state.rows*state.columns) - state.reservedSeats;
      return {
        ...state,
        availableSeats
      }
    case 'REGISTER_USER':
      let currentUser = {};
      currentUser[action.userName] = action.noSeats;
      return {
        ...state,
        currentUser
      }
    default:
      return state
  }
}
