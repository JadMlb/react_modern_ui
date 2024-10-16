import React, { useState } from "react";
import { NumberInputProps } from "../../types/NumberInputProps";
import { TextInputProps } from "../../types/TextInputProps";
import NumberInput from "./input_types/number";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { radius, spacing } from "../../styles/styles";
import { useDarkMode, useThemeColours } from "../../styles/theme";
import { Colour } from "../../types";
import TextInput from "./input_types/text";
import EmailInputProps from "../../types/EmailInputProps";
import PasswordInputProps from "../../types/PasswordInputProps";

const Wrapper = styled.div
`
	display: flex;
	flex-direction: column;
	margin-block: ${spacing.xsmall};
	width: fit-content;
`;

const Container = styled.div<{$disabled?: boolean, $isError: boolean, $isDark: boolean, $colour: (col: Colour) => string}>
`
	display: flex;
	flex-wrap: no-wrap;
	align-items: center;

	overflow: hidden;
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

export default function NewInput (props: NumberInputProps | TextInputProps | EmailInputProps | PasswordInputProps)
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
			default: return <input/>;
		}
	}
	
	return (
		<Wrapper>
			<Container $isDark = {isDark} $colour = {colour} $disabled = {props.disabled} $isError = {isError}>
				{!props.noLabel && <label>{props.label} {props.optional && "(optional)"}</label>}
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