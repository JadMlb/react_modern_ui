import { useCallback, type AnchorHTMLAttributes } from "react";
import type { Element } from "hast";
import { Link } from "@jad-mlb/react-modern-ui";

interface AnchorRendererProps extends AnchorHTMLAttributes<HTMLAnchorElement>
{
	node?: Element;
}

export default function AnchorRenderer ({node, ...props}: AnchorRendererProps)
{
	const handleClick = useCallback (
		(e: React.MouseEvent) =>
		{
			e.preventDefault();
			const id = node?.properties?.href as string;
			if (!id)
				return;
			const element = document.getElementById (id.slice (1));
			if (element) {
				element.scrollIntoView ({behavior: "smooth"});
			}
		},
		[node?.properties?.href]
	);

	return (
		<Link {...props} onClick = {handleClick}/>
	);
}