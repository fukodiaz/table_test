import React from 'react';
import { TableServiceConsumer } from '../table-service-context';

const withTableService = (mapMethodsToProps) => (Wrapped) => {
	return (props) => {
		return (
			<TableServiceConsumer>
				{
					(tableService) => {
						const propsFromService = mapMethodsToProps(tableService);
						return (<Wrapped {...props} {...propsFromService} />);
					}
				}
			</TableServiceConsumer>
		);
	};
};

export default withTableService;