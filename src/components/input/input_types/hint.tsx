/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { ThemeColourFunction, spacing, useThemeColours } from "../../../styles";
import { useMemo } from "react";

const Text = styled.small<{$isError: boolean, $colour: ThemeColourFunction}>
`
	margin-left: ${spacing.small};
	color: ${props => props.$colour (props.$isError ? "error" : "gray")};
`;

interface InputHintProps
{
	hint?: string;
	isError?: boolean;
	textOnError?: string;
}

export default function InputHint ({hint, isError = false, textOnError}: InputHintProps)
{
	const getColour = useThemeColours();
	const shouldRender = useMemo (
		() => !!hint || isError && !!textOnError,
		[hint, isError, textOnError]
	);

	return (
		<>{
			shouldRender &&
				<Text $isError = {isError} $colour = {getColour}>
					{isError ? textOnError : hint}
				</Text>
		}</>
	);
}