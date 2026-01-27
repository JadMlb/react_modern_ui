import * as React from "react";
import { MenuProps } from "../../../types/components/Menu/MenuProps";
import { StaticStyle } from "../../../types";

interface MenuBodyProps extends Omit<MenuProps, "anchorElement" | "style" | "position" | "direction" | "onClose">
{
	style: StaticStyle;
}

const MenuBody = React.forwardRef<HTMLDivElement, MenuBodyProps> (
	({open, id, className, style, children, ...aria}, ref) =>
	{
		if (!open || Object.keys(style).length === 0)
			return null;

		return (
			<div
				id = {id}
				className = {className}
				css = {style}
				ref = {ref}
				{...aria}
			>
				{children}
			</div>
		);
	}
);

export default MenuBody;