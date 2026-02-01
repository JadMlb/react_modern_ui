import * as React from "react";

import { useTheme } from "../../../../styles";
import X from "../x";
import TrailingProps from "./TrailingProps";

export default function Trailing ({optional, handleClear, children}: TrailingProps)
{
	const {theme: {measurements: {spacing}}} = useTheme();

	const WRAPPER_STYLE = React.useMemo (
		() => ({
			display: "flex",
			gap: spacing.small,
			alignItems: "center"
		}),
		[spacing.small]
	);

	if (!optional && !children)
		return null;
	
	return (
		<div style = {WRAPPER_STYLE}>
			{children}
			{optional && <X onClick = {handleClear}/>}
		</div>
	);
}