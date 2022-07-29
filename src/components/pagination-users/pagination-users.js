import React, {Component} from 'react';
import {connect} from 'react-redux';

import {compose, withRouter} from '../hoc';
import {onBtnArrow, onBtnPagin} from '../../actions';
import styles from './pagination-users.m.less';

class PaginationUsers extends Component {
	state = {
		arrCountVisBtns: [],
		btnsMain: null,
		disabledPrev: false,
		disabledNext: false
	} 

	defineAbledBtnDirection = (activeIdx, total) => {
		if (activeIdx === 0) {
			this.setState({disabledPrev: true});
		} else {
			this.setState({disabledPrev: false});
		}
		if ((activeIdx + 1) === total) {
			this.setState({disabledNext: true});
		} else {
			this.setState({disabledNext: false});
		}
		if (total === 1) {
			this.setState({disabledNext: true});
		}
	}

	componentDidMount() {
		const {activeIdx, total} = this.props;
		this.defineAbledBtnDirection(activeIdx, total);
	}

	componentDidUpdate(prevProps, prevState) {
		const {total, activeIdx, start, range, onBtnPagin, navigate} = this.props;
		const {arrCountVisBtns} = this.state;

		if (prevProps.total !== total || prevProps.start !== start) { 
			if (total) {
				for (let i = start, arr = []; i <= total && arr.length < range; i++) {
					arr = [...arr, i];
					this.setState({arrCountVisBtns:  arr});
				}
			}
			if (!total) {
				this.setState({arrCountVisBtns: []});
			}
		}

		if (prevState.arrCountVisBtns !== arrCountVisBtns || prevProps.activeIdx !== activeIdx) {
			const btns = arrCountVisBtns.map(item => {
				const classBtnMain = activeIdx === item - 1 ? 'activeBtnMain' : 'btnMain';
				
				return(
					<li key={item} className={styles.itemBtnMain}>
						<button type="button" className={styles[classBtnMain]}
									onClick={() => onBtnPagin(item - 1)}>
							{item}
						</button>
					</li>	
				);
			});
			this.setState({btnsMain: btns});
		}

		if (prevProps.activeIdx !== activeIdx || prevProps.total !== total) {
			this.defineAbledBtnDirection(this.props.activeIdx, this.props.total);
			navigate(`/${activeIdx+1}`);
		}
	}

	onClickArrow = (direct) => {
		const { activeIdx, onBtnArrow, start, range, total} = this.props;
		if (direct === 'prev') {
			if (activeIdx - 1 >= 0) {
				onBtnArrow({activeIdxShift: -1});
				if (start >= activeIdx + 1) {
					onBtnArrow({startShift: -1});
				}
			}
		}

		if (direct === 'next') {
			if (activeIdx + 1 < total) {//(total-1)
				onBtnArrow({activeIdxShift: 1});
				if ((range + start) <= (activeIdx + 2)) {
					onBtnArrow({startShift: 1});
				}
			} 
		}
	}

	render() {
		const {visibleUsers} = this.props;
		const {btnsMain, disabledPrev, disabledNext} = this.state;
		const	contentBtnPrev = visibleUsers ? (
					<div className={styles.itemBtnPrev}>
						<button type="button" className={styles.btnArrowPrev}
									onClick={() => this.onClickArrow('prev')}
									disabled={disabledPrev}>
							Назад
						</button>
					</div>) : null;
		const contentBtnNext = visibleUsers ? (
					<div className={styles.itemBtnNext}>
						<button type="button" className={styles.btnArrowNext}
									onClick={() => this.onClickArrow('next')}
									disabled={disabledNext}>
							Далее
						</button>
					</div>) : null;

		return (
			<div className={styles.boxPagination}>
				{contentBtnPrev}
				<ul className={styles.pagination}>
					{btnsMain}
				</ul>
				{contentBtnNext}
			</div>
		);
	}
}

const mapStateToProps = ({visibleUsers, total, range,
	startPagin, activeIdxPagin}) => ({
	visibleUsers, total, range,
	start: startPagin,
	activeIdx: activeIdxPagin
});

const mapDispatchToProps = (dispatch) => ({
	onBtnArrow: (payload) => dispatch(onBtnArrow(payload)),
	onBtnPagin: (payload) => dispatch(onBtnPagin(payload))
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(PaginationUsers);