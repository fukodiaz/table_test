import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import ErrorBoundry from './components/error-boundry';
import {TableServiceProvider} from './components/table-service-context';
import App from './components/app';

import store from './store';
import TableService from './services/table-service';

const tableService = new TableService();

ReactDOM.render(
	<Provider store={store}>
		<ErrorBoundry>
			<TableServiceProvider value={tableService}>
				<Router>
					<App />
				</Router>
			</TableServiceProvider>
		</ErrorBoundry>
	</Provider>,
	document.getElementById('root'));