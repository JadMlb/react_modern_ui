import { type HTMLAttributes } from "react";
import type { Element, ElementContent } from "hast";
import useCodeParser from "./useCodeParser";
import { Panel, type Style } from "@jad-mlb/react-modern-ui";
import Demo from "./demo";
import CodeContents from "./code";

const STYLE: Style = isDark => ({
	borderRadius: "radius.small",
	border: `1px solid gray${isDark ? "Dark" : ""}`,
	padding: "unset",
	"> .rmui-panel-scroll-area": {
		gap: "unset"
	}
});

type CodeProps = {node?: Element} & HTMLAttributes<HTMLPreElement>;

export default function Code ({node, ...props}: CodeProps)
{
	const {cleanCode, demoKey} = useCodeParser (((node?.children[0] as Element).children[0] as ElementContent & {type: "text"}).value);
	
	return (
		<Panel className = "code" style = {STYLE}>
			<Demo demoKey = {demoKey}/>
			<CodeContents withDemo = {!!demoKey} {...props}>
				{cleanCode}
			</CodeContents>
		</Panel>
	);
}