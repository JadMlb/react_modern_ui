import React from "react";
import { NumberInputProps } from "../../types/NumberInputProps";
import { TextInputProps } from "../../types/TextInputProps";
import NumberInput from "./input_types/number";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { radius, spacing } from "../../styles/styles";
import { useDarkMode, useThemeColours } from "../../styles/theme";
import { Colour } from "../../types";
import TextInput from "./input_types/text";

const Container = styled.div<{$isDark: boolean, $colour: (col: Colour) => string}>
`
	display: flex;
	flex-wrap: no-wrap;
	align-items: center;

	overflow: hidden;
	border-radius: ${radius.normal};
	border: 1.5px solid ${props => props.$colour (props.$isDark ? "primaryDark" : "primaryElevated")};
	width: fit-content;
	min-width: 50px;
	min-height: 20px;

	background-color: ${props => props.$colour (props.$isDark ? "grayDark" : "grayLight")};
	color: ${props => props.$colour (props.$isDark ? "white" : "black")};

	margin-block: ${spacing.xsmall};

	&:has(input:not([type="number"])),
	&:has(textarea)
	{
		padding: ${spacing.xsmall};
		padding-top: ${spacing.normal};
	}

	position: relative;

	> label
	{
		font-size: 9pt;
		position: absolute;
		top: 0;
		left: ${spacing.xsmall};
		color: ${props => props.$colour (props.$isDark ? "accent" : "accentDark")};
		transition: 0.4s cubic-bezier(.4, 0, .2, 1);
	}

	input
	{
		all: unset;
		font: inherit;
	}

	label:has(+ input:not([type="number"]):placeholder-shown),
	label:has(+ textarea:placeholder-shown)
	{
		font-size: inherit;
		bottom: ${spacing.xsmall};
		margin-top: ${spacing.normal};
	}

	&:focus-within
	{
		border: 1.5px solid ${props => props.$colour ("primary")};
	}

	&:has(textarea)
	{
		resize: auto;
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
			case "text": return <TextInput {...props}/>;
			default: return <input/>;
		}
	}
	
	return (
		<Container $isDark = {isDark} $colour = {colour}>
			{!props.noLabel && <label>{props.label} {props.optional && "(optional)"}</label>}
			{getInputFromType()}
		</Container>
	);
	
}