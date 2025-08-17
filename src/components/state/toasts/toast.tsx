import { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { type ToastIconType, ToastType } from "../../../types/components/Toaster/Toast";
import { Style } from "../../../styles/theme";
import ProgressBar from "../progress_bar";
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
	type?: ToastType,
	onClose?: () => void,
	autoClear?: boolean,
	clearAfter?: number,
	children?: React.ReactNode,
	containerStyle?: Style,
	clearButton?: React.ReactNode,
	clearButtonStyle?: Style,
	progressBar?: React.ReactNode,
	progressBarStyle?: Style,
	icon?: ToastIconType
};

export default function Toast ({type = "info", onClose, autoClear, clearAfter = 5, containerStyle, clearButton, clearButtonStyle, icon, progressBar, progressBarStyle, children}: ToastProps)
{
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
		<ToastBackground style = {containerStyle}>
			<ToastIcon type = {type} icon = {icon}/>
			{children}
			{
				autoClear &&
					<ProgressBarContainer>{
						progressBar ??
						<ProgressBar percentage = {countdown} thin style = {progressBarStyle}/>
					}</ProgressBarContainer>
			}
			{
				clearButton ??
				<ToastClearButton onClose = {onClose} style = {clearButtonStyle} />
			}
		</ToastBackground>
	);
}