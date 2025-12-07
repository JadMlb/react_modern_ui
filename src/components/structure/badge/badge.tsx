import { useEffect, useMemo, useState } from "react";
import BadgeProps from "../../../types/components/Badge/BadgeProps";
import { Style, useThemeParser } from "../../../styles";
import { EdgePosition } from "../../../types";

const DEFAULT_POSITION: EdgePosition = {vertical: "top", horizontal: "right"};

const DEFAULT_STYLE = {
	position: "absolute",
	transform: "translate(50%, -50%)",
	borderRadius: "radius.large",
	padding: "spacing.xsmall",
	backgroundColor: "error",
	color: "white",
	fontSize: "0.8em",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	textAlign: "center"
} satisfies Style;

export default function BadgeBadge ({value, className, id, position = DEFAULT_POSITION, style, force, max}: Omit<BadgeProps, "children">)
{
	const [display, setDisplay] = useState ("");
	const realPosition: EdgePosition = useMemo (
		() => ({
			...DEFAULT_POSITION,
			...position
		}),
		[position]
	);

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
	
	const parseCss = useThemeParser();
	const css = useMemo (
		() => parseCss ({
			...DEFAULT_STYLE,
			[realPosition.horizontal]: 0,
			[realPosition.vertical]: 0,
			height: display === "" ? undefined : 10,
			minWidth: display === "" ? undefined : 10,
			...style
		}),
		[parseCss, style, realPosition, display]
	);

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