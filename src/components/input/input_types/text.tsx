import React, { useEffect, useState } from "react";
import { useDarkMode, useThemeColours } from "../../../styles/theme";
import { TextInputProps } from "../../../types/input/text/TextInputProps";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Colour } from "../../../types";
import { radius, spacing } from "../../../styles/styles";
import EmailInputProps from "../../../types/input/text/EmailInputProps";
import PasswordInputProps from "../../../types/input/text/PasswordInputProps";
import InputBase from "./input_base";
import X from "./combo_components/x";

const StyledTextInput = styled.input
`
	all: unset;
	font: inherit;
	width: 100%;
`;

const StyledTextArea = styled.textarea
`
	all: unset;
	font: inherit;
	width: 100%;
	resize: vertical;
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
	display: flex;
	justify-content: center;
	align-items: center;

	&:before
	{
		content: "";
		display: block;
		width: 15px;
		height: 10px;
		border: 1px solid ${props => props.$colour (props.$isDark ? "white" : "black")};
		border-radius: ${radius.round};
	}

	&:after
	{
		content: "";
		position: absolute;
		display: block;
		background-color: ${props => props.$colour (props.$isDark ? "white" : "black")};
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

export default function TextInput (props: (TextInputProps | EmailInputProps | PasswordInputProps))
{
	const {id, className, name, label, type, value, leading, trailing, style, onChange, readonly, disabled, optional, hideLabel, hint, textOnError, isError} = props;
	
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
				onChange (e, e.target.value);
		}
		catch {}
	}

	function handleClear ()
	{
		setShownValue ("");
		onChange?. (null, "");
	}

	useEffect (
		() => {setShownValue (value ?? "")},
		[value]
	);

	return (
		<InputBase
			id = {id}
			className = {className}
			inputId = {`${name}-${type}-input`}
			hideLabel = {hideLabel}
			hint = {hint}
			textOnError = {textOnError}
			label = {label}
			trailing = {
				<div style = {{display: "flex", gap: spacing.small, alignItems: "center"}}>
					{trailing}
					{
						type === "text" && props.multiline && props.maxCharCount !== undefined &&
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
					{optional && <X onClick = {handleClear}/>}
				</div>
			}
			isError = {isError}
			style = {style}
			disabled = {disabled}
			readonly = {readonly}
		>
			{leading}
			{
				type === "text" && props.multiline ?
				<StyledTextArea
					id = {`${name}-${type}-input`}
					name = {name}
					rows = {props.rows ?? 2}
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
					maxLength = {type === "text" ? props.maxCharCount : undefined}
					readOnly = {readonly}
					disabled = {disabled}
				/>
			}
		</InputBase>
	);
}