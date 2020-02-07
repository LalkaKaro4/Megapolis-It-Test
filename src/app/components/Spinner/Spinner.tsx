import React from 'react';

import loading from "assets/loading.gif";

const Spinner: React.FC = () => (
	<>
		<div className="spinner">
			<img src={loading} alt="loading..." />
		</div>
	</>
);

export default Spinner;