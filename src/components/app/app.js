import React from 'react';
import {Routes, Route} from 'react-router-dom';

import BoxSearchUsers from '../box-search-users';
import UsersTable from '../users-table';
import PaginationUsers from '../pagination-users';
import styles from './app.m.less';

const App = () => {
	return (
		<div className={styles.mainWrapper}>
			<BoxSearchUsers />
				<Routes>
					<Route path="/">
						<Route path="" element={<UsersTable />} />
						<Route path=":id" element={<UsersTable />} />
					</Route>
				</Routes>
			<PaginationUsers />
		</div>
	);
};

export default App;
