import React, {Fragment} from 'react';

import BoxSearchUsers from '../box-search-users';
import UsersTable from '../users-table';
import PaginationUsers from '../pagination-users';
import styles from './main-page.m.less';

const MainPage = () => {
	return (
		<Fragment>
			<BoxSearchUsers />
			<UsersTable />
			<PaginationUsers />
		</Fragment>
	);
};

export default MainPage;

