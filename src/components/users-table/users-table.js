import React, {Component} from 'react';
import {connect} from 'react-redux';

import {compose, withTableService} from '../hoc';
import {fetchUsersData} from '../../actions';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import styles from './users-table.m.less';

class UsersTable extends Component {

	componentDidMount() {
		this.props.fetchUsersData();
	}

	createRow = (user, idx, arr) => {
		//const userData = arr[arr.length - idx - 1];
		const {id, title, body} = user;

		return (
			<tr key={id} className={styles.rowTbodyUser}>
				<td className={styles.userIndex}>{id}</td>
				<td className={styles.userHeading}>{title}</td>
				<td className={styles.userDescription}>{body}</td>
			</tr>
		);
	}

	render() {
		const {visibleUsers, loading, error} = this.props;
		const contentUsers = visibleUsers ?  visibleUsers.map(this.createRow) : null;

		if (loading) { 
			return( 
				<div className={styles.boxAdditional}>
					<Spinner />
				</div> 
			)} 
		
		if (error) { return <ErrorIndicator /> }

		return (
			<table className={styles.tableUsers}>
				<thead>
					<tr className={styles.rowTheadUsers}>
						<th className={styles.userHindex}>ID</th>
						<th className={styles.userHheading}>Заголовок</th>
						<th className={styles.userHdescription}>Описание</th>
					</tr>
				</thead>
				<tbody>
					{contentUsers}
				</tbody>
			</table>
		);
	}
}

const mapMethodsToProps = (tableService) => ({
	getUsers: tableService.getUsers,
});

const mapStateToProps = ({visibleUsers, dataUsersLoading, dataUsersError}) => ({
	visibleUsers,
	loading: dataUsersLoading,
	error: dataUsersError
});

const mapDispatchToProps = (dispatch, {getUsers}) => ({
	fetchUsersData: () => fetchUsersData(getUsers, dispatch)(),
});

export default compose(
	withTableService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(UsersTable);