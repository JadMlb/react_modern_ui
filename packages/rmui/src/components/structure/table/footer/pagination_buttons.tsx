import PaginationBarProps from "./PaginationBarProps";
import FullPaginationButtons from "./full_pagination_buttons";
import PaginationButtonsBase from "./pagination_buttons_base";
import WindowedPaginationButtons from "./window_pagination_buttons";

export default function PaginationButtons ({chevronColour, forceMode, ...props}: PaginationBarProps)
{
	return (
		<PaginationButtonsBase
			currentActivePage = {props.activePage ?? 0}
			totalNbPages = {props.pages}
			onPageChange = {props.onPageChange}
			chevronColour = {chevronColour}
			forceMode = {forceMode}
		>{
			props.pages <= 4 ?
				<FullPaginationButtons forceMode = {forceMode} {...props}/> :
				<WindowedPaginationButtons forceMode = {forceMode} {...props}/>
		}</PaginationButtonsBase>
	);
}