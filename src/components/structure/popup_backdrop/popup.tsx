import useProps from "../../../hooks/useProps";
import DialogProps from "../../../types/components/Popups/DialogProps";
import PopupBackdrop from "./backdrop";
import PopupContainer from "./container";

interface PopupProps extends DialogProps
{
	position: "center" | "left" | "right" | "bottom";
	maxHeight?: boolean;
	forComponent: "dialog" | "drawer.default" | "drawer.withHeader"
}

export default function Popup (props: PopupProps)
{
	const forComponent = props.forComponent;
	const position = props.position;
	const {
		onClose,
		backdropStyle,
		children,
		open,
		...popupProps
	} = useProps (forComponent, props as DialogProps);
	
	return (
		<PopupBackdrop
			forComponent = {forComponent}
			open = {open}
			position = {position}
			onClose = {onClose}
			style = {backdropStyle}
		>
			<PopupContainer
				{...popupProps}
				position = {position}
				forComponent = {forComponent}
			>
				{children}
			</PopupContainer>
		</PopupBackdrop>
	);
}