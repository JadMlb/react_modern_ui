import StylingProps from "../../styles/StylingProps";
import BaseProps from "../BaseProps";
import { Props } from "../Props";

export type TagColour = "success" | "warning" | "error" | "neutral";

export const TAG_LEVEL_MAPPING: TagColour[] = [
	"neutral",
	"warning",
	"error",
	"success"
];

export interface TagConfigProps extends BaseProps
{
	colour?: TagColour;
	onClick?: React.MouseEventHandler<HTMLElement>;
	children: React.ReactNode;
}

export type TagStylingProps = StylingProps<TagConfigProps>;
export type TagProps = Props<TagConfigProps, TagStylingProps>;

export type OverridableTagProps = never;