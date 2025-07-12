import { GenericProps } from "../GenericProps";

export type TagColour = "success" | "warning" | "error" | "neutral";

export const TAG_LEVEL_MAPPING: TagColour[] = [
	"neutral",
	"warning",
	"error",
	"success"
];

export interface TagProps extends GenericProps
{
	colour?: TagColour;
	onClick?: React.MouseEventHandler<HTMLDivElement>;
	children: React.ReactNode;
}