import { StaticStyle } from "../../../types";
import ProgressBarBackground from "./bar_bg";
import ProgressBarValue from "./value";

interface ProgressBarBarProps
{
	backgroundStyle?: StaticStyle;
	style?: StaticStyle;
}

export default function ProgressBarBar ({backgroundStyle, style}: ProgressBarBarProps)
{
	return (
		<ProgressBarBackground style = {backgroundStyle}>
			<ProgressBarValue style = {style}/>
		</ProgressBarBackground>
	);
}