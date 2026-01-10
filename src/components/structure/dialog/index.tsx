import useProps from "../../../hooks/useProps";
import useStyle from "../../../hooks/useStyle";
import { DialogProps } from "../../../types/components/Popups/DialogProps";
import Popup from "../popup_backdrop/popup";

export default function Dialog (instanceProps: DialogProps)
{
	const props = useProps ("dialog", instanceProps);
	const {
		style,
		backdropStyle,
		headerStyle,
		footerStyle,
		...rest
	} = props;

	const css = useStyle ("dialog", props, style);	
	const backdropCss = useStyle ("dialog", props, backdropStyle, "backdropStyle");
	const headerCss = useStyle ("dialog", props, headerStyle, "headerStyle");
	const footerCss = useStyle ("dialog", props, footerStyle, "footerStyle");
	
	return (
		<Popup
			position = "center"
			forComponent = "dialog"
			{...rest}
			style = {css}
			backdropStyle = {backdropCss}
			headerStyle = {headerCss}
			footerStyle = {footerCss}
		/>
	);
}