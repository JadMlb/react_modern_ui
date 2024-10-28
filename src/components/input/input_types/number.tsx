import React, { useEffect, useState } from "react";
import { NumberInputProps } from "../../../types/input/number/NumberInputProps";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { spacing } from "../../../styles/styles";
import { Colour } from "../../../types";
import { useDarkMode, useThemeColours } from "../../../styles/theme";

const StyledNumberInput = styled.input<{$noLabel?: boolean, $isDark: boolean, $colour: (col: Colour) => string}>
`
	&::-webkit-inner-spin-button,
	&::-webkit-outer-spin-button
	{
		-webkit-appearance: none;
		margin: 0;
	}

	-moz-appearance: textfield;

	margin: ${spacing.xsmall} !important;
	${props => !props.$noLabel && `margin-top: ${spacing.normal} !important;`}
	margin-right: unset !important;
`;

const Buttons = styled.div<{$disabled?: boolean, $isDark: boolean, $colour: (col: Colour) => string}>
`
	position: relative;
	display: flex;
	flex-direction: column;

	> button
	{
		width: calc(${spacing.xsmall} + 12pt);
		height: 50%;
		padding: unset;
		padding-right: ${spacing.xxsmall};
		border: 1px solid transparent;
		border-left: 1px solid ${props => props.$colour ("gray")};
		background-color: ${props => props.$colour (props.$isDark ? "grayDark" : "grayLight")};
		color: ${props => props.$colour (props.$isDark ? "white" : "black")};
		
		/* disable text select in buttons */
		-moz-user-select: none;
		-khtml-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;

		${
			props => props.$disabled &&
				`
					background-color: unset;
					color: ${props.$colour ("gray")};
				`
		}
	}

	> button:hover
	{
		background-color: ${props => props.$colour (props.$isDark ? "accentDark" : "accentElevated")};
		${
			props => props.$disabled &&
				`
					background-color: unset;
				`
		}
	}

	> button:first-child
	{
		border-bottom: 1px solid ${props => props.$colour ("gray")};
	}
`;

const ClearButton = styled.button<{$isDark: boolean, $colour: (col: Colour) => string}>
`
	all: unset;
	margin-inline: ${spacing.small};

	&:hover
	{
		color: ${props => props.$colour ("error")};
	}
`;

export default function NumberInput ({name, type, value, range, step, precision, noLabel, onChange, onClear, readonly, disabled, optional, validator, setIsError}: NumberInputProps & {setIsError: React.Dispatch<React.SetStateAction<boolean>>})
{	
	const isDark = useDarkMode();
	const colour = useThemeColours();
	
	const [realValue, setRealValue] = useState (value);
	const [shownValue, setShownValue] = useState (value.toFixed (precision));

	function valueChanged (newVal: number)
	{
		// only update if range is defined, or the new value respects the boundaries of the range, when provided
		if (!range || (range[0] == null || newVal >= range[0]) && (range[1] == null || newVal <= range[1]))
		{
			setRealValue (newVal);
			setShownValue (newVal.toFixed (precision));
			if (onChange)
				onChange (newVal);
			if (validator)
				setIsError (!validator (newVal));
		}
	}

	function handleChange (e: React.ChangeEvent<HTMLInputElement>)
	{
		try
		{
			valueChanged (+e.target.value);
		}
		catch {}
	}

	function inc ()
	{
		valueChanged (realValue + (step ?? 1));
	}

	function dec ()
	{
		valueChanged (realValue - (step ?? 1));
	}

	function handleClear ()
	{
		setRealValue (0);
		setShownValue ("0");
		if (onClear)
			onClear();
		if (validator)
			setIsError (validator (0));
	}

	useEffect (
		() => {setShownValue (value.toFixed (precision))},
		[value]
	);
	
	return (
		<>
			<StyledNumberInput
				name = {name}
				type = {type}
				value = {shownValue}
				onChange = {handleChange}
				$isDark = {isDark}
				$colour = {colour}
				readOnly = {readonly}
				disabled = {disabled}
				style = {{width: `${shownValue.length}rem`}}
				$noLabel = {noLabel}
			/>
			{
				optional &&
					<ClearButton
						$isDark = {isDark}
						$colour = {colour}
						onClick = {handleClear}
					>
						&#10005;
					</ClearButton>
			}
			<Buttons $isDark = {isDark} $colour = {colour} $disabled = {disabled}>
				<button onClick = {!disabled ? inc : undefined}>+</button>
				<button onClick = {!disabled ? dec : undefined}>-</button>
			</Buttons>
		</>
	);
}