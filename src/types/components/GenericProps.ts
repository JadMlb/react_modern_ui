import { BasicStyle } from "./styles/generic/BasicStyle";

export interface GenericProps
{
	key?: string | number | bigint | null;
	style?: BasicStyle;
	className?: string;
}