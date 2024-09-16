import React, { useMemo, useState } from "react";
import { styled } from "styled-components";
import { ComboBox } from "../../input";
import { colour, spacing, useDarkMode, useTheme } from "../../../styles";
import { Option } from "../../../types";
import { PaginationBarButtons } from "./pagination_bar_buttons";
import ThemeType from "../../../types/theme";

const PaginationBarDiv = styled.div<{$isDark: boolean, $theme: ThemeType}>
`
	position: sticky;
	bottom: 0;
	width: calc(100% - 2 * ${spacing.xsmall});

	background-color: ${props => colour (props.$isDark ? "black" : "white", props.$theme)};
	border-top: 1px solid ${props => colour (props.$isDark ? "grayDark" : "grayLight", props.$theme)};;

	padding: ${spacing.xsmall};

	display: flex;
	gap: ${spacing.xsmall};
	justify-content: space-between;
	align-items: center;
`;

const PaginationTravelerContainer = styled.div
`
	display: flex;
	gap: ${spacing.xsmall};
	justify-content: space-between;
	align-items: center;
`;

type PaginationBarProps = {
	allowedPageSizes: number[],
	nbRows: number,
	onPageRequest: (pageIndex: number) => void,
	onPageSizeChange?: (rowsPerPage: number) => void
};

export function PaginationBar ({allowedPageSizes, nbRows, onPageRequest, onPageSizeChange}: PaginationBarProps)
{
	const isDark = useDarkMode();
	const {theme} = useTheme();
	
	const pageSizeOptions: Option[] = useMemo (
		() => allowedPageSizes.map (opt => ({id: opt, text: `${opt}`})),
		[allowedPageSizes]
	);

	const [currentPageIndex, setCurrentPageIndex] = useState (0);

	const [rowsPerPage, setRowsPerPage] = useState (0);
	
	const nbPages = useMemo (
		() =>
		{
			const pageSize = rowsPerPage;
			return Math.ceil (nbRows / pageSize);
		},
		[nbRows, rowsPerPage]
	);

	function updatePageSize (options: Option[])
	{
		setRowsPerPage (options[0].id);
		if (onPageSizeChange)
			onPageSizeChange (options[0].id);
	}

	function intermediaryOnPageRequest (pageIndex: number)
	{
		setCurrentPageIndex (pageIndex);
		onPageRequest (pageIndex);
	}

	return (
		<PaginationBarDiv $isDark = {isDark} $theme = {theme}>
			<span style = {{display: "flex", alignItems: "center", gap: spacing.xsmall}}>
				Rows per page
				<ComboBox
					name = "show"
					from = {pageSizeOptions}
					values = {[rowsPerPage]}
					onChange = {updatePageSize}
					compact
					notSearchable
					required
					defaultFirst
					position = "top"
				/>
			</span>
			{currentPageIndex * rowsPerPage + 1}-{Math.min ((currentPageIndex + 1) * rowsPerPage, nbRows)} of {nbRows}
			<PaginationTravelerContainer>
				{
					nbPages > 1 &&
						<PaginationBarButtons nbPages = {nbPages} currentPageIndex = {currentPageIndex} onPageRequest = {intermediaryOnPageRequest}/>
				}
			</PaginationTravelerContainer>
		</PaginationBarDiv>
	);
}