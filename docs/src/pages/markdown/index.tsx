import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLoaderData } from "react-router";
import CodeRenderer from "./code";
import BlockQuoteRenderer from "./blockquotes";
import RawCodeRenderer from "./raw-code";
import TableRenderer from "./table";
import "./md.css";
import HeadingsRenderer from "./headings";
import AnchorRenderer from "./anchor";

export default function MarkdownPage ()
{
	const data = useLoaderData();

	return (
		<ReactMarkdown
			remarkPlugins = {[remarkGfm]}
			components = {{
				pre: CodeRenderer,
				blockquote: BlockQuoteRenderer,
				code: RawCodeRenderer,
				table: TableRenderer,
				h2: HeadingsRenderer,
				h3: HeadingsRenderer,
				h4: HeadingsRenderer,
				h5: HeadingsRenderer,
				h6: HeadingsRenderer,
				a: AnchorRenderer
			}}
		>
			{data}
		</ReactMarkdown>
	);
}