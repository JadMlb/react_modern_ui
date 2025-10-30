import React, { useMemo } from "react";
import { Button } from "../../input";
import X from "../../input/input_types/combobox/x";
import { Style } from "../../../styles";

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
	title?: React.ReactNode;
	noCloseButton?: boolean;
	children?: React.ReactNode;
}

export default function DrawerHeader ({title, noCloseButton, onClose, children}: DrawerHeaderProps)
{
	const closeButtonAllowed = useMemo (
		() => !noCloseButton,
		[noCloseButton]
	);

	return (
		<>
			<span>{title && closeButtonAllowed ? title : ""}</span>
			{children}
			{closeButtonAllowed && <CloseButton onClose = {onClose}/>}
		</>
	);
}