import { Panel } from "@jad-mlb/react-modern-ui";
import type { BlockquoteHTMLAttributes } from "react";
import React, { useMemo } from "react";

export default function PanelBlockQuote ({children, ...props}: BlockquoteHTMLAttributes<HTMLQuoteElement>)
{
	const childrenAsArray = useMemo (
		() => React.Children.toArray (children),
		[children]
	);

	return (
		<Panel className = "panel-block-quote" title = {childrenAsArray[0]} collapsible {...props}>
			{childrenAsArray.slice (1)}
		</Panel>
	);
}