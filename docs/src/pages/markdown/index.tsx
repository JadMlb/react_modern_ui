import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLoaderData } from "react-router";
import CodeRenderer from "./code";
import BlockQuoteRenderer from "./blockquotes";
import RawCodeRenderer from "./rawCode";
import "./md.css";

export default function MarkdownPage ()
{
	const data = useLoaderData();

	return (
		<ReactMarkdown
			remarkPlugins = {[remarkGfm]}
			components = {{
				pre: CodeRenderer,
				blockquote: BlockQuoteRenderer,
				code: RawCodeRenderer
			}}
		>
			{data}
		</ReactMarkdown>
	);
}