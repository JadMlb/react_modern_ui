import useProps from "../../../hooks/useProps";
import useStyle from "../../../hooks/useStyle";
import { DrawerProps } from "../../../types/components/Popups/DrawerProps";
import Popup from "../popup_backdrop/popup";
import DrawerHeader from "./header";

export default function Drawer (instanceProps: DrawerProps)
{
	const props = useProps ("drawer", instanceProps);
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

	const css = useStyle ("drawer", props, style);	
	const backdropCss = useStyle ("drawer", props, backdropStyle, "backdropStyle");
	const headerCss = useStyle ("drawer", props, headerStyle, "headerStyle");
	const footerCss = useStyle ("drawer", props, footerStyle, "footerStyle");

	return (
		<Popup
			position = {position ?? "right"}
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