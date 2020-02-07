import React, { useState } from 'react';

import { INote, INoteInput } from 'app/entities';
import { Button, ButtonStyle } from '../Button';


interface IForm {
	note: INote;
	textSumbit: string;
	onInputChange: (noteInut: INoteInput) => void;
	onSumbit: (noteInut: INoteInput) => void;
}


export const ValidationTitle = (title: string) => {
	if (!title)
		return "Заголовок не может быть пустым";

	return "";
};

const Form: React.FC<IForm> = ({ note, textSumbit, onInputChange, onSumbit }) => {

	const [inputs, setInputs] = useState<INoteInput>(note);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

		const { name, value } = event.target;

		setInputs(inputs => ({
			...inputs,
			[name]: value,
			[name + "Error"]: ""
		}));

		onInputChange(inputs);
	};

	const handleSumbit = (event: React.FormEvent<HTMLButtonElement>) => {
		event.preventDefault();

		const { title } = inputs;

		const titleError = ValidationTitle(title);

		setInputs(inputs => ({ ...inputs, titleError }));

		if (titleError)
			return;

		onSumbit({ ...note, ...inputs });
	};

	return (
		<div className="form">
			<div className="form-group">
				<label className="form-label" htmlFor="title">Краткое описание</label>
				<input
					className="form-input"
					name="title"
					type="text"
					value={inputs.title}
					onChange={handleInputChange}
				/>
				<span className="input-error" >{inputs.titleError}</span>
			</div>

			<div className="form-group">
				<Button
					text={textSumbit}
					color={ButtonStyle.BLUE}
					onClick={handleSumbit}
				/>
			</div>
		</div>
	);
};

export default Form;