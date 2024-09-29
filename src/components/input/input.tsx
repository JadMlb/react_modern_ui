import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { colour, radius, spacing } from "../../styles/styles";
import Button from "./button";
import { useDarkMode, useTheme } from "../../styles/theme";
import { ThemeType } from "../../types/theme";

type InputProps = {
	key?: string | number | bigint | null,
	/**
	 * The type of the input, either text, password, number, mail or datetime. For these types, the same naming is used as for the types of raw html input tag.
	 */
	type: "text" | "password" | "number" | "datetime-local" | "mail",
	/**
	 * The current value of this input
	 */
	value: any,
	/**
	 * The name of the field that contains the value of this input. If no label is provided, the provided `name` property will be used as a label with the first letter capitalized.
	 */
	name: string,
	/**
	 * The label to be displayed on this input. If no label is provided, the provided `name` property will be used as a label with the first letter capitalized.
	 */
	label?: string,
	/**
	 * Change event handler fired when typing
	 */
	onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
	/**
	 * Change event handler fired when the clear button is clicked
	 */
	onClear: () => void
	/**
	 * Hides the label of the input
	 */
	hideLabel?: boolean,
	/**
	 * Specifies whether this input should occupy 100% of its parent's width or not. Defaults to `false`.
	 */
	wide?: boolean,
	/**
	 * Switches to multiline mode, i.e. turns this input into a textarea. Defaults to `false`.
	 */
	multiline?: boolean,
	/**
	 * Disables editing of this input even if no value is provided. Defaults to `false`.
	 */
	readonly?: boolean,
	/**
	 * Adds "optional" to the end of the label & enables clearing the value. Defaults to `false`.
	 */
	optional?: boolean,
	/**
	 * Shows the current and the max number of characters allowed. Only works if `maxCharCount` property is set. Defaults to `false`.
	 */
	displayCharCount?: boolean,
	/**
	 * Sets the max number of characters in this input
	 */
	maxCharCount?: number
};

const Container = styled.div<{$multiline?: boolean, $wide?: boolean}>
`
	position: relative;
	text-align: start;

	display: flex;
	${props => props.$multiline ? `flex-direction: column-reverse;` : `align-items: center;`}
	${props => props.$wide && `width: 100%;`}

	> button:last-child
	{
		font-size: 9pt;
		position: absolute;
		right: ${spacing.xsmall};
	}
`;

const Label = styled.label<{$multiline?: boolean, $isDark: boolean, $theme: ThemeType}>
`
	position: absolute;
	${props => props.$multiline && `top: ${spacing.xsmall};`}
	left: 0;
	margin-left: ${spacing.xsmall};
	pointer-events: none;
	transition: 0.4s cubic-bezier(.4, 0, .2, 1);
	color: ${props => colour (props.$isDark ? "gray" : "grayDark", props.$theme)};

	max-width: 60%;
`;

function getLabelAnimation (isDark: boolean, theme: ThemeType, isLong?: boolean)
{
	return `
		&:not(:placeholder-shown) + label,
		&:focus + label
		{
			transform: translateY(calc(-${isLong ? 5.5 : 11.5}pt - ${spacing.small} / 2));
			margin-left: calc(${spacing.small} - ${spacing.xsmall} / 2);
			padding-left: calc(${spacing.xsmall} / 2);
			padding-right: ${spacing.xsmall};
			font-size: 9pt;
			font-weight: bold;
			color: ${colour (isDark ? "primaryElevated" : "primary", theme)};
			background-image: linear-gradient(to bottom, ${colour (isDark ? "black" : "white", theme)} 50%, ${colour (isDark ? "grayDark" : "grayLight", theme)} 50%);
		}

		&:disabled + ${Label}
		{
			background-image: linear-gradient(to bottom, ${colour (isDark ? "black" : "white", theme)} 50%, ${colour (isDark ? "black" : "white", theme)} 50%);
		}
	`;
}

function getStyles (isDark: boolean, theme: ThemeType, isLong?: boolean, isPassword?: boolean)
{
	return `
		all: unset;

		cursor: text;

		width: calc(100% - 2 * ${spacing.xsmall});
		background-color: ${colour (isDark ? "grayDark" : "grayLight", theme)};
		border: 2px solid ${colour (isDark ? "primaryDark" : "primaryElevated", theme)};

		padding: ${spacing.xsmall};
		${isPassword && `padding-right: calc(2 * ${spacing.xsmall} + 20px)`};
		border-radius: ${radius.normal};
		transition: 0.4s cubic-bezier(.4, 0, .2, 1);

		&:focus
		{
			outline: none;
			border: 2px solid ${colour ("primary", theme)};
			${isPassword && `padding-right: calc(2 * ${spacing.xsmall} + 20px)`};
		}

		&:disabled
		{
			box-shadow: unset;
			border-color: ${colour (isDark ? "grayDark" : "grayLight", theme)};
			background-color: ${colour (isDark ? "black" : "white", theme)};
			color: ${colour ("gray", theme)};
		}

		${getLabelAnimation (isDark, theme, isLong)}
	`;
}

const StyledInput = styled.input<{$password?: boolean, $isDark: boolean, $theme: ThemeType}>
`
	${props => getStyles (props.$isDark, props.$theme, false, props.$password)}
`;

const ShowHide = styled.div<{$shown: boolean, $isDark: boolean, $theme: ThemeType}>
`
	position: absolute;
	right: ${spacing.xsmall};
	cursor: pointer;
	width: 20px;
	height: 20px;
	background-color: ${props => colour ("primary", props.$theme)};
	border: 1px solid ${props => colour (props.$isDark ? "primaryDark" : "primaryElevated", props.$theme)};
	border-radius: ${radius.round};
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover
	{
		background-color: ${props => colour ("primaryDark", props.$theme)};
	}

	&:before
	{
		content: "";
		display: block;
		width: 15px;
		height: 10px;
		background-color: ${props => colour ("white", props.$theme)};
		border-radius: ${radius.round};
	}

	&:after
	{
		content: "";
		position: absolute;
		display: block;
		background-color: ${props => colour ("black", props.$theme)};
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

const TextArea = styled.textarea<{$isDark: boolean, $theme: ThemeType}>
`
	${props => getStyles (props.$isDark, props.$theme, true)}
`;

const Small = styled.span
`
	font-size: 7pt;
	font-weight: normal;
`;

const CharCounterDisplay = styled.span
`
	position: absolute;
	bottom: ${spacing.xsmall};
	right: ${spacing.xsmall};
	font-weight: bold;
	cursor: default;
`;

export default function Input ({name, type, label, value, onChange, onClear, hideLabel, wide, multiline, readonly, optional, maxCharCount, displayCharCount}: InputProps)
{
	const [displayType, setDisplayType] = useState (type);
	const {theme} = useTheme();
	const isDark = useDarkMode();
	
	function togglePassVisibility ()
	{
		if (type === "password")
		{
			setDisplayType (old => old === "password" ? "text" : "password");
		}
	}
	
	return (
		<Container $multiline = {multiline} $wide = {wide}>
			{
				multiline ?
					<TextArea
						$isDark = {isDark}
						$theme = {theme}
						name = {name}
						value = {value}
						onChange = {onChange}
						placeholder = ""
						disabled = {readonly}
						rows = {6}
						maxLength = {maxCharCount}
					/> :
					<StyledInput
						$isDark = {isDark}
						$theme = {theme}
						name = {name}
						type = {displayType}
						value = {displayType === "datetime-local" ? value?.split("+")[0] : value}
						onChange = {onChange}
						placeholder = ""
						$password = {type === "password"}
						disabled = {readonly}
						maxLength = {maxCharCount}
					/>
			}
			{!hideLabel && <Label $multiline = {multiline} $isDark = {isDark} $theme = {theme}>
								{label ?? (name.charAt(0).toUpperCase() + name.slice (1))}
								<Small>{optional && !readonly && ` (optional)`}</Small>
							</Label>}
			{
				type === "password" &&
					<ShowHide
						$isDark = {isDark}
						$theme = {theme}
						onClick = {togglePassVisibility}
						$shown = {type === "password" && displayType === "text"}
					/>
			}
			{
				displayCharCount && maxCharCount !== undefined &&
					<CharCounterDisplay><Small>{value ? value.length : 0}/{maxCharCount}</Small></CharCounterDisplay>
			}
			{
				value !== "" && !readonly && optional && 
					<Button
						role = "transparent"
						onClick = {onClear}
					>
						&#x2715;
					</Button>
			}
		</Container>
	);
}