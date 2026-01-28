/** @jsxImportSource @emotion/react */
import Toast from "./toast";
import { ToasterProps } from "../../../types/components/Toaster/ToasterProps";
import { useToasts } from "./toasts_context";
import { createPortal } from "react-dom";
import ToasterContainer from "./container";
import useProps from "../../../hooks/useProps";
import useStyle from "../../../hooks/useStyle";

/**
 * Establishes component to display toasts.
 * Code inspired by https://blog.logrocket.com/how-to-create-custom-toast-component-react/
 */
export default function Toaster (instanceProps: ToasterProps)
{
	const props = useProps ("toaster", instanceProps);
	const {
		id,
		className,
		autoClear,
		clearAfter,
		containerStyle,
		toastStyle,
		clearButton,
		clearButtonStyle,
		icons,
		iconContainerStyle,
		progressBar,
		progressBarStyle,
		position,
		...aria
	} = props;

	const containerCss = useStyle ("toaster", props, containerStyle, "containerStyle");
	const toastCss = useStyle ("toaster", props, toastStyle, "toastStyle");
	const clearButtonCss = useStyle ("toaster", props, clearButtonStyle, "clearButtonStyle");
	const progressBarCss = useStyle ("toaster", props, progressBarStyle, "progressBarStyle");
	const iconContainerCss = useStyle ("toaster", props, iconContainerStyle, "iconContainerStyle");

	const {toasts, clearToast} = useToasts();
	
	return createPortal (
		<ToasterContainer
			id = {id}
			className = {className}
			style = {containerCss}
			{...aria}
		>{
			toasts.length > 0 &&
			toasts.map (
				toast => <Toast
							toasterPosition = {position!}
							key = {toast.id}
							onClose = {() => clearToast (toast.id)}	
							autoClear = {autoClear}
							clearAfter = {clearAfter}
							containerStyle = {toastCss}
							clearButton = {clearButton}
							clearButtonStyle = {clearButtonCss}
							icon = {icons![toast.type ?? "info"]}
							iconContainerStyle = {iconContainerCss}
							progressBar = {progressBar}
							progressBarStyle = {progressBarCss}
						>
							{toast.contents}
						</Toast>
			)
		}</ToasterContainer>,
		document.body
	);
}