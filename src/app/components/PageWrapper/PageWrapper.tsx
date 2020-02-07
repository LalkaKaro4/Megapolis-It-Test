import React from 'react';

import { IButton } from "app/components";

interface IPageWrapper {
	header: string;
	headerButton: IButton;
}

const PageWrapper: React.FC<IPageWrapper> = ({ header, headerButton, children }) => (
	<div className="page-index">

		<div className="header">

			<div className="header-title">
				<h1>{header}</h1>
			</div>

			<div className="header-button">
				{headerButton}
			</div>

		</div>

		<div className="content">
			{children}
		</div>
	</div>
);

export default PageWrapper;