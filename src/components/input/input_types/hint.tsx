/** @jsxImportSource @emotion/react */
import { useThemeParser } from "../../../styles";
import { useMemo } from "react";

interface InputHintProps
{
	hint?: string;
	isError?: boolean;
	textOnError?: string;
}

export default function InputHint ({hint, isError = false, textOnError}: InputHintProps)
{
	const parseCss = useThemeParser();
	const css = useMemo (
		() => parseCss ({
			marginLeft: "spacing.small",
			color: isError ? "error" : "gray"
		}),
		[parseCss, isError]
	);
	const shouldRender = useMemo (
		() => !!hint || isError && !!textOnError,
		[hint, isError, textOnError]
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