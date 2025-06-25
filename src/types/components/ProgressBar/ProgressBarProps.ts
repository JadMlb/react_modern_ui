import { Style } from "../../../styles";
import { GenericProps } from "../GenericProps";

export interface ProgressBarProps extends GenericProps
{
	/**
	 * The percentage from completion. This value must be a number **between 0 and 100** otherwise an error is thrown.
	 */
	percentage: number;
	/**
	 * Renders a thin progress bar. In this case no percentage is shown. Defaults to `false`.
	 */
	thin?: boolean;
	/**
	 * Displays the current percentage of the progress bar only if the `thin` flag is not raised. Defaults to `false`.
	 */
	showPercentage?: boolean;
	/**
	 * Controls the style of the progress bar container, the parent of both the bar itself and the percentage
	 */
	parentStyle?: Style;
	/**
	 * Controls the style of the progress bar background
	 */
	backgroundStyle?: Style;
}