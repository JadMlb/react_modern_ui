import React, { useEffect, useState } from "react";
import { useDarkMode, useThemeColours } from "../../../styles/theme";
import { TextInputProps } from "../../../types/input/text/TextInputProps";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Colour } from "../../../types";
import { radius, spacing } from "../../../styles/styles";
import EmailInputProps from "../../../types/input/text/EmailInputProps";
import PasswordInputProps from "../../../types/input/text/PasswordInputProps";
import ClearButton from "./clear_button";

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

const Small = styled.small<{$isDark: boolean, $colour: (col: Colour) => string}>
`
	color: ${props => props.$colour ("gray")};
`;

const ShowHide = styled.div<{$shown: boolean, $isDark: boolean, $colour: (col: Colour) => string}>
`
	margin-inline: ${spacing.small};
	cursor: pointer;
	width: 20px;
	height: 20px;
	background-color: ${props => props.$colour ("primary")};
	border: 1px solid ${props => props.$colour (props.$isDark ? "primaryDark" : "primaryElevated")};
	border-radius: ${radius.round};
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover
	{
		background-color: ${props => props.$colour ("primaryDark")};
	}

	&:before
	{
		content: "";
		display: block;
		width: 15px;
		height: 10px;
		background-color: ${props => props.$colour ("white")};
		border-radius: ${radius.round};
	}

	&:after
	{
		content: "";
		position: absolute;
		display: block;
		background-color: ${props => props.$colour ("black")};
		transition: .25s;
		${
			props => props.$shown ?
				`
					width: 2px;
					height: 20px;
					transform: rotate(45deg);
				`
				:
				`
					width: 7px;
					height: 7px;
					border-radius: ${radius.round};
				`
		}
	}
`;

export default function TextInput (props: (TextInputProps | EmailInputProps | PasswordInputProps) & {setIsError: React.Dispatch<React.SetStateAction<boolean>>})
{
	const {name, type, value, onChange, onClear, readonly, disabled, optional, validator, setIsError} = props;
	
	const isDark = useDarkMode();
	const colour = useThemeColours();
	
	const [shownValue, setShownValue] = useState (value ?? "");
	const [displayType, setDisplayType] = useState (type);

	function handleChange (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
	{
		try
		{
			setShownValue (e.target.value);
			if (onChange)
				onChange (e.target.value);
			if (validator)
				setIsError (!validator (e.target.value));
		}
		catch {}
	}

	function handleClear (e: React.MouseEvent)
	{
		e.preventDefault();
		setShownValue ("");
		if (onClear)
			onClear();
	}

	useEffect (
		() => {setShownValue (value ?? "")},
		[value]
	);

	return (
		<>
			{
				type === "text" && props.multiline ?
					<StyledTextArea
						id = {`${name}-${type}-input`}
						$isDark = {isDark}
						$colour = {colour}
						name = {name}
						rows = {1}
						placeholder = ""
						value = {shownValue}
						onChange = {handleChange}
						maxLength = {props.maxCharCount}
						readOnly = {readonly}
						disabled = {disabled}
					/> :
					<StyledTextInput
						id = {`${name}-${type}-input`}
						name = {name}
						type = {displayType}
						value = {shownValue}
						onChange = {handleChange}
						$isDark = {isDark}
						$colour = {colour}
						placeholder = ""
						maxLength = {type === "text" ? props.maxCharCount : undefined}
						readOnly = {readonly}
						disabled = {disabled}
					/>
			}
			{
				type === "text" && props.displayCharCount && props.maxCharCount !== undefined &&
					<Small $isDark = {isDark} $colour = {colour}>{shownValue.length}/{props.maxCharCount}</Small>
			}
			{
				type === "password" &&
					<ShowHide
						$shown = {displayType === "text"}
						$isDark = {isDark}
						$colour = {colour}
						onClick = {() => setDisplayType (old => old === "password" ? "text" : "password")}
					/>
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