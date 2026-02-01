import { OnPageChangeFunction } from "../../../../types";

export default interface PaginationButtonProps
{
	page: number;
	currentActivePage: number;
	onPageChange?: OnPageChangeFunction;
	forceMode?: "light" | "dark";
}