import { keyframes } from "@emotion/react";
import Animated from "./animated";
import SlideAnimationProps from "../../types/components/Animation/SlideAnimationProps";
import { useMemo } from "react";

const slideIn = (direction: "top" | "bottom" | "left" | "right") => keyframes
`
	from
	{
		transform: translate${["left", "right"].includes (direction) ? "X" : "Y"}(${["left", "top"].includes (direction) ? "-" : ""}100%);
		opacity: 0;
	}
	to
	{
		transform: translateX(0);
		opacity: 1;
	}
`;

const slideOut = (direction: "top" | "bottom" | "left" | "right") => keyframes
`
	from
	{
		transform: translateX(0);
		opacity: 1;
	}
	to
	{
		transform: translate${["left", "right"].includes (direction) ? "X" : "Y"}(${["left", "top"].includes (direction) ? "-" : ""}100%);
		opacity: 0;
	}
`;

export default function SlideAnimation ({from = "left", ...props}: SlideAnimationProps)
{
	const slideInKeyframes = useMemo (
		() => slideIn (from),
		[from]
	);
	
	const slideOutKeyframes = useMemo (
		() => slideOut (from),
		[from]
	);

	return (
		<Animated
			{...props}
			animation = {slideInKeyframes}
			exitAnimation = {slideOutKeyframes}
		/>
	);
}