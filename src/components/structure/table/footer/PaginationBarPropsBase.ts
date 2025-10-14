import { OnPageChangeFunction } from "../../../../types";

export default interface PaginationBarPropsBase
{
	/**
	 * Pagination starts at 0
	 */
	activePage?: number;
	onPageChange?: OnPageChangeFunction;
}