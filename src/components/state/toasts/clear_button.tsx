import { StaticStyle } from "../../../types";
import { Button } from "../../input";

interface ToastClearButtonProps
{
	onClose?: () => void;
	style?: StaticStyle;
}

export default function ToastClearButton ({onClose, style}: ToastClearButtonProps)
{
	return (
		<Button
			style = {style}
			role = "alert"
			onClick = {onClose}
		>
			{"\u2715"}
		</Button>
	);
}