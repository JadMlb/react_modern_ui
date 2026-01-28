/** @jsxImportSource @emotion/react */
import { CSSProperties, useMemo } from "react";
import useColour from "./useColour";
import { useDarkMode } from "../../styles";

const ORIENTATION_ANGLE = {
	"up": 180,
	"down": 0,
	"left": 90,
	"right": 270
};

interface ChevronProps
{
	orientation?: "up" | "down" | "right" | "left";
	colour?: string;
	inactive?: boolean;
	forceMode?: "light" | "dark";
}

// Chevron svg from: https://www.svgrepo.com/svg/513816/chevron-down
export default function Chevron ({orientation = "down", inactive, colour, forceMode}: ChevronProps)
{
	const getColour = useColour();
	const isSystemDark = useDarkMode();
	const isDark = forceMode ? forceMode === "dark" : isSystemDark;

	const style = useMemo (
		() => ({
			transform: `rotate(${ORIENTATION_ANGLE[orientation]}deg)`,
			width: 20
		} satisfies CSSProperties),
		[getColour, orientation]
	);

	const stroke = useMemo (
		() => getColour (inactive ? "gray" : colour ?? (isDark ? "white" : "black")),
		[inactive, colour, isDark]
	);

	return (
		<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style = {style}>
			<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
			<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
			<g id="SVGRepo_iconCarrier">
				<title></title>
				<g id="Complete">
					<g id="F-Chevron">
						<polyline fill="none" id="Down" points="5 8.5 12 15.5 19 8.5" stroke={stroke} stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline>
					</g>
				</g>
			</g>
		</svg>
	);
}