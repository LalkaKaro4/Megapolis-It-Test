import React, { useContext } from 'react';

import { Spinner } from 'app/components';
import { NotesContext } from 'app/contexts';

const NotesWrapper: React.FC = ({ children }) => {

	const { isLoading, data } = useContext(NotesContext);

	if (isLoading) {
		return <Spinner />;
	}

	if (!data || data.error) {
		return (
			<div className="content-error">
				{data?.error || "Произошла ошибка при загрузке списка"}
			</div>
		);
	}

	return (
		<>
			{children}
		</>
	);
};

export default NotesWrapper;