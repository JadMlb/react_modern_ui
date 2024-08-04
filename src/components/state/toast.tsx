import React from "react";
import styled from "styled-components";
import { TOAST_TYPE_SYMBOL_MAP, ToastType } from "../../types/Toast";
import { Colour, colour, radius, spacing } from "../../styles/styles";
import ThemeType from "../../types/theme";
import { useDarkMode, useTheme } from "../../styles/theme";
import { Button } from "../input";

const ToastBackground = styled.div.attrs({"aria-roledescription": "alert"})<{$type: ToastType, $isDark: boolean, $theme: ThemeType}>
`
	padding: ${spacing.xsmall};
	border-radius: ${radius.small};
	background-color: ${props => colour (props.$isDark ? "black" : "white", props.$theme)};
	box-shadow: ${props => colour ("gray", props.$theme)} 0px 1px 3px 0px;
	opacity: 0.99;
	position: relative;

	display: flex;
	gap: ${spacing.small};
	align-items: center;

	&:hover
	{
		opacity: 1;
	}

	& + &
	{
		margin-top: ${spacing.small};
	}

	> :last-child
	{
		margin-left: auto;
	}
`;

const ToastIcon = styled.div<{$colour: string, $isDark: boolean, $theme: ThemeType}>
`
	width: 30px;
	height: 30px;
	
	display: flex;
	justify-content: center;
	align-items: center;
	
	background-color: ${props => colour (props.$colour + (props.$isDark ? "Dark" : "") as Colour, props.$theme)};
	border-radius: ${radius.round};
	
	color: ${props => colour (props.$isDark ? "black" : "white", props.$theme)};
	font-weight: bold;
`;

type ToastProps = {
	key?: number | string | bigint | null
	message: string,
	type?: ToastType,
	onClose?: () => void
};

export default function Toast ({message, type = "info", onClose}: ToastProps)
{
	const {theme} = useTheme();
	const isDark = useDarkMode();

	return (
		<ToastBackground $type = {type} $isDark = {isDark} $theme = {theme}>
			<ToastIcon
				$colour = {TOAST_TYPE_SYMBOL_MAP[type].colour}
				$isDark = {isDark}
				$theme = {theme}
			>
				{TOAST_TYPE_SYMBOL_MAP[type].icon}
			</ToastIcon>
			{message}
			<Button rounded role = "alert" onClick = {onClose}>{TOAST_TYPE_SYMBOL_MAP["fail"].icon}</Button>
		</ToastBackground>
	);
}