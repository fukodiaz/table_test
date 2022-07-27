import React from 'react';
import {connect} from 'react-redux';

import {inputChanged} from '../../actions';

import styles from './box-search-users.m.less';
import loupe from './loupe.svg';

const BoxSearchUsers = (props) => {
	const {inputChanged, searchedUser} = props;

	return (
		<div className={styles.boxSearchUsers} tabIndex={0}>
			<input type="search" name="searchUsers" 
								onChange={(e) => inputChanged(e.target.value)}
								value={searchedUser}
								className={styles.inputSearchUsers} 
								placeholder="Поиск" />
			<p className={styles.svgBoxLoupe}>
				<svg width="100%" height="100%">	
					<use href={`${loupe}#loupe`}></use>
				</svg>
			</p>
		</div>
	);
};

const mapStateToProps = ({searchedUser}) => ({
	searchedUser
});


const mapDispatchToProps = (dispatch) => ({
	inputChanged: (payload) => dispatch(inputChanged(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(BoxSearchUsers);