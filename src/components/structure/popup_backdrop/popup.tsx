import { StaticStyle } from "../../../types";
import { DialogProps } from "../../../types/components/Popups/DialogProps";
import PopupBackdrop from "./backdrop";
import PopupContainer from "./container";

interface PopupProps extends DialogProps
{
	position: "center" | "left" | "right" | "bottom";
	forComponent: "dialog" | "drawer";
	backdropStyle?: StaticStyle;
	style?: StaticStyle;
}

export default function Popup ({forComponent, position, onClose, backdropStyle, children, open, ...popupProps}: PopupProps)
{
	return (
		<PopupBackdrop
			open = {open}
			onClose = {onClose}
			style = {backdropStyle}
		>
			<PopupContainer
				{...popupProps}
			>
				{children}
			</PopupContainer>
		</PopupBackdrop>
	);
}