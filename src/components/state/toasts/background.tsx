import { Style } from "../../../types";
import useStyle from "../../../hooks/useStyle";

interface ToastBackgroundProps
{
	style?: Style;
	children?: React.ReactNode;
}

export default function ToastBackground ({style, children}: ToastBackgroundProps)
{
	const css = useStyle  ("toaster", style, undefined, "toastStyle");
	
	return (
		<div css = {css}>
			{children}
		</div>
	);
}