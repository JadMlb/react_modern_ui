import ReactMarkdown from "react-markdown";
import { useLoaderData } from "react-router";

export default function MarkdownPage ()
{
	const data = useLoaderData();

	return (
		<ReactMarkdown>
			{data}
		</ReactMarkdown>
	);
}