import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TableRow } from "../../types/TableRow";
import { TableStructure } from "../../types/TableStructure";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { radius, spacing } from "../../styles/styles";
import { useDarkMode, useThemeColours } from "../../styles/theme";
import { PaginationBar } from "./table/pagination_bar";
import DropDownDraggableList from "../input/draggable_list/dropdown";
import capitalize from "../../utils/capitalizer";
import Sorter from "./table/sorter";
import { CheckBox } from "../input";
import { Colour } from "../../types";

const Wrapper = styled.div<{$maxHeight?: number, $isDark: boolean, $colour: (col: Colour) => string}>
`
	overflow: hidden;
	${props => props.$maxHeight && `max-height: ${props.$maxHeight}px;`}
	position: relative;

	border-radius: ${radius.normal};
	border: 1px solid ${props => props.$colour (props.$isDark ? "grayDark" : "grayLight")};

	display: flex;
	flex-direction: column;
`;

const StyledTable = styled.div<{$maxHeight?: number, $allowPagination?: boolean}>
`
	${props => !props.$allowPagination && props.$maxHeight && `max-height: ${props.$maxHeight}px;`}
	${props => !props.$allowPagination && "overflow: auto;"}
`;

const Header = styled.div<{$colour: (col: Colour) => string}>
`
	background-color: ${props => props.$colour ("primary")};
	color: ${props => props.$colour ("white")};
	position: sticky;
	top: 0;

	display: grid;
`;

const Cell = styled.div
`
	padding: ${spacing.small};
`;

const Row = styled.div<{$alternate: boolean, $selected?: boolean, $header?: boolean, $isDark: boolean, $colour: (col: Colour) => string}>
`
	${props => !props.$header &&
		`&:hover > div
		{
			background-color: ${props.$colour (props.$isDark ? "primaryDark" : "primaryElevated")} !important;
		}`
	}

	display: contents;

	${
		props => props.$alternate ?
			`
				&:nth-child(even) div
				{
					background-color: ${props.$colour (props.$isDark ? "grayDark" : "grayLight")};
				}
			`
			:
			`
				&:not(:last-child) div
				{
					border-bottom: 1px solid ${props.$colour (props.$isDark ? "grayDark" : "grayLight")};
				}
			`
	}

	${
		props => props.$selected && `
			> div
			{
				background-color: ${props.$colour (props.$isDark ? "accentDark" : "accentElevated")} !important;
			}
		`
	}
`;

const Body = styled.div<{$nbRows: number}>
`
	display: grid;
	grid-template-rows: repeat(${props => props.$nbRows}, 1fr);

	> div
	{
		cursor: pointer;
	}
`;

const HeaderCell = styled.div
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
	display: flex;
	justify-content: flex-${props => props.$containsNumber ? "end" : "start"};
	gap: ${spacing.small};
`;

const Resizer = styled.div<{$height: number, $active: boolean, $isDark: boolean, $colour: (col: Colour) => string}>
`
	width: 2px;
	height: ${props => props.$height}px;
	background-color: transparent;
	position: absolute;
	top: 0;
	right: 0;
	cursor: col-resize;

	&:hover, &:hover:before
	{
		background-color: ${props => props.$colour (props.$active ? (props.$isDark ? "primaryDark" : "primaryElevated") : (props.$isDark ? "grayDark" : "grayLight"))};
		color: ${props => props.$colour (props.$isDark ? "white" : "black")};
	}

	&:before
	{
		content: "⋮";
		font-weight: 900;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 5px;
		height: 17px;
		position: absolute;
		color: ${props => props.$colour ("white")};
		padding: 1px;
		top: calc((2 * ${spacing.small} + 16pt - 17px) / 2);
		right: -2px;
		border-radius: ${radius.normal};
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
	 * Specifies whether this table's columns are rearrangable or not
	 */
	rearrangable?: boolean,
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
	allowedPageSizes?: number[],
	/**
	 * Specifies whether the rows of the table are selectable or not. Defaults to `true`.
	 */
	selectable?: boolean,
	/**
	 * Defines the components to appear in the table's header when one or more rows are selected.
	 * @returns 
	 */
	onSelectionShow?: () => React.ReactNode,
	/**
	 * The event handler to be executed when a row is clicked
	 * @param row The data contained in the clicked row
	 */
	onRowClick?: (row: TableRow) => void
};

// resizable table inspired from the following article https://www.letsbuildui.dev/articles/resizable-tables-with-react-and-css-grid/
export default function Table ({data, structure, maxHeight, alternateRowColour = false, allowPagination, allowedPageSizes = [5, 10], selectable = true, onSelectionShow, onRowClick}: TableProps)
{
	const isDark = useDarkMode();
	const colour = useThemeColours();

	const [shownData, setShownData] = useState ([...data]);
	const [displayOrder, setDisplayOrder] = useState (Object.keys (structure.columns));

	const [fullSortedData, setFullSortedData] = useState ([...data]);
	const [rowsPerPage, setRowsPerPage] = useState (allowPagination ? 0 : 1e10);
	
	const [activeIndex, setActiveIndex] = useState<number | null> (null);
	const [tableDims, setTableDims] = useState ({width: 0, height: 0});
	const headRef = useRef<HTMLTableSectionElement> (null);
	const bodyRef = useRef<HTMLTableSectionElement> (null);
	const [curColWidths, setCurColWidths] = useState<number[]> ([]);

	const [sortingColumn, setSortingColumn] = useState<{name: string, asc: boolean} | null> (null);

	const [selection, setSelection] = useState<(number | string)[]> ([]);
	
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

	useEffect (
		() => sortTable (sortingColumn?.name, sortingColumn?.asc),
		[sortingColumn]
	);

	function sortTable (column?: string, asc?: boolean)
	{
		let sortedData;
		if (column)
		{
			const sortingField = Object.keys(structure.columns[column].fields)[0];
			const FACTOR = asc ? 1 : -1;
			sortedData = fullSortedData.sort (
					(r1, r2) =>
					{
						if (r1[sortingField] > r2[sortingField])
							return FACTOR;
						else if (r1[sortingField] < r2[sortingField])
							return -FACTOR;
						return 0;
					}
				);
		}
		else
			sortedData = [...data];

		setFullSortedData (sortedData);
		setShownData (sortedData.slice (0, rowsPerPage));
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
				headRef.current.style.gridTemplateColumns = `${selectable && "30px"} ${curColWidths.join ("px ")}px`;
				bodyRef.current.style.gridTemplateColumns = `${selectable && "30px"} ${curColWidths.join ("px ")}px`;
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

	function changeDisplayOrder (items: TableRow[])
	{
		setDisplayOrder (items.map (items => items.name as string));
	}

	function toggleSelection (row: TableRow)
	{
		setSelection (
			old =>
			{
				if (old.includes (row.id))
					return old.filter (r => r !== row.id);
				return [...old, row.id];
			}
		);
	}

	function isSelected (row: TableRow)
	{
		return selection.includes (row.id);
	}

	useEffect (
		() => setShownData ([...data]),
		[data, structure]
	);

	return (
		<>
			<div style = {{display: "flex", gap: spacing.xsmall, alignItems: "center", marginBottom: spacing.small}}>
				<DropDownDraggableList
					label = "Rearrange"
					items = {displayOrder.map ((c, idx) => ({id: idx, name: c}))}
					mapper = {item => <>{structure.columns[item.name].displayName ?? capitalize (item.name as string)}</>}
					onChange = {changeDisplayOrder}
				/>
				{
					onSelectionShow && selection.length > 0 &&
						onSelectionShow()
				}
			</div>
			<Wrapper $maxHeight = {maxHeight} $colour = {colour} $isDark = {isDark}>
				<StyledTable $maxHeight = {maxHeight} $allowPagination = {allowPagination}>
					<Header ref = {headRef} $colour = {colour}>
						<Row
							key = {`header-row`}
							$alternate = {false}
							$isDark = {isDark}
							$colour = {colour}
							$header
						>
						{
							selectable && <HeaderCell/>
						}
						{
							displayOrder
								.map (
									(col, i) => <HeaderCell key = {`header-${col}`}>
													<CellContents
														$containsNumber = {Object.values(structure.columns[col].fields).filter(f => f.type === "number").length > 0}
													>
														{
															structure.sortingColumns?.includes (col) &&
																<Sorter
																	state = {(sortingColumn?.name === col ? sortingColumn.asc ? "asc" : "desc" : null) ?? null}
																	onClick = {state => {setSortingColumn (state ? {name: col, asc: state === "asc"} : null)}}
																/>
														}
														{structure.columns[col].displayName ?? capitalize (col)}
													</CellContents>
													{
														i < NB_COLS - 1 && <Resizer
																				$height = {tableDims.height}
																				$active = {i === activeIndex}
																				$isDark = {isDark}
																				$colour = {colour}
																				onMouseDown = {() => onMouseDown (i)}
																			/>
													}
												</HeaderCell>
								)
						}
						</Row>
					</Header>
					<Body ref = {bodyRef} $nbRows = {allowPagination ? rowsPerPage : 0}>
					{
						shownData.map (
							row => <Row
										key = {row.id}
										$alternate = {alternateRowColour}
										$isDark = {isDark}
										$colour = {colour}
										onClick = {() => {if (onRowClick) onRowClick (row);}}
										$selected = {isSelected (row)}
									>
									{
										selectable &&
											<Cell>
												<CheckBox
													isChecked = {isSelected (row)}
													isFull
													onChange = {() => toggleSelection (row)}
												/>
											</Cell>
									}
									{
										displayOrder
											.map (
												colDef => <Cell key = {`row-${row.id}-${colDef}`}>
															{
																Object.keys (structure.columns[colDef].fields)
																		.map (
																			f => <CellContents
																					key = {`row-${row.id}-${colDef}-${f}`}
																					$containsNumber = {Object.values(structure.columns[colDef].fields).filter(f => f.type === "number").length > 0}
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
						onPageSizeChange = {(rowsPerPage) => setRowsPerPage (rowsPerPage)}
					/>
				}
				</>
			</Wrapper>
		</>
	);
}