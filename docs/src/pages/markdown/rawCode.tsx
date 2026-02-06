import { Tag } from "@jad-mlb/react-modern-ui";
import type { HTMLAttributes } from "react";
import type { Element } from "hast";

interface RawCodeRendererProps extends HTMLAttributes<HTMLElement>
{
	node?: Element;
}

export default function RawCodeRenderer ({node, children, ...props}: RawCodeRendererProps)
{
	return (
		<Tag
			as = "code"
			{...props}
		>
			{children}
		</Tag>
	);
}