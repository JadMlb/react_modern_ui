import { useMemo } from "react";
import type RawCodeRendererProps from "./RawCodeRendererProps";
import type { Text } from "hast";
import DefaultRawCodeRenderer from "./tag";
import AriaTooltip from "./aria";
import ChildrenOptionalTooltip from "./children_opt";
import NoChildrenTooltip from "./no_children";
import MutableTooltip from "./mutable";

const COMPONENT_MAP = {
	"TAG-GREEN": DefaultRawCodeRenderer,
	"ARIA": AriaTooltip,
	"CHILDREN-OPT": ChildrenOptionalTooltip,
	"NO-CHILDREN": NoChildrenTooltip,
	"MUTABLE": MutableTooltip
};

const COLOUR_MAP = {
	"TAG-GREEN": "success",
} as const;

export default function RawCodeRenderer ({node, children, ...props}: RawCodeRendererProps)
{
	const key = useMemo (
		() => node?.children?.[0]?.type === "text" ? 
				node.children[0].value.match (/(?<=\[\!)([A-Z]+(-[A-Z]+)*)(?=\])/)?.[0] ?? null :
				null,
		[node?.children]
	);

	const realChildren = useMemo (
		() => key ? (node!.children[0] as Text).value.slice (key.length + 3) : children,
		[key, node, children]
	);

	if (!key)
		return <DefaultRawCodeRenderer {...props}>{realChildren}</DefaultRawCodeRenderer>;

	const Component = COMPONENT_MAP[key as keyof typeof COMPONENT_MAP] ?? "";
	return (
		<Component
			colour = {COLOUR_MAP[key as keyof typeof COLOUR_MAP]}
			{...props}
		>
			{realChildren}
		</Component>
	);
}