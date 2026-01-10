import useProps from "../../../hooks/useProps";
import useStyle from "../../../hooks/useStyle";
import { DrawerProps } from "../../../types/components/Popups/DrawerProps";
import Popup from "../popup_backdrop/popup";
import DrawerHeader from "./header";

export default function Drawer (instanceProps: DrawerProps)
{
	const props = useProps ("dialog", instanceProps);
	const {
		style,
		backdropStyle,
		headerStyle,
		footerStyle,
		position,
		header,
		hideCloseButton,
		...rest
	} = props;

	const css = useStyle ("dialog", props, style);	
	const backdropCss = useStyle ("dialog", props, backdropStyle, "backdropStyle");
	const headerCss = useStyle ("dialog", props, headerStyle, "headerStyle");
	const footerCss = useStyle ("dialog", props, footerStyle, "footerStyle");

	return (
		<Popup
			position = {position ?? "right"}
			maxHeight
			forComponent = "drawer"
			header = {
				<DrawerHeader noCloseButton = {hideCloseButton} onClose = {rest.onClose}>
					{header}
				</DrawerHeader>
			}
			{...rest}
			style = {css}
			backdropStyle = {backdropCss}
			headerStyle = {headerCss}
			footerStyle = {footerCss}
		/>
	);
}