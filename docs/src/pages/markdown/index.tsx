import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLoaderData } from "react-router";
import Code from "./code";
import "./md.css";

export default function MarkdownPage ()
{
	const data = useLoaderData();

	return (
		<ReactMarkdown
			remarkPlugins = {[remarkGfm]}
			components = {{
				pre: Code
			}}
		>
			{data}
		</ReactMarkdown>
	);
}