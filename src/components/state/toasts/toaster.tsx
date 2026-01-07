/** @jsxImportSource @emotion/react */
import Toast from "./toast";
import ToasterProps from "../../../types/components/Toaster/ToasterProps";
import { useToasts } from "./toasts_context";
import { createPortal } from "react-dom";
import ToasterContainer from "./container";
import useProps from "../../../hooks/useProps";

/**
 * Establishes component to display toasts.
 * Code inspired by https://blog.logrocket.com/how-to-create-custom-toast-component-react/
 */
export default function Toaster (props: ToasterProps)
{
	const {
		id,
		className,
		position,
		autoClear,
		clearAfter,
		containerStyle,
		toastStyle,
		clearButton,
		clearButtonStyle,
		icons,
		progressBar,
		progressBarStyle
	} = useProps ("toaster", props);
	const {toasts, clearToast} = useToasts();
	
	return createPortal (
		<ToasterContainer
			id = {id}
			className = {className}
			position = {position!}
			style = {containerStyle}
		>{
			toasts.length > 0 &&
			toasts.map (
				toast => <Toast
							key = {toast.id}
							onClose = {() => clearToast (toast.id)}	
							autoClear = {autoClear}
							clearAfter = {clearAfter}
							containerStyle = {toastStyle}
							clearButton = {clearButton}
							clearButtonStyle = {clearButtonStyle}
							icon = {icons![toast.type ?? "info"]}
							progressBar = {progressBar}
							progressBarStyle = {progressBarStyle}
						>
							{toast.contents}
						</Toast>
			)
		}</ToasterContainer>,
		document.body
	);
}