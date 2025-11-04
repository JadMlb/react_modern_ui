import { Style } from "../../../styles";
import SwitchHandle from "./handle";
import SwitchSliderBackground from "./slider_bg";

interface SwitchSliderBackgroundProps
{
	value: boolean;
	backgroundStyle?: Style;
	activatedBackgroundStyle?: Style;
	handleStyle?: Style;
	activatedHandleStyle?: Style;
	readonly?: boolean;
	disabled?: boolean;
	onClick?: () => void;
}

export default function SwitchSlider ({value, backgroundStyle, activatedBackgroundStyle, handleStyle, activatedHandleStyle, readonly, disabled, onClick}: SwitchSliderBackgroundProps)
{
	return (
		<SwitchSliderBackground
			value = {value}
			style = {backgroundStyle}
			activatedStyle = {activatedBackgroundStyle}
			disabled = {disabled}
			onClick = {onClick}
		>
			<SwitchHandle
				value = {value}
				style = {handleStyle}
				activatedStyle = {activatedHandleStyle}
				readonly = {readonly}
				disabled = {disabled}
			/>
		</SwitchSliderBackground>
	);
}