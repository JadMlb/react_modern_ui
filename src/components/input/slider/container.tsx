import { StaticStyle } from "../../../types";

interface SliderContainerProps
{
	style?: StaticStyle;
	children?: React.ReactNode;
}

export default function SliderContainer ({style, children}: SliderContainerProps)
{
	return (
		<div css = {style}>
			{children}
		</div>
	);
}