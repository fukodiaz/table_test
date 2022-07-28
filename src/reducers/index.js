const initialState = {
	dataUsers: null,
	dataUsersLoading: false,
	dataUsersError: false,
	visibleUsers: null,

	searchedUser: '',

	total: null, //total quantity of paginButtons
	qUsersOnPage: 10,
	range: 5, //quantity of visible paginButtons
	startPagin: 1,
	activeIdxPagin: 0,

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

function distributeVisibleUsers(visibleUsers, activeIdx, quantity) { //quantity users on 1 page
	return [...visibleUsers.slice(quantity*activeIdx, (activeIdx+1)*quantity)];
}

const sortByStrObj = (prop) => (a, b) => {
	let 	strB = b[prop].toLowerCase(),
			strA = a[prop].toLowerCase();
	if (strA < strB) return -1;
	if (strA > strB) return 1;
	return 0;
};

const onSortUsers = (nameHeader, users, q) => {
	switch (nameHeader) {
		case 'id':
			return users.sort((a, b) => b.id - a.id).slice(0, q);
		case 'heading':
			return users.sort(sortByStrObj('title')).slice(0, q);
		case 'description':
			return users.sort(sortByStrObj('body')).slice(0, q);
	}
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
			const total =  Math.ceil(action.payload.length/state.qUsersOnPage);
			return {
				...state,
				dataUsers: action.payload,
				visibleUsers: distributeVisibleUsers(
								action.payload, state.activeIdxPagin, state.qUsersOnPage),
				dataUsersLoading: false,
				dataUsersError: false,
				total
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
			const listSearchUsers = searchingUsers(state.dataUsers, action.payload);
			const visibleUsers = distributeVisibleUsers(listSearchUsers, 0, state.qUsersOnPage);
			
			return {
				...state,
				searchedUser: action.payload,
				visibleUsers,
				total: Math.ceil(listSearchUsers.length/state.qUsersOnPage),
				startPagin: 1,
				activeIdxPagin: 0
			}

		case 'ON_BTN_ARROW':
			const {startShift = 0, activeIdxShift = 0} = action.payload;
			const curActiveIdx = state.activeIdxPagin + activeIdxShift;
			const visualUsers = distributeVisibleUsers(
						searchingUsers(state.dataUsers, state.searchedUser),
						curActiveIdx, state.qUsersOnPage);
			return {
				...state,
				startPagin: state.startPagin + startShift,
				activeIdxPagin: curActiveIdx,
				visibleUsers: visualUsers
			}

		case 'ON_BTN_PAGIN': 
			const visUsers = distributeVisibleUsers(
						searchingUsers(state.dataUsers, state.searchedUser),
						action.payload, state.qUsersOnPage);
			return {
				...state,
				activeIdxPagin: action.payload,
				visibleUsers: visUsers
			}

		case 'ON_SORT_USERS':
			return {
				...state,
				visibleUsers:  onSortUsers(
					action.payload, state.visibleUsers, state.qUsersOnPage)
			}
		default: 
			return state;
	}
};

export default reducer;