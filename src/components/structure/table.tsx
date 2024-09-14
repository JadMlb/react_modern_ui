import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TableRow } from "../../types/TableRow";
import { TableStructure } from "../../types/TableStructure";
import styled, { css } from "styled-components";
import { colour, radius, spacing } from "../../styles/styles";
import ThemeType from "../../types/theme";
import { useDarkMode, useTheme } from "../../styles/theme";
import ComboBox from "../input/combobox";
import { Option } from "../../types/Option";
import { PaginationBar } from "./table/pagination_bar";

const Wrapper = styled.div<{$maxHeight: number, $isDark: boolean, $theme: ThemeType}>
`
	overflow: auto;
	max-height: ${props => props.$maxHeight};
	position: relative;

	border-radius: ${radius.normal};
	border: 1px solid ${props => colour (props.$isDark ? "grayDark" : "grayLight", props.$theme)};
`;

const StyledTable = styled.table
`
	border-collapse: collapse;
`;

const Header = styled.thead<{$theme: ThemeType}>
`
	background-color: ${props => colour ("primary", props.$theme)};
	color: ${props => colour ("white", props.$theme)};
	position: sticky;
	top: 0;

	display: grid;
`;

const Cell = styled.td
`
	padding: ${spacing.small};
`;

const Row = styled.tr<{$alternate: boolean, $isDark: boolean, $theme: ThemeType}>
`
	display: contents;

	${
		props => props.$alternate ?
			css
			`
				&:not(:last-child) ${Cell}
				{
					border-bottom: 1px solid ${colour (props.$isDark ? "grayDark" : "grayLight", props.$theme)};
				}
			`
			:
			css
			`
				&:nth-child(even) ${Cell}
				{
					background-color: ${colour (props.$isDark ? "grayDark" : "grayLight", props.$theme)};
				}
			`
	}

	&:hover
	{
		background-color: ${props => colour (props.$isDark ? "primaryDark" : "primaryElevated", props.$theme)};
	}
`;

const Body = styled.tbody
`
	display: grid;

	> ${Row}
	{
		cursor: pointer;
	}
`;

const HeaderCell = styled.th
`
	padding: ${spacing.small};
	text-align: start;
	position: relative;
`;

const CellContents = styled.span<{$containsNumber?: boolean}>
`
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	display: block;
	text-align: ${props => props.$containsNumber ? "right" : "left"};
`;

const Resizer = styled.div<{$height: number, $active: boolean, $isDark: boolean, $theme: ThemeType}>
`
	width: 2px;
	height: ${props => props.$height};
	background-color: transparent;
	position: absolute;
	top: 0;
	right: 0;
	cursor: col-resize;

	&:before
	{
		content: "\22EE";
		font-weight: 900;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 5px;
		height: 17px;
		position: absolute;
		color: ${props => colour ("white", props.$theme)};
		padding: 1px;
		top: 13px;
		right: -2px;
		border-radius: ${radius.normal};
	}

	&:hover, &:hover:before
	{
		background-color: ${props => colour (props.$active ? (props.$isDark ? "primaryDark" : "primaryElevated") : (props.$isDark ? "grayDark" : "grayLight"), props.$theme)};
		color: ${props => colour (props.$isDark ? "white" : "black", props.$theme)};
	}
`;

type TableProps = {
	key?: string | number | bigint | null,
	/**
	 * The list of rows to be displayed in the table
	 */
	data: TableRow[],
	/**
	 * The definition of the structure of the table, what each column contains and how fields map to each column.
	 */
	structure: TableStructure,
	/**
	 * The max height of the table in pixels. If no value is provided, the table will occupy the remainder of the page.
	 */
	maxHeight?: number,
	/**
	 * Specifies whether each other row is to be coloured differently from the previous one, i.e. each even row is in gray or not. Defaults to `false`.
	 */
	alternateRowColour?: boolean,
	/**
	 * Specifies whether pagination is enabled or not. If enabled, use prop `allowedPageSizes` to pass allowed options for page sizes. Defaults to `false`.
	 */
	allowPagination?: boolean,
	/**
	 * Specifies the options for page sizes. Only considered if `allowPagination` flag is raised. Defaults to `[5, 10]`.
	 */
	allowedPageSizes?: number[]
	/**
	 * The event handler to be executed when a row is clicked
	 * @param row The data contained in the clicked row
	 */
	onRowClick?: (row: TableRow) => void
};

// resizable table inspired from the following article https://www.letsbuildui.dev/articles/resizable-tables-with-react-and-css-grid/
export default function Table ({data, structure, maxHeight, alternateRowColour = false, allowPagination, allowedPageSizes = [5, 10], onRowClick}: TableProps)
{
	const {theme} = useTheme();
	const isDark = useDarkMode();

	const [shownData, setShownData] = useState ([...data]);
	const [sortingColumnIndex, setSortingColumnIndex] = useState<number | null> (null);

	const [fullSortedData, setFullSortedData] = useState ([...data]);
	const [rowsPerPage, setRowsPerPage] = useState (allowPagination ? 0 : 1e10);
	
	const [activeIndex, setActiveIndex] = useState<number | null> (null);
	const [tableDims, setTableDims] = useState ({width: 0, height: 0});
	const headRef = useRef<HTMLTableSectionElement> (null);
	const bodyRef = useRef<HTMLTableSectionElement> (null);
	const [curColWidths, setCurColWidths] = useState<number[]> ([]);

	const [availableSpace, setAvailableSpace] = useState (maxHeight ?? -1);

	useEffect (
		() =>
		{
			if (headRef.current && maxHeight === undefined)
			{
				setAvailableSpace (window.innerHeight - headRef.current.offsetTop);
			}
		},
		[maxHeight, window.innerHeight]
	);
	
	// specified proportions of in structure might not add up to 1 => map them from range 0-<sum> to range 0-1
	const actualProportions = useMemo (
		() =>
		{
			const PROPORTIONS_SUM = Object.values (structure.columns)
								.map (c => c.proportion)
								.reduce ((prev, cur) => prev + cur);
					
			let proportions = Object.entries(structure.columns).map (col => [col[0], col[1].proportion]);
			
			const SCALE_FACTOR = 1 / PROPORTIONS_SUM;
			proportions = proportions.map (entry => [entry[0], (entry[1] as number) * SCALE_FACTOR * 100])
			
			return Object.fromEntries (proportions);
		},
		[structure]
	);

	const NB_COLS = useMemo (
		() => Object.keys(structure.columns).length,
		[structure.columns]
	);

	function onMouseDown (i: number)
	{
		setActiveIndex (i);
	}

	const onMouseUp = useCallback (
		() =>
		{
			setActiveIndex (null);
			window.removeEventListener ("mousemove", onMouseDrag);
			window.removeEventListener ("mouseup", onMouseUp);
		},
		[activeIndex]
	);

	const onMouseDrag = useCallback (
		(e: MouseEvent) =>
		{
			if (activeIndex !== null)
			{
				setCurColWidths (
					old => old.map (
									(w, i) =>
									{
										let newVal = w;
										if (i === activeIndex)
										{
											newVal += e.movementX;
											// if (newVal < 20.8)
											// 	return 20.8;
											return newVal;
										}
										else if (i === activeIndex + 1)
										{
											newVal -= e.movementX;
											// if (newVal < 20.8)
											// 	return 20.8;
											return newVal;
										}
										else
											return w;
									}
								)
				);
			}
		},
		[activeIndex]
	);

	function sortTable (options: Option[])
	{
		setSortingColumnIndex (options[0]?.id ?? null);

		if (options[0]?.id !== undefined)
		{
			const sortingColumn = Object.keys(structure.columns[structure.sortingColumns?.[options[0]?.id ?? 0] ?? "id"].fields)[0];
			const sortedData = fullSortedData.sort (
				(r1, r2) =>
				{
					if (r1[sortingColumn] > r2[sortingColumn])
						return 1;
					else if (r1[sortingColumn] < r2[sortingColumn])
						return -1;
					return 0;
				}
			);
			setFullSortedData (sortedData);
			setShownData (fullSortedData.slice (0, rowsPerPage));
		}
		else
			setShownData (data);
	}

	useEffect (
		() => setShownData (fullSortedData.slice (0, rowsPerPage)),
		[rowsPerPage]
	);

	useEffect (
		() =>
		{
			if (headRef.current && bodyRef.current)
			{
				setTableDims ({width: headRef.current.offsetWidth, height: headRef.current.offsetHeight + bodyRef.current.offsetHeight});
			}
		},
		[]
	);

	useEffect (
		() =>
		{
			if (tableDims.width > 0)
				setCurColWidths (
					Object.values (actualProportions)
							.map (col => (col as number) * tableDims.width / 100)
				);
		},
		[tableDims.width]
	);

	useEffect (
		() =>
		{
			if (headRef.current && bodyRef.current && curColWidths.length > 0)
			{
				headRef.current.style.gridTemplateColumns = `${curColWidths.join ("px ")}px`;
				bodyRef.current.style.gridTemplateColumns = `${curColWidths.join ("px ")}px`;
				setTableDims (
					old => ({...old, height: headRef.current!.offsetHeight + bodyRef.current!.offsetHeight})
				);
			}
		},
		[curColWidths]
	);

	useEffect (
		() =>
		{
			if (activeIndex !== null)
			{
				window.addEventListener ("mousemove", onMouseDrag);
				window.addEventListener ("mouseup", onMouseUp);
			}

			() =>
			{
				window.removeEventListener ("mousemove", onMouseDrag);
				window.removeEventListener ("mouseup", onMouseUp);
			}
		},
		[activeIndex]
	);

	return (
		<>
			<div style = {{display: "flex", gap: spacing.xsmall, alignItems: "center"}}>
				Sort
				<ComboBox
					name = "sort"
					label = "Choose a column"
					from = {structure.sortingColumns?.map ((col, i) => ({id: i, text: col})) ?? []}
					values = {sortingColumnIndex ? [sortingColumnIndex] : []}
					onChange = {(options) => sortTable (options)}
					compact
					notSearchable
				/>
			</div>
			<Wrapper $maxHeight = {availableSpace} $theme = {theme} $isDark = {isDark}>
				<StyledTable width = "100%">
					<Header ref = {headRef} $theme = {theme}>
						<Row
							key = {`header-row`}
							$alternate = {false}
							$isDark = {isDark}
							$theme = {theme}
						>
						{
							Object.entries (structure.columns)
								.map (
									(col, i) => <HeaderCell key = {`header-${col[0]}`}>
													<CellContents
														$containsNumber = {Object.values(col[1].fields).filter(f => f.type === "number").length > 0}
													>
														{col[1].displayName ?? (col[0][0].toUpperCase() + col[0].slice (1))}
													</CellContents>
													{
														i < NB_COLS - 1 && <Resizer
																				$height = {tableDims.height}
																				$active = {i === activeIndex}
																				$isDark = {isDark}
																				$theme = {theme}
																				onMouseDown = {() => onMouseDown (i)}
																			/>
													}
												</HeaderCell>
								)
						}
						</Row>
					</Header>
					<Body ref = {bodyRef}>
					{
						shownData.map (
							row => <Row
										key = {row.id}
										$alternate = {alternateRowColour}
										$isDark = {isDark}
										$theme = {theme}
										onClick = {() => {if (onRowClick) onRowClick (row);}}
									>
									{
										Object.entries (structure.columns)
											.map (
												colDef => <Cell key = {`row-${row.id}-${colDef[0]}`}>
															{
																Object.keys (colDef[1].fields)
																		.map (
																			f => <CellContents
																					key = {`row-${row.id}-${colDef[0]}-${f}`}
																					$containsNumber = {Object.values(colDef[1].fields).filter(f => f.type === "number").length > 0}
																				>
																					{row[f]}
																				</CellContents>
																		)
															}
															</Cell>
											)
									}
									</Row>
						)
					}
					</Body>
				</StyledTable>
				<>
				{
					allowPagination &&
					<PaginationBar
						nbRows = {data.length}
						allowedPageSizes = {allowedPageSizes}
						onPageRequest = {(pageIndex) => setShownData (fullSortedData.slice (pageIndex * rowsPerPage, rowsPerPage * (pageIndex + 1)))}
						onPageSizeChange = {(rowsPerPage) => {console.log (rowsPerPage), setRowsPerPage (rowsPerPage)}}
					/>
				}
				</>
			</Wrapper>
		</>
	);
}