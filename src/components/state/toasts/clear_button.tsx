import { Style } from "../../../types";
import { Button } from "../../input";
import useStyle from "../../../hooks/useStyle";

interface ToastClearButtonProps
{
	onClose?: () => void;
	style?: Style;
}

export default function ToastClearButton ({onClose, style}: ToastClearButtonProps)
{
	const css = useStyle ("toaster", style, undefined, "clearButtonStyle");

	return (
		<Button
			style = {css}
			role = "alert"
			onClick = {onClose}
		>
			{"\u2715"}
		</Button>
	);
}