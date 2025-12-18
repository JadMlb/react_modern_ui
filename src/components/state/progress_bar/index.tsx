import useProps from "../../../hooks/useProps";
import { ProgressBarProps } from "../../../types";
import ProgressBarBar from "./bar";
import ProgressBarContainer from "./container";
import ProgressBarPercentage from "./percentage";

export default function ProgressBar (props: ProgressBarProps)
{
	const {
		backgroundStyle,
		parentStyle,
		style,
		className,
		id,
		thin,
		showPercentage
	} = useProps ("progressBar", props);
	const percentage = props.percentage;

	return (
		<ProgressBarContainer
			style = {parentStyle}
			id = {id}
			className = {className}
		>
			<ProgressBarBar
				value = {percentage}
				backgroundStyle = {backgroundStyle}
				style = {style}
				thin = {thin}
			/>
			<ProgressBarPercentage value = {percentage} show = {showPercentage}/>
		</ProgressBarContainer>
	);
}