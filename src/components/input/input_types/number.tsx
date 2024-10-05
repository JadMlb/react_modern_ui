import React, { useState } from "react";
import { NumberInputProps } from "../../../types/NumberInputProps";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { spacing } from "../../../styles/styles";
import { Colour } from "../../../types";
import { useDarkMode, useThemeColours } from "../../../styles/theme";

const Wrapper = styled.div
`
	display: flex;
	flex-wrap: no-wrap;
`;

const StyledNumberInput = styled.input<{$isDark: boolean, $colour: (col: Colour) => string}>
`
	&::-webkit-inner-spin-button,
	&::-webkit-outer-spin-button
	{
		-webkit-appearance: none;
		margin: 0;
	}

	-moz-appearance: textfield;
	border-right: 1px solid ${props => props.$colour ("gray")} !important;
`;

const Buttons = styled.div<{$isDark: boolean, $colour: (col: Colour) => string}>
`
	display: flex;
	flex-direction: column;
	height: calc(${spacing.xsmall} + ${spacing.normal} + 12pt + 9pt) !important;

	> button
	{
		width: calc(${spacing.xsmall} + 12pt);
		height: calc(${spacing.xsmall} + 12pt + 2px);
		padding: unset;
		padding-right: ${spacing.xxsmall};
		border: 1px solid transparent;
		background-color: ${props => props.$colour (props.$isDark ? "grayDark" : "grayLight")};
		color: ${props => props.$colour (props.$isDark ? "white" : "black")};
	}

	> button:hover
	{
		background-color: ${props => props.$colour (props.$isDark ? "accentDark" : "accentElevated")};
	}

	> button:first-child
	{
		border-bottom: 1px solid ${props => props.$colour ("gray")};
	}
`;

export default function NumberInput ({name, type, label, value, onChange, onClear, hideLabel, readonly, optional}: NumberInputProps)
{	
	const isDark = useDarkMode();
	const colour = useThemeColours();
	
	const [shownValue, setShownValue] = useState (value);

	function handleChange (e: React.ChangeEvent<HTMLInputElement>)
	{
		try
		{
			setShownValue (Number (e.target.value));
			onChange (e);
		}
		catch {}
	}

	function inc ()
	{
		setShownValue (old => old + 1);
	}

	function dec ()
	{
		setShownValue (old => old - 1);
	}
	
	return (
		<Wrapper>
			<StyledNumberInput
				type = {type}
				value = {shownValue}
				onChange = {handleChange}
				$isDark = {isDark}
				$colour = {colour}
			/>
			<Buttons $isDark = {isDark} $colour = {colour}>
				<button onClick = {inc}>+</button>
				<button onClick = {dec}>-</button>
			</Buttons>
		</Wrapper>
	);
}