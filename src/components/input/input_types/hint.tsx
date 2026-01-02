/** @jsxImportSource @emotion/react */
import { useMemo } from "react";
import { Style } from "../../../types";
import useStyle from "../../../hooks/useStyle";

interface InputHintProps
{
	hint?: string;
	hintStyle?: Style;
	isError?: boolean;
	textOnError?: string;
	errorTextStyle?: Style;
}

export default function InputHint ({hint, hintStyle, isError = false, textOnError, errorTextStyle}: InputHintProps)
{
	const normalCss = useStyle ("input.base", hintStyle, undefined, "hintStyle");
	const errorCss = useStyle ("input.base", errorTextStyle, undefined, "errorTextStyle");
	
	const shouldRender = useMemo (
		() => !!hint || isError && !!textOnError,
		[hint, isError, textOnError]
	);

	const css = useMemo (
		() => isError ? errorCss : normalCss,
		[isError]
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