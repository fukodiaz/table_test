const initialState = {
	dataUsers: null,
	dataUsersLoading: false,
	dataUsersError: false,
	visibleUsers: null,

	searchedUser: ''
};

const searchingUsers = (dataUsers, term) => {
	if (term === '') {
		return dataUsers;
	}

	return dataUsers.filter(user => {
		const {title, body} = user;
		const titleChecked = title.toLowerCase().indexOf(term.toLowerCase()); 
		const bodyChecked = body.toLowerCase().indexOf(term.toLowerCase());
		if (titleChecked > -1 || bodyChecked > -1) { return user; }
		return null;
	});
};

const reducer = (state = initialState, action) => {

	switch (action.type) {

		case 'FETCH_USERS_DATA_REQUEST':
			return {
				...state,
				dataUsers: null,
				visibleUsers: null,
				dataUsersLoading: true,
				dataUsersError: false
			}

		case 'FETCH_USERS_DATA_SUCCESS':
			return {
				...state,
				dataUsers: action.payload,
				visibleUsers: action.payload,
				dataUsersLoading: false,
				dataUsersError: false
			}
		
		case 'FETCH_USERS_DATA_FAILURE':
			return {
				...state,
				dataUsers: null,
				visibleUsers: null,
				dataUsersLoading: false,
				dataUsersError: action.payload
			}

		case 'INPUT_CHANGED':
			const visibleUsers = searchingUsers(state.dataUsers, action.payload);
			return {
				...state,
				searchedUser: action.payload,
				visibleUsers
			}

		default: 
			return state;
	}
};

export default reducer;