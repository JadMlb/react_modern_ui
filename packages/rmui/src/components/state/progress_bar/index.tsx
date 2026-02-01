import useProps from "../../../hooks/useProps";
import useStyle from "../../../hooks/useStyle";
import { ProgressBarProps } from "../../../types";
import ProgressBarBar from "./bar";
import ProgressBarContainer from "./container";
import ProgressBarPercentage from "./percentage";

export default function ProgressBar (instanceProps: ProgressBarProps)
{
	const props = useProps ("progressBar", instanceProps);
	const {
		backgroundStyle,
		parentStyle,
		style,
		className,
		id,
		showPercentage,
		percentage,
		as,
		forceMode: _,
		...aria
	} = props;

	const css = useStyle ("progressBar", props, style);
	const backgroundCss = useStyle ("progressBar", props, backgroundStyle, "backgroundStyle");
	const parentCss = useStyle ("progressBar", props, parentStyle, "parentStyle");

	return (
		<ProgressBarContainer
			style = {parentCss}
			id = {id}
			className = {className}
			as = {as}
		>
			<ProgressBarBar
				backgroundStyle = {backgroundCss}
				style = {css}
				percentage = {percentage}
				{...aria}
			/>
			<ProgressBarPercentage value = {percentage} show = {showPercentage}/>
		</ProgressBarContainer>
	);
}