import React, { useEffect, useState } from "react";
import { NumberInputProps } from "../../../types/input/number/NumberInputProps";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { radius } from "../../../styles/styles";
import { Colour } from "../../../types";
import { useDarkMode, useThemeColours } from "../../../styles/theme";
import TextInput from "./text";
import Button from "../button";

const Dash = styled.div<{$isDark: boolean, $colour: (col: Colour) => string}>
`
	position: relative;
	width: 25px;
	height: auto;
	aspect-ratio: 1 / 1;
	&:before
	{
		display: block;
		position: absolute;
		content: "";
		background-color: ${props => props.$colour (props.$isDark ? "white" : "black")};
		height: 1px;
		width: 100%;
		top: calc(50% - 0.5px);
	}
`;

const Plus = styled.div<{$isDark: boolean, $colour: (col: Colour) => string}>
`
	position: relative;
	width: 100%;
	height: auto;
	aspect-ratio: 1 / 1;
	&:before, &:after
	{
		display: block;
		position: absolute;
		content: "";
		background-color: ${props => props.$colour (props.$isDark ? "white" : "black")};
	}
	
	&:before
	{
		width: 1px;
		height: 100%;
		right: calc(50% - 0.5px);
	}

	&:after
	{
		height: 1px;
		width: 100%;
		top: calc(50% - 0.5px);
	}
`;

export default function NumberInput ({id, className, name, label, value, range, step, precision, hideLabel, hint, textOnError, leading, trailing, style, isError, onChange, readonly, disabled, optional}: NumberInputProps)
{	
	const isDark = useDarkMode();
	const colour = useThemeColours();
	const [error, setError] = useState (isError);
	
	const [realValue, setRealValue] = useState (0);
	const [shownValue, setShownValue] = useState ("0");

	function valueChanged (e: React.ChangeEvent | null, newVal: number)
	{
		// only update if range is undefined, or the new value respects the boundaries of the range, when provided
		if (!range || (range[0] == null || newVal >= range[0]) && (range[1] == null || newVal <= range[1]))
		{
			setRealValue (newVal);
			setShownValue (newVal.toFixed (precision));
			if (onChange)
				onChange (e, newVal);
		}
		else
			setError (true);
	}

	function handleChange (e: React.ChangeEvent | null, value: string)
	{
		e?.stopPropagation();
		e?.preventDefault();
		
		const number = +value;
		if (Number.isNaN (number))
			return;

		valueChanged (e, number);
	}

	function inc ()
	{
		valueChanged (null, realValue + (step ?? 1));
	}

	function dec ()
	{
		valueChanged (null, realValue - (step ?? 1));
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
	
	return (
		<TextInput
			id = {id}
			className = {className}
			name = {name}
			label = {label}
			type = "text"
			hint = {hint}
			isError = {error}
			textOnError = {textOnError}
			disabled = {disabled}
			hideLabel = {hideLabel}
			leading = {
				<>
					{leading}
					<Button
						style = {{width: "25px", height: "25px", borderRadius: radius.small}}
						onClick = {!disabled ? dec : undefined}
						disabled = {disabled}
						type = "outlined"
					>
						<Dash $isDark = {isDark} $colour = {colour}/>
					</Button>
				</>
			}
			trailing = {
				<>
					{trailing}
					<Button
						style = {{width: "25px", height: "25px", borderRadius: radius.small}}
						onClick = {!disabled ? inc : undefined}
						disabled = {disabled}
						type = "outlined"
					>
						<Plus $isDark = {isDark} $colour = {colour}/>
					</Button>
				</>
			}
			onChange = {handleChange}
			optional = {optional}
			readonly = {readonly}
			style = {{...style, width: "fit-content"}}
			value = {shownValue}
		/>
	);
}