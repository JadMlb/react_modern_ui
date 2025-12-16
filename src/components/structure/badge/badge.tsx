import { useEffect, useMemo, useState } from "react";
import BadgeProps from "../../../types/components/Badge/BadgeProps";
import useStyle from "../../../hooks/useStyle";
import useProps from "../../../hooks/useProps";

export default function BadgeBadge (props: Omit<BadgeProps, "children">)
{
	const {
		force,
		id,
		className,
		max,
		position,
		style,
		value
	} = useProps ("badge", props);

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
	
	const internalStyles = useMemo (
		() => ({
			[position!.horizontal!]: 0,
			[position!.vertical!]: 0,
			transform: `translate(${position!.horizontal === "left" ? "-" : ""}50%, ${position!.vertical === "top" ? "-" : ""}50%)`,
			height: display === "" ? undefined : 10,
			minWidth: display === "" ? undefined : 10,
		}),
		[position, display]
	);
	const css = useStyle ("badge", style, internalStyles);

	if (!force && !value)
		return null;

	return (
		<div
			css = {css}
			className = {className}
			id = {id}
		>
			{display}
		</div>
	);
}