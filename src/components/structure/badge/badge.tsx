import { useEffect, useState } from "react";
import { BadgeProps } from "../../../types/components/Badge/BadgeProps";
import { StaticStyle } from "../../../types";

export default function BadgeBadge (props: Omit<BadgeProps, "children" | "parentStyle" | "style" | "position"> & {css: StaticStyle})
{
	const {
		force,
		max,
		css,
		value,
		...rest
	} = props;

	const [display, setDisplay] = useState ("");

	useEffect (
		() =>
		{
			if (force || !value)
			{
				setDisplay ("");
				return;
			}
			
			if (max && typeof value === "number" && value > max)
				setDisplay (`${max}+`);
			else if (max && typeof value === "string" && value.length > max)
				setDisplay (`${value.slice (0, max)}...`);
			else
				setDisplay (value.toString());
		},
		[value, force, max]
	);

	if (!force && !value)
		return null;

	return (
		<div
			css = {css}
			{...rest}
		>
			{display}
		</div>
	);
}