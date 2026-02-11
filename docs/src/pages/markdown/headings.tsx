import { useMemo, type HTMLAttributes } from "react";
import type { Element } from "hast";

function extractId (contents?: string)
{
	if (!contents)
		return null;

	return contents.toLowerCase()
					.replaceAll (/\s+/g, "-")
					.replaceAll (/[^-\w]/g, "");
}

interface HeadingsRendererProps extends HTMLAttributes<HTMLHeadingElement>
{
	node?: Element
}

export default function HeadingsRenderer ({node, ...props}: HeadingsRendererProps)
{
	const Component = node?.tagName ?? "h2";
	
	const id = useMemo (
		() =>
		{
			const contents = node?.children[0];
			if (!contents || contents.type !== "text")
				return null;
			return extractId (contents.value);
		},
		[node?.children[0]]
	);
	
	return (
		<Component id = {id} {...props}/>
	);
}