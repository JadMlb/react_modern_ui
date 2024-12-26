import { Border } from "../border/Border";
import { BasicStyle } from "../generic/BasicStyle";

export interface BoxStyle extends BasicStyle
{
	borderRadius?: string;
	border?: Border | null;
	backgroundColor?: string | null;
}