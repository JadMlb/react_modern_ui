import { GenericProps } from "../GenericProps";
import { ActionElementStyle } from "../styles/actionElement/ActionElementStyle";

export type TagColour = "success" | "warning" | "error" | "neutral";

export const TAG_LEVEL_MAPPING: TagColour[] = [
	"neutral",
	"warning",
	"error",
	"success"
];

export interface TagProps extends GenericProps
{
	style?: ActionElementStyle;
	colour?: TagColour;
	rounded?: boolean;
	centered?: boolean;
	onClick?: React.MouseEventHandler<HTMLDivElement>;
	children: React.ReactNode;
}