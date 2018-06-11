export const updateSeatsCount = () => (
	{type: 'UPDATE_SEAT_COUNT'}
)
export const registerUser = (userName, noSeats) => (
	{type: 'REGISTER_USER', userName, noSeats}
)
export const updateRowInfo = row => (
	{type: 'UPDATE_ROW_SELECTION', row}
)