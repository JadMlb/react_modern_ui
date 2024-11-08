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
	
	const [realValue, setRealValue] = useState (0);
	const [shownValue, setShownValue] = useState ("0");

	function valueChanged (newVal: number)
	{
		// only update if range is undefined, or the new value respects the boundaries of the range, when provided
		if (!range || (range[0] == null || newVal >= range[0]) && (range[1] == null || newVal <= range[1]))
		{
			setRealValue (newVal);
			setShownValue (newVal.toFixed (precision));
			if (onChange)
				onChange (newVal);
		}
	}

	function handleChange (e: React.ChangeEvent<HTMLInputElement>)
	{
		valueChanged (+e.target.value);
	}

	function inc ()
	{
		valueChanged (realValue + (step ?? 1));
	}

	function dec ()
	{
		valueChanged (realValue - (step ?? 1));
	}

	function handleClear (e: React.MouseEvent)
	{
		e.preventDefault();
		setRealValue (0);
		setShownValue ((0).toFixed (precision));
		if (onClear)
			onClear();
	}

	useEffect (
		() =>
		{
			const realInitVal = value !== undefined ? value : 0;
			setRealValue (realInitVal);
			setShownValue (realInitVal.toFixed (precision));
		},
		[value]
	);

	useEffect (
		() =>
		{
			if (validator)
				setIsError (!validator (realValue));
		},
		[realValue]
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
				style = {{minWidth: "3rem", width: `${shownValue.length}rem`}}
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