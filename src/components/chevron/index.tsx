/** @jsxImportSource @emotion/react */
import { Style, useThemeParser } from "../../styles";
import { useMemo } from "react";

interface ChevronArrowProps
{
	orientation?: "up" | "down" | "right" | "left";
	inline?: boolean;
	inactive?: boolean;
}

const ORIENTATION_ANGLE = {
	"up": -135,
	"down": 45,
	"left": 135,
	"right": -45
};

const DEFAULT_ARROW_STYLE = {
	width: 10,
	height: 10,
	transform: "rotate(-45deg) translate(-2.5px, -2.5px)"
} as Style;

function ChevronArrow ({orientation = "right", inactive, inline}: ChevronArrowProps)
{
	const parseCss = useThemeParser();

	const css = useMemo (
		() => parseCss ({
				...DEFAULT_ARROW_STYLE,
				transform: `rotate(${ORIENTATION_ANGLE[orientation]}deg) translate(-2.5px, -2.5px)`,
				borderBottom: `2px solid ${inline ? inactive ? "gray" : "black" : "primary"}`,
				borderRight: `2px solid ${inline ? inactive ? "gray" : "black" : "primary"}`
			}),
		[parseCss, orientation, inline, inactive]
	);

	return <div css = {css}/>;
}

interface ChevronProps
{
	orientation?: "up" | "down" | "right" | "left";
	inline?: boolean;
	inactive?: boolean;
}

export default function Chevron ({orientation = "up", inline, inactive}: ChevronProps)
{
	return (
		<ChevronArrow orientation = {orientation} inactive = {inactive} inline = {inline}/>
	);
}