import { StaticStyle } from "../../../types";
import SwitchHandle from "./handle";
import SwitchSliderBackground from "./slider_bg";

interface SwitchSliderBackgroundProps
{
	value: boolean;
	backgroundStyle?: StaticStyle;
	activatedBackgroundStyle?: StaticStyle;
	handleStyle?: StaticStyle;
	activatedHandleStyle?: StaticStyle;
	onClick?: () => void;
	onContextMenu?: React.MouseEventHandler;
}

export default function SwitchSlider ({value, backgroundStyle, activatedBackgroundStyle, handleStyle, activatedHandleStyle, onClick, onContextMenu}: SwitchSliderBackgroundProps)
{
	return (
		<SwitchSliderBackground
			value = {value}
			style = {backgroundStyle}
			activatedStyle = {activatedBackgroundStyle}
			onClick = {onClick}
			onContextMenu = {onContextMenu}
		>
			<SwitchHandle
				value = {value}
				style = {handleStyle}
				activatedStyle = {activatedHandleStyle}
			/>
		</SwitchSliderBackground>
	);
}