import React, { useState } from 'react';

import { Spinner } from './components';


const Content: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
		</>
	);
};

export const App: React.FC = () => (
	<div className="page">
		<div className="wrapper">
			<Content />
		</div>
	</div>
);