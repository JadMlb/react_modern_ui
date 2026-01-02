/** @jsxImportSource @emotion/react */
import { Style } from "../../../types";
import useStyle from "../../../hooks/useStyle";
import { useMemo } from "react";

interface InputLabelProps
{
	children?: string;
	htmlFor?: string;
	style?: Style;
	hidden?: boolean;
	disabled?: boolean;
}

export default function InputLabel ({children, disabled, hidden, htmlFor, style}: InputLabelProps)
{
	const injectedStyles = useMemo (
		() => ({
			color: disabled ? "gray" : "inherit"
		}),
		[disabled]
	);
	const css = useStyle ("input.base", style, injectedStyles, "labelStyle");
	
	return (
		<>{
			!hidden && children &&
			<label
				htmlFor = {htmlFor}
				css = {css}
			>
				{children}
			</label>
		}</>
	);
}