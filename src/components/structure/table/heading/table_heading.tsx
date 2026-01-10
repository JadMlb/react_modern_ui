import { StaticStyle } from "../../../../types";

interface TableHeadingProps
{
	children?: React.ReactNode;
	style?: StaticStyle
}

export default function TableHeading ({style, children}: TableHeadingProps)
{
	if (!children)
		return null;

	return (
		<div css = {style}>{children}</div>
	);
}