import type { HTMLAttributes } from "react";
import type { Element } from "hast";

export default interface RawCodeRendererProps extends HTMLAttributes<HTMLElement>
{
	node?: Element;
}