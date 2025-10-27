import { useMemo } from "react";
import { Style, useThemeParser } from "../../../../styles";

interface TableHeadingProps
{
	children?: React.ReactNode;
	style?: Style
}

const DEFAULT_STYLE = {
	display: "flex",
	flexDirection: "row",
	gap: "spacing.medium",
	marginBlock: "spacing.large"
} satisfies Style;

export default function TableHeading ({style, children}: TableHeadingProps)
{
	const parseCss = useThemeParser();

	const realStyle = useMemo (
		() => parseCss ({
			...DEFAULT_STYLE,
			...style
		}),
		[style]
	);

	if (!children)
		return null;

	return (
		<div css = {realStyle}>{children}</div>
	);
}