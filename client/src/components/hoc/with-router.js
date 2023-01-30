import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const withRouter = (Wrapped) => {
	return (props) => {
		let navigate = useNavigate();
		const {id} = useParams();
		return (<Wrapped {...props} navigate={navigate} idUrl={id} />);
	}
};

export default withRouter;