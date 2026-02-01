import { useCallback, useEffect, useState } from "react";
import { StaticStyle } from "../../../types";
import { DialogProps } from "../../../types/components/Popups/DialogProps";
import PopupBackdrop from "./backdrop";
import PopupContainer from "./container";

interface PopupProps extends DialogProps
{
	position: "center" | "left" | "right" | "bottom";
	backdropStyle?: StaticStyle;
	style?: StaticStyle;
}

export default function Popup ({onClose, backdropStyle, children, open, ...popupProps}: PopupProps)
{
	const [isReallyOpen, setIsReallyOpen] = useState (open);

	const handleCloseRequest = useCallback (
		() =>
		{
			onClose?.();
		},
		[onClose]
	);
	
	const handleClose = useCallback (
		() =>
		{
			setIsReallyOpen (false);
		},
		[setIsReallyOpen]
	);

	useEffect (
		() =>
		{
			if (open)
				setIsReallyOpen (true);
		},
		[open]
	);
	
	return (
		<PopupBackdrop
			open = {isReallyOpen}
			onClose = {handleCloseRequest}
			style = {backdropStyle}
		>
			<PopupContainer
				open = {open}
				onAnimationEnd = {handleClose}
				{...popupProps}
			>
				{children}
			</PopupContainer>
		</PopupBackdrop>
	);
}