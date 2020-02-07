import React, { forwardRef } from 'react';
import classNames from 'classnames';


export enum IButtonStyle {
	GREEN = 'green',
	RED = 'red',
	BLUE = 'blue'
}

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	text?: number | string;
	icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
	color?: IButtonStyle;
}

const Button = forwardRef<HTMLButtonElement, IButton>(
	({ text, icon, color = IButtonStyle.GREEN, ...rest }, ref) => (
		<button
			{...rest}
			ref={ref}
			className={classNames("button", color)}
		>
			{text}
			{icon}
		</button>
	));

export default Button;