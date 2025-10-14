import { Button } from "../../input";
import Chevron from "../../chevron";
import { Style } from "../../../styles";

interface TableSortButtonProps
{
	order?: "a" | "d";
	active?: boolean;
	onSort?: () => void;
}

const DEFAULT_SORT_BUTTON_STYLE = {
	backgroundColor: "unset"
} satisfies Style;

export default function TableSortButton ({order, active = false, onSort}: TableSortButtonProps)
{
	return (
		<Button
			type = "filled"
			style = {DEFAULT_SORT_BUTTON_STYLE}
			onClick = {onSort}
		>{
			order && <Chevron orientation = {order === "a" ? "up" : "down"} inline inactive = {!active}/>
		}</Button>
	);
}