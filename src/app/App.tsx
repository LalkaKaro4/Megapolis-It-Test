import React, { useState } from 'react';


const Content: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true);

	if (isLoading) {
		return <>loading..</>;
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