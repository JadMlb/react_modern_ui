import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { TOAST_TYPE_SYMBOL_MAP, ToastType } from "../../types/Toast";
import { colour, radius, spacing } from "../../styles/styles";
import { Colour } from "../../types/Colours";
import { ThemeType } from "../../types/theme";
import { useDarkMode, useTheme } from "../../styles/theme";
import { Button } from "../input";
import ProgressBar from "./progress_bar";

const ToastBackground = styled.div<{$type: ToastType, $isDark: boolean, $theme: ThemeType}>
`
	padding: ${spacing.xsmall};
	border-radius: ${radius.small};
	background-color: ${props => colour (props.$isDark ? "black" : "white", props.$theme)};
	box-shadow: ${props => colour ("gray", props.$theme)} 0px 1px 3px 0px;
	opacity: 0.99;
	position: relative;

	overflow: hidden;

	display: grid;
	grid-template-columns: 30px 1fr 30px;
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

	> button
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
	
	color: ${props => colour ("white", props.$theme)};
	font-weight: bold;
`;

const ProgressBarContainer = styled.div
`
	position: absolute;
	bottom: calc(-${spacing.xsmall} / 2 + 3px);
	left: 0;
	width: 100%;
`;

type ToastProps = {
	key?: number | string | bigint | null
	message: string,
	type?: ToastType,
	onClose?: () => void,
	/**
	 * Determines if the toast is automatically cleared after the value of `clearAfter`, or if it sticks until the close button in clicked. Defaults to `false`.
	 */
	autoClear?: boolean,
	/**
	 * Number of seconds after which the toast will automatically diappear if `autoClear` is enabled. Defaults to 5 seconds.
	 */
	clearAfter?: number
};

export default function Toast ({message, type = "info", onClose, autoClear, clearAfter = 5}: ToastProps)
{
	const {theme} = useTheme();
	const isDark = useDarkMode();

	const [countdown, setCountdown] = useState (100);

	useEffect (
		() =>
		{
			function decrementCountdown ()
			{
				setCountdown (old => Math.max (old - 1, 0));
			}

			if (autoClear && onClose)
			{	
				const timeoutId = setTimeout (onClose, clearAfter * 1000);
				const intervalId = setInterval (decrementCountdown, clearAfter * 10);

				return () => {clearTimeout (timeoutId); clearInterval (intervalId);};
			}

			return () => {};
		},
		[]
	);

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
			{
				autoClear &&
					<ProgressBarContainer>
						<ProgressBar percentage = {countdown} thin/>
					</ProgressBarContainer>
			}
			<Button rounded role = "alert" onClick = {onClose}>{TOAST_TYPE_SYMBOL_MAP["fail"].icon}</Button>
		</ToastBackground>
	);
}