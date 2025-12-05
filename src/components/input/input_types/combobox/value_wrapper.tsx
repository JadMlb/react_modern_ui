import { useMemo } from "react";

interface ValueWrapperProps
{
	children?: React.ReactNode;
}

export default function ValueWrapper ({children}: ValueWrapperProps)
{
	const css = useMemo (
		() => ({
			flexGrow: 1
		}),
		[]
	);
	return (
		<div css = {css}>
			{children}
		</div>
	);
}