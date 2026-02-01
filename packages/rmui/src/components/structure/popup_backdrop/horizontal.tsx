import { StaticStyle } from "../../../types";

interface HorizontalProps
{
	style?: StaticStyle;
	children?: React.ReactNode;
}

export default function Horizontal ({style, children}: HorizontalProps)
{
	if (!children)
		return null;

	return (
		<div css = {style}>
			{children}
		</div>
	);
}