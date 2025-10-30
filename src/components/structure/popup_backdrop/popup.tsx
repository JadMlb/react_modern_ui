import DialogProps from "../../../types/components/Popups/DialogProps";
import PopupBackdrop from "./backdrop";
import PopupContainer from "./container";

interface PopupProps extends DialogProps
{
	position: "center" | "left" | "right";
	maxHeight?: boolean;
}

export default function Popup (props: PopupProps)
{
	const {open, onClose, backdropStyle, position, children, ...popupProps} = props;
	
	return (
		<PopupBackdrop
			open = {open}
			position = {position}
			onClose = {onClose}
			style = {backdropStyle}
		>
			<PopupContainer {...popupProps} position = {position}>
				{children}
			</PopupContainer>
		</PopupBackdrop>
	);
}