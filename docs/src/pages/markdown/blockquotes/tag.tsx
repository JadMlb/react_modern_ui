import { Tag } from "@jad-mlb/react-modern-ui";
import { type BlockquoteHTMLAttributes } from "react";

export default function TagBlockquote ({children}: BlockquoteHTMLAttributes<HTMLQuoteElement>)
{
	return (
		<Tag>{children}</Tag>
	);
}