import PaginationBarProps from "./PaginationBarProps";

interface EllipsisProps extends PaginationBarProps
{
	trailing?: boolean;
}

export default function Ellipsis ({pages, activePage = 0, trailing}: EllipsisProps)
{
	if (!trailing && activePage <= 2 || trailing && activePage >= pages - 3)
		return null;
	return "...";
}