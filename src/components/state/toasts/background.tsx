import { StaticStyle } from "../../../types";

interface ToastBackgroundProps
{
	style?: StaticStyle;
	children?: React.ReactNode;
}

export default function ToastBackground ({style, children}: ToastBackgroundProps)
{
	return (
		<div css = {style}>
			{children}
		</div>
	);
}