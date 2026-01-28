import PaginationBarProps from "./PaginationBarProps";
import FullPaginationButtons from "./full_pagination_buttons";
import PaginationButtonsBase from "./pagination_buttons_base";
import WindowedPaginationButtons from "./window_pagination_buttons";

export default function PaginationButtons ({chevronColour, ...props}: PaginationBarProps)
{
	return (
		<PaginationButtonsBase
			currentActivePage = {props.activePage ?? 0}
			totalNbPages = {props.pages}
			onPageChange = {props.onPageChange}
			chevronColour = {chevronColour}
		>{
			props.pages <= 4 ?
				<FullPaginationButtons {...props}/> :
				<WindowedPaginationButtons {...props}/>
		}</PaginationButtonsBase>
	);
}