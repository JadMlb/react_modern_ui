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
	/**
	 * The corner from which the toats are to appear. Any bottom corner will reverse the order of the toasts.
	 */
	position?: "top-left" | "top-right" | "bottom-left" | "bottom-right",
	/**
	 * The toasts to display
	 */
	data: ToastItem[],
	/**
	 * The handler function called to remove Toats from the list. When the `autoClear` flag is raised it is called automatically (rather than on the "close" button click).
	 * @param id The id of the toast to remove
	 */
	removeToast: (id: number) => void,
	/**
	 * Determines if the toast is automatically cleared after the value of `clearAfter`, or if it sticks until the close button in clicked. Defaults to `false`.
	 */
	autoClear?: boolean,
	/**
	 * The number of seconds after which the toast will automatically diappear if `autoClear` is enabled. Defaults to 5 seconds.
	 */
	clearAfter?: number
};

// code inspired by https://blog.logrocket.com/how-to-create-custom-toast-component-react/
/**
 * Establishes component to display toasts
 */
export default function Toaster ({position = "bottom-right", data, removeToast, autoClear, clearAfter = 5}: ToasterProps)
{
	// reverse order of toasts if from bottom
	const reversed = position.split("-")[0] === "bottom";
	const sortedData = reversed ? [...data].reverse() : [...data];
	
	return (
		<Container $position = {position}>
		{
			sortedData.length > 0 &&
				sortedData.map (
					(toast) => <Toast
									key = {toast.id}
									message = {toast.message}
									type = {toast.type}
									onClose = {() => removeToast (toast.id)}	
									autoClear = {autoClear}
									clearAfter = {clearAfter}
								/>
				)
		}
		</Container>
	);
}