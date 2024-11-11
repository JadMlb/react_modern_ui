import React, { useEffect, useMemo, useRef, useState } from "react";
import { spacing, useDarkMode, useThemeColours } from "../../../styles";
import { Colour } from "../../../types";
import FormattedNumberInputProps from "../../../types/input/number/FormattedNumberInputProps";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import ClearButton from "./clear_button";

const StyledNumberInput = styled.input<{$noLabel?: boolean, $isDark: boolean, $colour: (col: Colour) => string}>
`
	&::-webkit-inner-spin-button,
	&::-webkit-outer-spin-button
	{
		-webkit-appearance: none;
		margin: 0;
	}

	-moz-appearance: textfield;

	${props => !props.$noLabel && `margin-top: ${spacing.normal} !important;`}
	margin: unset !important;
`;

export default function FormattedNumberInput ({name, value, noLabel, pattern, onChange, onClear, readonly, disabled, optional, validator, setIsError}: FormattedNumberInputProps & {setIsError: React.Dispatch<React.SetStateAction<boolean>>})
{
	const isDark = useDarkMode();
	const colour = useThemeColours();

	const [heldValue, setHeldValue] = useState<(number | string)[]> ([]);

	const placeholderChar = useMemo (
		() => pattern.includes ("-") ? "_" : "-",
		[pattern]
	);

	const inputRef = useRef<HTMLInputElement> (null);
	const cursorPosition = useRef (0);
	const [shownValue, setShownValue] = useState ("");

	function addDigit (position: number, digit: number)
	{
		setHeldValue (
			old => old.map (
						(dig, i) =>
						{
							if (i === Math.max (0, position - 1) && (typeof old[i] === "number" || old[i] === placeholderChar))
								return digit;
							return dig;
						} 
					)
		);
	}

	function removeDigit (position: number)
	{
		setHeldValue (
			old => old.map (
				(dig, i) =>
				{
					if (i === position - 1 && typeof old[i] === "number")
						return placeholderChar;
					return dig;
				} 
			)
		);
	}

	function handleChange (e: React.KeyboardEvent<HTMLInputElement>)
	{
		if (e.key === "Backspace" && inputRef.current)
		{
			removeDigit (inputRef.current.selectionStart!);
			cursorPosition.current = inputRef.current.selectionStart! - 1;
		}
		else if (Number.isInteger (+e.key) && inputRef.current)
		{
			addDigit (inputRef.current.selectionStart!, +e.key);
			cursorPosition.current = inputRef.current.selectionStart! + 1;
		}
	}

	function handleClear (e: React.MouseEvent)
	{
		e.preventDefault();
		initHeldValue (true);
		if (onClear)
			onClear();
		if (validator)
			setIsError (validator (-1));
	}

	function initHeldValue (clear?: boolean)
	{
		const valDigits = value?.toString().split ("") ?? [];
		let curIdx = 0;
		setHeldValue (
			pattern.split ("")
					.map (
						char =>
						{
							if (!clear && curIdx < valDigits.length)
								return +valDigits[curIdx++];
							if (Number.isInteger (+char))
								return placeholderChar;
							return char;
						}
					)
		);
	}

	// init array
	useEffect (
		() =>  {initHeldValue();},
		[value]
	);

	useEffect (
		() => {setShownValue (heldValue.map(e => e.toString()).join (""))},
		[heldValue]
	);

	useEffect (
		() =>
		{
			inputRef.current?.setSelectionRange (cursorPosition.current, cursorPosition.current);
			const numericalValueDigits = heldValue.map (e => +e.toString())
											.filter (e => Number.isInteger (e));
			
			if (numericalValueDigits.length > 0)
			{
				const numericalValue = numericalValueDigits.reduce ((prev, cur) => 10 * prev + cur);
				if (onChange)
					onChange (numericalValue);
				if (validator)
					setIsError (!validator (numericalValue));
			}
		},
		[shownValue]
	);

	return (
		<>
			<StyledNumberInput
				ref = {inputRef}
				name = {name}
				type = "text"
				value = {shownValue}
				onKeyDown = {handleChange}
				$isDark = {isDark}
				$colour = {colour}
				readOnly = {readonly}
				disabled = {disabled}
				style = {{width: `${pattern.length}rem`}}
				$noLabel = {noLabel}
				// maxLength = {nbAllowedDigits}
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
		</>
	);
}