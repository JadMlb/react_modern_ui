/** @jsxImportSource @emotion/react */
import { StaticStyle } from "../../../types";

interface BadgeWrapperProps
{
	style?: StaticStyle;
	children?: React.ReactNode;
}

export default function BadgeWrapper ({style, children}: BadgeWrapperProps)
{
	return (
		<span css = {style}>
			{children}
		</span>
	);
}