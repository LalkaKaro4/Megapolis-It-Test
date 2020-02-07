import React, { useContext } from 'react';

import { Spinner } from 'app/components';
import { NotesContext } from 'app/contexts';

const NotesWrapper: React.FC = ({ children }) => {

	const { isLoading, notes } = useContext(NotesContext);

	if (isLoading) {
		return <Spinner />;
	}

	if (!notes || notes.error) {
		return (
			<div className="content-error">
				{notes?.error || "Произошла ошибка при загрузке списка"}
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