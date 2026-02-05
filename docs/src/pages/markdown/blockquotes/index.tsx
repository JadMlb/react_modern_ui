import * as React from "react";
import type { Element, ElementContent } from "hast";
import PanelBlockQuote from "./panel";
import DefaultBlockquote from "./default";

function tryGetTextContentFromElement (element?: ElementContent): string
{
	if (!element)
		return "";
	if (element.type === "text")
		return element.value;
	if (element.type === "element")
		return tryGetTextContentFromElement (element.children[0]);
	return "";
}

function tryGetFirstText (node?: Element): string
{
	if (!node)
		return "";
	const firstChild = node.children?.filter(node => node.type !== "text" || node.value !== "\n")[0];
	return tryGetTextContentFromElement (firstChild);
}

const TYPES = {
	"PANEL": PanelBlockQuote,
	"": DefaultBlockquote
};

interface BlockQuoteProps extends React.BlockquoteHTMLAttributes<HTMLQuoteElement>
{
	node?: Element;
}

export default function BlockQuote ({node, children, ...props}: BlockQuoteProps)
{
	const firstLine = React.useMemo (
		() => tryGetFirstText (node),
		[node]
	);

	const key = React.useMemo (
		() =>
		{
			if (!firstLine.startsWith ("[!") || !firstLine.endsWith ("]"))
				return null;
			return firstLine.slice (2, -1);
		},
		[firstLine]
	);

	const cleanChildren = React.useMemo (
		() => React.Children.toArray (children)
						.filter (
							child => child !== "\n"
									&& React.isValidElement<any> (child)
									&& (
										child.type !== "p"
										|| (child.props as any).children !== `[!${key}]`
									)
						),
		[children, key]
	);

	const Component = TYPES[(key ?? "") as keyof typeof TYPES] ?? DefaultBlockquote;

	return (
		<Component {...props}>
			{cleanChildren}
		</Component>
	);
}