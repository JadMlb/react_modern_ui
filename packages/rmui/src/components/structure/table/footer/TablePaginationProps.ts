import { OnPageChangeFunction, OnPageSizeChangeFunction, StaticStyle } from "../../../../types";

export default interface TablePaginationProps
{
	pageSizesOptions?: number[];
	page?: number;
	rowsPerPage?: number;
	dataSize: number;
	style?: StaticStyle;
	onPageChange?: OnPageChangeFunction;
	onPageSizeChange?: OnPageSizeChangeFunction;
	chevronColour?: string;
	forceMode?: "light" | "dark";
}