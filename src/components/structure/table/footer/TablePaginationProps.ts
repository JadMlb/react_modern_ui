import { Style } from "../../../../styles";
import { OnPageChangeFunction, OnPageSizeChangeFunction } from "../../../../types";

export default interface TablePaginationProps
{
	pageSizesOptions?: number[];
	page?: number;
	rowsPerPage?: number;
	dataSize: number;
	style?: Style;
	onPageChange?: OnPageChangeFunction;
	onPageSizeChange?: OnPageSizeChangeFunction;
}