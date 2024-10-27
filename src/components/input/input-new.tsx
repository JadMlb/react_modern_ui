import React, { useState } from "react";
import { NumberInputProps } from "../../types/input/number/NumberInputProps";
import { TextInputProps } from "../../types/input/text/TextInputProps";
import NumberInput from "./input_types/number";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { radius, spacing } from "../../styles/styles";
import { useDarkMode, useThemeColours } from "../../styles/theme";
import { Colour } from "../../types";
import TextInput from "./input_types/text";
import EmailInputProps from "../../types/input/text/EmailInputProps";
import PasswordInputProps from "../../types/input/text/PasswordInputProps";
import DateInput from "./input_types/date";
import DateInputProps from "../../types/input/datetime/DateInputProps";
import DateTimeInputProps from "../../types/input/datetime/DateTimeInputProps";
import TimeInputProps from "../../types/input/datetime/TimeInputProps";

const Wrapper = styled.div
`
	display: flex;
	flex-direction: column;
	margin-block: ${spacing.xsmall};
	width: fit-content;
`;

const Container = styled.div<{$disabled?: boolean, $isError: boolean, $allowOverflow?: boolean, $isDark: boolean, $colour: (col: Colour) => string}>
`
	display: flex;
	flex-wrap: no-wrap;
	align-items: center;

	${props => !props.$allowOverflow && `overflow: hidden;`}
	border-radius: ${radius.normal};
	border: 1.5px solid ${props => props.$colour (props.$isError ? "error" : props.$isDark ? "primaryDark" : "primaryElevated")} ${props => props.$isError && "!important"};
	width: fit-content;
	min-width: 50px;
	min-height: 20px;

	background-color: ${props => props.$colour (props.$isDark ? "grayDark" : "grayLight")};
	color: ${props => props.$colour (props.$isDark ? "white" : "black")};

	&:has(input:not([type="number"])),
	&:has(textarea)
	{
		padding: ${spacing.xsmall};
		padding-top: ${spacing.normal};
	}

	${
		props =>
			props.$disabled &&
			`
				color: ${props.$colour ("gray")};
				background-color: unset;
			`
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
		-moz-user-select: none;
		-khtml-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
		cursor: text;
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

const Hint = styled.small<{$isError: boolean, $colour: (col: Colour) => string}>
`
	margin-left: ${spacing.small};
	color: ${props => props.$colour (props.$isError ? "error" : "gray")};
`;

type InputProps = NumberInputProps |
					TextInputProps |
					EmailInputProps |
					PasswordInputProps |
					DateInputProps |
					DateTimeInputProps |
					TimeInputProps;

export default function NewInput (props: InputProps)
{
	const colour = useThemeColours();
	const isDark = useDarkMode();
	
	const [isError, setIsError] = useState (props.validator && props.value ? !props.validator (props.value as never) : false);
	
	function getInputFromType ()
	{
		switch (props.type)
		{
			case "number": return <NumberInput {...props} setIsError = {setIsError}/>;
			case "text":
			case "email":
			case "password":
				return <TextInput {...props} setIsError = {setIsError}/>;
			case "date":
			case "datetime":
			case "time":
				return <DateInput {...props} setIsError = {setIsError}/>
			default: return <input/>;
		}
	}
	
	return (
		<Wrapper>
			<Container $isDark = {isDark} $colour = {colour} $disabled = {props.disabled} $isError = {isError} $allowOverflow = {["datetime", "date", "time"].includes (props.type)}>
				{!props.noLabel && <label htmlFor = {`${props.name}-${props.type}-input`}>{props.label} {props.optional && "(optional)"}</label>}
				{getInputFromType()}
			</Container>
			{
				props.hint &&
					<Hint $isError = {isError} $colour = {colour}>
						{isError ? props.textOnError : props.hint}
					</Hint>
			}
		</Wrapper>
	);	
}