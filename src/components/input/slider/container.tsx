import useStyle from "../../../hooks/useStyle";
import { Style } from "../../../types";

interface SliderContainerProps
{
	style?: Style;
	children?: React.ReactNode;
}

export default function SliderContainer ({style, children}: SliderContainerProps)
{
	const css = useStyle ("slider", style, undefined, "parentStyle");

	return (
		<div css = {css}>
			{children}
		</div>
	);
}