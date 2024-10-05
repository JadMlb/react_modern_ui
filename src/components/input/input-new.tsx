import React from "react";
import { NumberInputProps } from "../../types/NumberInputProps";
import { TextInputProps } from "../../types/TextInputProps";
import NumberInput from "./input_types/number";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { radius, spacing } from "../../styles/styles";
import { useDarkMode, useThemeColours } from "../../styles/theme";
import { Colour } from "../../types";

const Container = styled.div<{$isDark: boolean, $colour: (col: Colour) => string}>
`
	overflow: hidden;
	border-radius: ${radius.normal};
	border: 1.5px solid ${props => props.$colour (props.$isDark ? "primaryDark" : "primaryElevated")};
	width: fit-content;

	margin-block: ${spacing.xsmall};

	position: relative;

	> label
	{
		font-size: 9pt;
		position: absolute;
		top: 0;
		left: ${spacing.xsmall};
		color: ${props => props.$colour (props.$isDark ? "accent" : "accentDark")};
	}

	input
	{
		font: inherit;
		padding: ${spacing.xsmall};
		padding-top: ${spacing.normal};
		border: unset;
		
		background-color: ${props => props.$colour (props.$isDark ? "grayDark" : "grayLight")};
		color: ${props => props.$colour (props.$isDark ? "white" : "black")};

		&:focus
		{
			outline: none;
		}
	}

	&:focus-within
	{
		border: 1.5px solid ${props => props.$colour ("primary")};
	}
`;

export default function NewInput (props: NumberInputProps | TextInputProps)
{
	const colour = useThemeColours();
	const isDark = useDarkMode();
	
	function getInputFromType ()
	{
		switch (props.type)
		{
			case "number": return <NumberInput {...props}/>;
			default: return <input/>;
		}
	}
	
	return (
		<Container $isDark = {isDark} $colour = {colour}>
			<label>{props.label}</label>
			{getInputFromType()}
		</Container>
	);
	
}