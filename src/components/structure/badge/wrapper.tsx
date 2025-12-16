/** @jsxImportSource @emotion/react */

import { Style } from "../../../types";
import useStyle from "../../../hooks/useStyle";

interface BadgeWrapperProps
{
	style?: Style;
	children?: React.ReactNode;
}

export default function BadgeWrapper ({style, children}: BadgeWrapperProps)
{
	const css = useStyle ("badge", style, undefined, "parentStyle");
	
	return (
		<span css = {css}>
			{children}
		</span>
	);
}