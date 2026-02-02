import TreeLink from "./tree_link";

interface TreeLinksRendererProps
{
	children: string[];
}

export default function TreeLinksRenderer ({children}: TreeLinksRendererProps)
{
	return children.map (
		topic => <TreeLink key = {topic}>{topic}</TreeLink>
	);
}