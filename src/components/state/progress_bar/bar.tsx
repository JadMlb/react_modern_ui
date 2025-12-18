import { ProgressBarProps } from "../../../types";
import ProgressBarBackground from "./bar_bg";
import ProgressBarValue from "./value";

interface ProgressBarBarProps
{
	value: ProgressBarProps["percentage"];
	thin?: ProgressBarProps["thin"];
	backgroundStyle?: ProgressBarProps["backgroundStyle"];
	style?: ProgressBarProps["style"];
}

export default function ProgressBarBar ({value, thin, backgroundStyle, style}: ProgressBarBarProps)
{
	return (
		<ProgressBarBackground style = {backgroundStyle} thin = {thin}>
			<ProgressBarValue value = {value} style = {style}/>
		</ProgressBarBackground>
	);
}