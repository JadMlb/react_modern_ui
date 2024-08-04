import React from "react";
import styled, { keyframes } from "styled-components";
import { spacing } from "../../styles/styles";
import { ToastItem } from "../../types/Toast";
import Toast from "./toast";

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

	${props => `${props.$position.split("-")[0]}: 0;`}
	${props => `${props.$position.split("-")[1]}: 0;`}

	> *
	{
		animation: ${props => props.$position.split("-")[1] === "left" ? toastFromLeft : toastFromRight} ${ANIMATION_SPEED};
		transition: transform ${ANIMATION_SPEED}, opacity ${ANIMATION_SPEED}, box-shadow ${ANIMATION_SPEED} ease-in-out;
	}
`;

type ToasterProps = {
	position?: "top-left" | "top-right" | "bottom-left" | "bottom-right",
	data: ToastItem[],
	removeToast: (position: number) => void
};

// code inspired by https://blog.logrocket.com/how-to-create-custom-toast-component-react/
export default function Toaster ({position = "bottom-right", data, removeToast}: ToasterProps)
{
	// reverse order of toasts if from bottom
	const reversed = position.split("-")[0] === "bottom";
	const sortedData = reversed ? [...data].reverse() : [...data];
	
	return (
		<Container $position = {position}>
		{
			sortedData.length > 0 &&
				sortedData.map (
					(toast, idx) => <Toast
										key = {idx}
										message = {toast.message}
										type = {toast.type}
										onClose = {() => removeToast (reversed ? sortedData.length - idx - 1 : idx)}	
									/>
				)
		}
		</Container>
	);
}