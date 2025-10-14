import { Button } from "../../../input";
import PaginationButtonProps from "./PaginationButtonProps";

export default function PaginationButton ({page, currentActivePage, onPageChange}: PaginationButtonProps)
{
	function handlePageChange (newPage: number)
	{
		onPageChange?. (currentActivePage, newPage - 1);
	}

	return (
		<Button
			type = {currentActivePage === page - 1 ? "filled" : "outlined"}
			onClick = {() => handlePageChange (page)}
		>
			{page}
		</Button>
	);
}