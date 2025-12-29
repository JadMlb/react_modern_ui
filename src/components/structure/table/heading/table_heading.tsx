import { Style } from "../../../../types";
import useStyle from "../../../../hooks/useStyle";

interface TableHeadingProps
{
	children?: React.ReactNode;
	style?: Style
}

export default function TableHeading ({style, children}: TableHeadingProps)
{
	const css = useStyle ("table", style, undefined, "headingStyle");

	if (!children)
		return null;

	return (
		<div css = {css}>{children}</div>
	);
}