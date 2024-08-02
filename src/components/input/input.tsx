import React, { useState } from "react";
import { css, styled } from "styled-components";
import { colour, radius, spacing } from "../../styles/styles";
import Button from "./button";
import { useDarkMode, useTheme } from "../../styles/theme";
import ThemeType from "../../types/theme";

type InputProps = {
	type: "text" | "password" | "number" | "datetime-local" | "mail",
	value: any,
	name: string,
	label?: string,
	onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
	onClear: () => void
	hideLabel?: boolean,
	wide?: boolean,
	long?: boolean,
	readonly?: boolean,
	optional?: boolean,
	displayCharCount?: boolean,
	maxCharCount?: number
};

const Container = styled.div<{$long?: boolean, $wide?: boolean}>
`
	position: relative;
	text-align: start;

	display: flex;
	${props => props.$long ? css `flex-direction: column-reverse;` : css `align-items: center;`}
	${props => props.$wide && css `width: 100%;`}

	> button:last-child
	{
		font-size: 9pt;
		position: absolute;
		right: ${spacing.xsmall};
	}
`;

const Label = styled.label<{$long?: boolean, $isDark: boolean, $theme: ThemeType}>
`
	position: absolute;
	${props => props.$long && css `top: ${spacing.xsmall};`}
	left: 0;
	margin-left: ${spacing.xsmall};
	pointer-events: none;
	transition: 0.4s cubic-bezier(.4, 0, .2, 1);
	color: ${props => colour (props.$isDark ? "gray" : "grayDark", props.$theme)};

	max-width: 60%;
`;

function getLabelAnimation (isDark: boolean, theme: ThemeType, isLong?: boolean)
{
	return css
	`
		&:not(:placeholder-shown) + ${Label},
		&:focus + ${Label}
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
	return css
	`
		all: unset;

		cursor: text;

		width: calc(100% - 2 * ${spacing.xsmall});
		background-color: ${colour (isDark ? "grayDark" : "grayLight", theme)};
		border: 2px solid ${colour (isDark ? "primaryDark" : "primaryElevated", theme)};

		padding: ${spacing.xsmall};
		${isPassword && css`padding-right: calc(2 * ${spacing.xsmall} + 20px)`};
		border-radius: ${radius.normal};
		transition: 0.4s cubic-bezier(.4, 0, .2, 1);

		&:focus
		{
			outline: none;
			border: 2px solid ${colour ("primary", theme)};
			${isPassword && css`padding-right: calc(2 * ${spacing.xsmall} + 20px)`};
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
				css
				`
					width: 2px;
					height: 20px;
					transform: rotate(45deg);
				`
				:
				css
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

export default function Input ({name, type, label, value, onChange, onClear, hideLabel, wide, long, readonly, optional, maxCharCount, displayCharCount}: InputProps)
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
		<Container $long = {long} $wide = {wide}>
			{
				long ?
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
			{!hideLabel && <Label $long = {long} $isDark = {isDark} $theme = {theme}>
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