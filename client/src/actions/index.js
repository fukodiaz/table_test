const usersDataRequested = () => ({type: 'FETCH_USERS_DATA_REQUEST'});

const usersDataLoaded = (payload) => ({
		type: 'FETCH_USERS_DATA_SUCCESS',
		payload
});

const usersDataError = (payload) => ({
	type: 'FETCH_USERS_DATA_FAILURE',
	payload
});

const fetchUsersData = (methodService, dispatch) => () => {
	dispatch(usersDataRequested());
	methodService()
		.then(data => dispatch(usersDataLoaded(data)))
		.catch(error => dispatch(usersDataError(error)));
};

const inputChanged = (payload) => ({
	type: 'INPUT_CHANGED',
	payload
});

const onBtnArrow = (payload) => ({
	type: 'ON_BTN_ARROW',
	payload
});

const onBtnPagin = (payload) => ({
	type: 'ON_BTN_PAGIN',
	payload
});

const onSortUsers = (payload) => ({
	type: 'ON_SORT_USERS',
	payload
});

export {
	fetchUsersData,
	inputChanged,
	onBtnArrow,
	onBtnPagin,
	onSortUsers
};