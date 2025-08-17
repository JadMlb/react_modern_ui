/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { spacing } from "../../../styles/styles";
import Toast from "./toast";
import ToasterProps from "../../../types/components/Toaster/ToasterProps";
import { useToasts } from "./toasts_context";

const toastFromRight = keyframes
`
	from
	{
		transform: translateX(100%);
	}
	to
	{
		transform: translateX(0);
	}
`;

const toastFromLeft = keyframes
`
	from
	{
		transform: translateX(-100%);
	}
	to
	{
		transform: translateX(0);
	}
`;

const ANIMATION_SPEED = "250ms";

const Container = styled.div<{$position: "top-left" | "top-right" | "bottom-left" | "bottom-right"}>
`
	position: fixed;
	padding: ${spacing.small};
	width: 100%;
	max-width: 400px;
	max-height: 100vh;
	overflow: hidden auto;

	display: flex;
	flex-direction: column${props => props.$position.startsWith ("bottom") ? "-reverse" : ""};
	gap: ${spacing.normal};

	${props => `${props.$position.split("-")[0]}: 0;`}
	${props => `${props.$position.split("-")[1]}: 0;`}

	> *
	{
		animation: ${props => props.$position.split("-")[1] === "left" ? toastFromLeft : toastFromRight} ${ANIMATION_SPEED};
		transition: transform ${ANIMATION_SPEED}, opacity ${ANIMATION_SPEED}, box-shadow ${ANIMATION_SPEED} ease-in-out;
	}
`;

// code inspired by https://blog.logrocket.com/how-to-create-custom-toast-component-react/
/**
 * Establishes component to display toasts
 */
export default function Toaster ({position = "bottom-right", autoClear, clearAfter = 5, containerStyle, clearButton, clearButtonStyle, icons, progressBar, progressBarStyle}: ToasterProps)
{
	const {toasts, clearToast} = useToasts();
	
	return (
		<Container $position = {position}>{
			toasts.length > 0 &&
			toasts.map (
				toast => <Toast
							key = {toast.id}
							type = {toast.type}
							onClose = {() => clearToast (toast.id)}	
							autoClear = {autoClear}
							clearAfter = {clearAfter}
							containerStyle = {containerStyle}
							clearButton = {clearButton}
							clearButtonStyle = {clearButtonStyle}
							icon = {icons?.[toast.type ?? "info"]}
							progressBar = {progressBar}
							progressBarStyle = {progressBarStyle}
						>
							{toast.contents}
						</Toast>
			)
		}</Container>
	);
}