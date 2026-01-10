import React, { useMemo } from "react";
import { Button } from "../../input";
import X from "../../input/input_types/x";
import { Style } from "../../../types";

interface OnCloseButtonProps
{
	onClose?: () => void;
}

const CLOSE_BUTTON_STYLE = {
	width: 25,
	height: 25,
	borderRadius: "radius.round"
} satisfies Style;

function CloseButton ({onClose}: OnCloseButtonProps)
{
	return (
		<Button
			style = {CLOSE_BUTTON_STYLE}
			onClick = {onClose}
			role = "alert"
		>
			<X/>
		</Button>
	);
}

interface DrawerHeaderProps extends OnCloseButtonProps
{
	noCloseButton?: boolean;
	children?: React.ReactNode;
}

export default function DrawerHeader ({noCloseButton, onClose, children}: DrawerHeaderProps)
{
	const closeButtonAllowed = useMemo (
		() => !noCloseButton,
		[noCloseButton]
	);

	return (
		<>
			{children}
			{closeButtonAllowed && <CloseButton onClose = {onClose}/>}
		</>
	);
}