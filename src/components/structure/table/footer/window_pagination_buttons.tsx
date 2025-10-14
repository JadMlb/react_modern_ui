import PaginationBarProps from "./PaginationBarProps";
import Ellipsis from "./ellipsis";
import PaginationButton from "./pagination_button";
import Window from "./window";

export default function WindowedPaginationButtons (props: PaginationBarProps)
{
	const activePage = props.activePage ?? 0;

	return (
		<>
			<PaginationButton
				page = {1}
				currentActivePage = {activePage}
				onPageChange = {props.onPageChange}
			/>
			<Ellipsis {...props}/>
			<Window {...props}/>
			<Ellipsis {...props} trailing/>
			<PaginationButton
				page = {props.pages}
				currentActivePage = {activePage}
				onPageChange = {props.onPageChange}
			/>
		</>
	);
}