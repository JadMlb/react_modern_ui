import { useThemeParser } from "@jad-mlb/react-modern-ui";
import { useMemo, type BlockquoteHTMLAttributes } from "react";

export default function DefaultBlockquote (props: BlockquoteHTMLAttributes<HTMLQuoteElement>)
{
	const parseCss = useThemeParser();
	const style = useMemo (
		() => parseCss ({
			borderLeft: "2px solid primary",
			paddingLeft: "spacing.large",
			margin: "unset"
		}),
		[parseCss]
	);

	return (
		<blockquote {...props} style = {style}/>
	);
}