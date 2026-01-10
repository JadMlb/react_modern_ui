import { ProgressBarProps } from "../../../types";
import ProgressBar from "../progress_bar";

export default function ToastProgressBar (props: ProgressBarProps)
{
	return (
		<ProgressBar
			{...props}
		/>
	);
}