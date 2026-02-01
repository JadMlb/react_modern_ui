import { useMemo } from "react";
import { useThemeParser } from "../../../../styles";

const WRAPPER_STYLE = {
	display: "flex",
	gap: "spacing.small",
	flexGrow: 1
};

interface ValueWrapperProps
{
	children?: React.ReactNode;
}

export default function ValueWrapper ({children}: ValueWrapperProps)
{
	const parseCss = useThemeParser();
	const css = useMemo (
		() => parseCss (WRAPPER_STYLE),
		[parseCss]
	);
	
	return (
		<div css = {css}>
			{children}
		</div>
	);
}