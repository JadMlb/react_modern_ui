import TreeLink from "./tree_link";

interface TreeLinksRendererProps
{
	parent: string;
	children: string[];
}

export default function TreeLinksRenderer ({parent, children}: TreeLinksRendererProps)
{
	return children.map (
		topic => <TreeLink key = {topic} parent = {parent}>{topic}</TreeLink>
	);
}