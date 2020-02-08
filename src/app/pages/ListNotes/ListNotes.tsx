import React, { useContext, useState } from 'react';

import { PageWrapper, Button } from 'app/components';
import { NotesContext } from 'app/contexts';

import { Table } from './TableNotes';
import { AddNoteModal } from '../AddNoteModal';

const ListNotes = () => {

	const { data } = useContext(NotesContext);
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => setShowModal(!showModal);

	return (
		<>
			<AddNoteModal open={showModal} onClose={toggleModal} />
			<PageWrapper
				header="Список задач"
				headerButton={(
					<Button
						text="Добавить"
						onClick={toggleModal}
					/>
				)}
			>
				{data.length > 0 ? <Table /> : "н/д"}
			</PageWrapper>
		</>
	);
};

export default ListNotes;