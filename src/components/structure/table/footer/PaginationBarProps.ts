import PaginationBarPropsBase from "./PaginationBarPropsBase";

export default interface PaginationBarProps extends PaginationBarPropsBase
{
	pages: number;
	chevronColour?: string;
}