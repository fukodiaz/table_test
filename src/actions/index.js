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

export {
	fetchUsersData,
	inputChanged
};