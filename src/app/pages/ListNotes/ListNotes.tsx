import React from 'react';

import { PageWrapper, Button } from 'app/components';

const ListNotes = () => {

	return (
		<PageWrapper
			header="Список задач"
			headerButton={<Button text="Добавить" />}
		>

		</PageWrapper>
	);
};

export default ListNotes;