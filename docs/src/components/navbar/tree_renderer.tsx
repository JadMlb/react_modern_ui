import type { Sections } from "./Sections";
import TreeNode from "./tree_node";

interface TreeRendererProps
{
	nodes: Sections;
}

export default function TreeRenderer ({nodes}: TreeRendererProps)
{
	return Object.entries (nodes)
				.map (
					([titleKey, links]) => <TreeNode
												key = {titleKey}
												titleKey = {titleKey}
												links = {links}
											/>
				);
}