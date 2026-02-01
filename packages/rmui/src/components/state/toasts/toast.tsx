import { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { type ToastIconType } from "../../../types/components/Toaster/Toast";
import { StaticStyle, ToasterProps } from "../../../types";
import ToastProgressBar from "./progress_bar";
import ToastIcon from "./toast_icon";
import ToastClearButton from "./clear_button";
import ToastBackground from "./background";

const ProgressBarContainer = styled.div
`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
`;

type ToastProps = {
	toasterPosition: Exclude<ToasterProps["position"], undefined>,
	onClose?: () => void,
	autoClear?: boolean,
	clearAfter?: number,
	children?: React.ReactNode,
	containerStyle?: StaticStyle,
	clearButton?: React.ReactNode,
	clearButtonStyle?: StaticStyle,
	progressBar?: React.ReactNode,
	progressBarStyle?: StaticStyle,
	iconContainerStyle?: StaticStyle,
	icon?: Partial<ToastIconType>
};

export default function Toast ({toasterPosition, onClose, autoClear, clearAfter = 5, containerStyle, clearButton, clearButtonStyle, icon, progressBar, progressBarStyle, iconContainerStyle, children}: ToastProps)
{
	const [countdown, setCountdown] = useState (100);
	const [isVisible, setIsVisible] = useState (true);

	function handleClose ()
	{
		setIsVisible (false);
	}

	useEffect (
		() =>
		{
			function decrementCountdown ()
			{
				setCountdown (old => Math.max (old - 1, 0));
			}

			if (autoClear && onClose)
			{	
				const timeoutId = setTimeout (handleClose, clearAfter * 1000);
				const intervalId = setInterval (decrementCountdown, clearAfter * 10);

				return () =>
				{
					clearTimeout (timeoutId);
					clearInterval (intervalId);
				};
			}

			return () => {};
		},
		[]
	);

	return (
		<ToastBackground
			style = {containerStyle}
			toasterPosition = {toasterPosition}
			visible = {isVisible}
			onAnimationEnd = {onClose}
		>
			<ToastIcon icon = {icon} style = {iconContainerStyle}/>
			{children}
			{
				autoClear &&
					<ProgressBarContainer>{
						progressBar ??
						<ToastProgressBar percentage = {countdown} thin style = {progressBarStyle}/>
					}</ProgressBarContainer>
			}
			{
				clearButton ??
				<ToastClearButton onClose = {onClose} style = {clearButtonStyle} />
			}
		</ToastBackground>
	);
}