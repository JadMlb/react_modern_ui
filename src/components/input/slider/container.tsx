import { StaticStyle } from "../../../types";

interface SliderContainerProps
{
	style?: StaticStyle;
	children?: React.ReactNode;
	as?: keyof HTMLElementTagNameMap;
}

export default function SliderContainer ({style, children, as}: SliderContainerProps)
{
	const Component = as ?? "div";

	return (
		<Component css = {style} >
			{children}
		</Component>
	);
}