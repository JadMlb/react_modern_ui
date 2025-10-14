import PaginationButtonProps from "./PaginationButtonProps";
import EdgePaginationButton from "./edge_pagination_button";

interface PaginationButtonsBaseProps extends Omit<PaginationButtonProps, "page">
{
	children?: React.ReactNode;
	totalNbPages: number;
}

export default function PaginationButtonsBase ({children, currentActivePage, totalNbPages, onPageChange}: PaginationButtonsBaseProps)
{
	return (
		<>
			<EdgePaginationButton
				currentActivePage = {currentActivePage}
				page = {-1}
				totalNbPages = {totalNbPages}
				onPageChange = {onPageChange}
			/>
			{children}
			<EdgePaginationButton
				currentActivePage = {currentActivePage}
				page = {-2}
				totalNbPages = {totalNbPages}
				onPageChange = {onPageChange}
			/>
		</>
	);
}