import useStyle from "../../../hooks/useStyle";
import { ProgressBarProps } from "../../../types";
import ProgressBar from "../progress_bar";

export default function ToastProgressBar ({style, ...rest}: ProgressBarProps)
{
	const css = useStyle ("toaster", style, undefined, "progressBarStyle");

	return (
		<ProgressBar
			{...rest}
			style = {css}
		/>
	);
}