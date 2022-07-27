import React, {Component} from 'react';

import BoxSearchUsers from '../box-search-users';
import UsersTable from '../users-table';
import styles from './app.m.less';

export default class App extends Component {

	render() {
		return (
			<div className={styles.mainWrapper}>
				<BoxSearchUsers />
				<UsersTable />
			</div>
		);
	}
}
