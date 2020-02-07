import React, { useContext } from 'react';

import { PageWrapper, Button } from 'app/components';
import { NotesContext } from 'app/contexts';

import { Table } from './TableNotes';

const ListNotes = () => {

	const { data } = useContext(NotesContext);

	return (
		<PageWrapper
			header="Список задач"
			headerButton={(
				<Button text="Добавить" />
			)}
		>
			{data.length > 0 ? <Table /> : "н/д"}
		</PageWrapper>
	);
};

export default ListNotes;