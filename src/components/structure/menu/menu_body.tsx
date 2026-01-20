import * as React from "react";
import { MenuProps } from "../../../types/components/Menu/MenuProps";
import { StaticStyle } from "../../../types";

interface MenuBodyProps extends Pick<MenuProps, "open" | "id" | "className" | "style" | "children">
{
	style: StaticStyle;
}

const MenuBody = React.forwardRef<HTMLDivElement, MenuBodyProps> (
	({open, id, className, style, children}, ref) =>
	{
		if (!open || Object.keys(style).length === 0)
			return null;

		return (
			<div
				id = {id}
				className = {className}
				css = {style}
				ref = {ref}
			>
				{children}
			</div>
		);
	}
);

export default MenuBody;