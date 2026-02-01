/** @jsxImportSource @emotion/react */
import { useMemo } from "react";
import { StaticStyle } from "../../../types";

interface InputHintProps
{
	hint?: string;
	hintStyle?: StaticStyle;
	isError?: boolean;
	textOnError?: string;
	errorTextStyle?: StaticStyle;
}

export default function InputHint ({hint, hintStyle, isError = false, textOnError, errorTextStyle}: InputHintProps)
{
	const shouldRender = useMemo (
		() => !!hint || isError && !!textOnError,
		[hint, isError, textOnError]
	);

	const css = useMemo (
		() => isError ? errorTextStyle : hintStyle,
		[isError, errorTextStyle, hintStyle]
	);

	return (
		<>{
			shouldRender &&
				<small css = {css}>
					{isError ? textOnError : hint}
				</small>
		}</>
	);
}