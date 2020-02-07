import React from 'react';
import { NotesProvider } from './contexts';


export const App: React.FC = () => (
	<div className="page">
		<div className="wrapper">
			<NotesProvider>

			</NotesProvider>
		</div>
	</div>
);