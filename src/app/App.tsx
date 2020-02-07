import React, { Suspense, lazy } from 'react';
import { Switch, Route, Router } from 'react-router-dom';

import { history } from './constants';
import { NotesProvider } from './contexts';
import { Spinner, Footer } from './components';

const ListNotes = lazy(() => import("./pages/ListNotes"));

export const App: React.FC = () => (
	<Router history={history}>
		<div className="page">
			<div className="wrapper">
				<NotesProvider>
					<Suspense fallback={<Spinner />}>
						<Switch>
							<Route path="/" component={ListNotes} />
						</Switch>
						<Footer />
					</Suspense>
				</NotesProvider>
			</div>
		</div>
	</Router>
);