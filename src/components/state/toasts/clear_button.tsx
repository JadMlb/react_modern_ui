import { useMemo } from "react";
import { Style } from "../../../styles";
import { TOAST_TYPE_SYMBOL_MAP } from "../../../types";
import { Button } from "../../input";

const BASE_STYLE = {width: "30px", height: "30px", borderRadius: "radius.round"} satisfies Style;

interface ToastClearButtonProps
{
	onClose?: () => void;
	style?: Style;
}

export default function ToastClearButton ({onClose, style}: ToastClearButtonProps)
{
	const completeStyle = useMemo (
		() => ({...BASE_STYLE, ...style}),
		[style]
	);

	return (
		<Button
			style = {completeStyle}
			role = "alert"
			onClick = {onClose}
		>
			{TOAST_TYPE_SYMBOL_MAP["fail"].icon}
		</Button>
	);
}