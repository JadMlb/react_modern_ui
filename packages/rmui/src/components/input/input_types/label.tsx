/** @jsxImportSource @emotion/react */
import { StaticStyle } from "../../../types";

interface InputLabelProps
{
	children?: string;
	htmlFor?: string;
	style?: StaticStyle;
	hidden?: boolean;
}

export default function InputLabel ({children, hidden, htmlFor, style}: InputLabelProps)
{
	return (
		<>{
			!hidden && children &&
			<label
				htmlFor = {htmlFor}
				css = {style}
			>
				{children}
			</label>
		}</>
	);
}