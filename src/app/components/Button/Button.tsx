import React, { forwardRef } from 'react';
import classNames from 'classnames';


export enum ButtonStyle {
	GREEN = 'green',
	RED = 'red',
	BLUE = 'blue'
}

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	text?: number | string;
	Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string; }>;
	color?: ButtonStyle;
}

const Button = forwardRef<HTMLButtonElement, IButton>(
	({ text, Icon, color = ButtonStyle.GREEN, ...rest }, ref) => (
		<button
			{...rest}
			ref={ref}
			className={classNames("button", color)}
		>
			{text && <span>{text}</span>}
			{Icon && <Icon />}
		</button>
	));

export default Button;