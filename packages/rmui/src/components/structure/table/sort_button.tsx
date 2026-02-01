import { Button } from "../../input";
import Chevron from "../../chevron";
import { Style } from "../../../types";

interface TableSortButtonProps
{
	order?: "a" | "d";
	active?: boolean;
	onSort?: () => void;
	chevronColour?: string;
}

const DEFAULT_SORT_BUTTON_STYLE = {
	backgroundColor: "unset"
} satisfies Style;

export default function TableSortButton ({order, active = false, onSort, chevronColour = "primary"}: TableSortButtonProps)
{
	return (
		<Button
			type = "filled"
			style = {DEFAULT_SORT_BUTTON_STYLE}
			onClick = {onSort}
		>{
			order &&
			<Chevron
				orientation = {order === "a" ? "up" : "down"}
				colour = {chevronColour}
				inactive = {!active}
			/>
		}</Button>
	);
}