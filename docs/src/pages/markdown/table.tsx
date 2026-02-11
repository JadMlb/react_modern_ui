import { useMemo, type TableHTMLAttributes } from "react";
import type { Element, ElementContent } from "hast";
import { Table, type TableColumn, type TableRowData } from "@jad-mlb/react-modern-ui";

function getNodeContents (element: ElementContent): string
{
	if (element.type === "text")
		return element.value;

	if (element.type !== "element")
		return "";
	
	// const Component = element.tagName as keyof HTMLElementTagNameMap;
	// const children = getNodeContents (element.children[0]);
	// return (
	// 	<Component>{children}</Component>
	// );
	return getNodeContents (element.children[0]);
}

function getRowContents (elements: ElementContent[])//: string[]
{
	return elements.filter (
						element => element.type === "element"
									&& ["th", "td"].includes (element.tagName)
					)
					.map (
						element =>
						getNodeContents ((element as Element).children[0])
					);
}

function getCells (node?: ElementContent): TableColumn[]
{
	if (!node || node.type !== "element" || !node.children || node.children.length === 0)
		return [];

	if (node.children[1].type !== "element" || node.children[1].tagName !== "thead" || node.children[1].children.length === 0)
		return [];

	if (node.children[1].children[1].type !== "element" || node.children[1].children[1].tagName !== "tr" || node.children[1].children[1].children.length === 0)
		return [];

	return getRowContents (node.children[1].children[1].children)
				.map (
					content => ({
						displayName: content,
						name: content,
						width: content === "Prop name" ? "1.5fr" : content === "Required" ? "0.5fr" : undefined
					} satisfies TableColumn)
				);
}

function getRows (columns: TableColumn[], node?: ElementContent): TableRowData[]
{
	if (!node || node.type !== "element" || !node.children || node.children.length === 0)
		return [];

	if (node.children[3].type !== "element" || node.children[3].tagName !== "tbody" || node.children[3].children.length === 0)
		return [];

	// getRowContents (node.children[1].children[1].children);
	return node.children[3].children.filter (n => n.type !== "text")
									.map (n => getRowContents ((n as Element).children))
									.map (
										row => Object.fromEntries (
											row.map (
												(columnContents, i) => [
													columns[i].name,
													columnContents
												]
											)
										)
									);
}

interface TableRendererProps extends TableHTMLAttributes<HTMLTableElement>
{
	node?: Element;
}

export default function TableRenderer ({node}: TableRendererProps)
{
	const columns = useMemo (
		() => getCells (node),
		[node]
	);
	const rows = useMemo (
		() => getRows (columns, node),
		[columns, node]
	);

	return (
		<Table
			columns = {columns}
			rows = {rows}
		/>
	);
}