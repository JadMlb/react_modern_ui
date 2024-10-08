import React, { useState } from "react";
import { useDarkMode, useThemeColours } from "../../../styles/theme";
import { TextInputProps } from "../../../types/TextInputProps";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Colour } from "../../../types";
import { spacing } from "../../../styles/styles";

const StyledTextInput = styled.input<{$isDark: boolean, $colour: (col: Colour) => string}>
`
	
`;

const StyledTextArea = styled.textarea<{$isDark: boolean, $colour: (col: Colour) => string}>
`
	all: unset;
	font: inherit;
	flex-grow: 4;
	align-self: stretch;
`;

const ClearButton = styled.button<{$isDark: boolean, $colour: (col: Colour) => string}>
`
	all: unset;
	margin-inline: ${spacing.small};

	&:hover
	{
		color: ${props => props.$colour ("error")};
	}

	align-self: start;
`;

const Small = styled.small<{$isDark: boolean, $colour: (col: Colour) => string}>
`
	color: ${props => props.$colour ("gray")};
`;

export default function TextInput ({name, type, value, onChange, onClear, multiline, readonly, disabled, optional, maxCharCount, displayCharCount}: TextInputProps)
{
	const isDark = useDarkMode();
	const colour = useThemeColours();
	
	const [shownValue, setShownValue] = useState (value);

	function handleChange (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
	{
		try
		{
			setShownValue (e.target.value);
			if (onChange)
				onChange (e.target.value);
		}
		catch {}
	}

	function handleClear ()
	{
		setShownValue ("");
		if (onClear)
			onClear();
	}

	return (
		<>
			{
				multiline ?
					<StyledTextArea
						$isDark = {isDark}
						$colour = {colour}
						name = {name}
						rows = {1}
						placeholder = ""
						value = {shownValue}
						onChange = {handleChange}
						maxLength = {maxCharCount}
						readOnly = {readonly}
						disabled = {disabled}
					/> :
					<StyledTextInput
						name = {name}
						type = {type}
						value = {shownValue}
						onChange = {handleChange}
						$isDark = {isDark}
						$colour = {colour}
						placeholder = ""
						maxLength = {maxCharCount}
						readOnly = {readonly}
						disabled = {disabled}
					/>
			}
			{
				displayCharCount && maxCharCount !== undefined &&
					<Small $isDark = {isDark} $colour = {colour}>{shownValue.length}/{maxCharCount}</Small>
			}
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