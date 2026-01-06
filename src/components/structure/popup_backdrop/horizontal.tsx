import useStyle from "../../../hooks/useStyle";
import { Style } from "../../../types";

interface HorizontalProps
{
	forComponent: "dialog" | "drawer.default" | "drawer.withHeader";
	position?: "header" | "footer";
	style?: Style;
	children?: React.ReactNode;
}

export default function Horizontal ({forComponent, position = "header", style, children}: HorizontalProps)
{
	const css = useStyle (forComponent, style, undefined, `${position}Style`);

	if (!children)
		return null;

	return (
		<div css = {css}>
			{children}
		</div>
	);
}