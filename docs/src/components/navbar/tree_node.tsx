import { Panel } from "@jad-mlb/react-modern-ui";
import { useTranslation } from "react-i18next";
import TreeLinksRenderer from "./tree_links_renderer";

interface TreeNodeProps
{
	titleKey: string;
	links: string[];
}

export default function TreeNode ({titleKey, links}: TreeNodeProps)
{
	const {t} = useTranslation ("nav");

	return (
		<Panel title = {t (titleKey)} collapsible className = "tree-node">
			<TreeLinksRenderer parent = {titleKey}>{links}</TreeLinksRenderer>
		</Panel>
	);
}