import { keyframes } from "@emotion/react";
import ZoomAnimationProps from "../../types/components/Animation/ZoomAnimationProps";
import Animated from "./animated";
import { useMemo } from "react";

const zoomIn = (amount: number) => keyframes
`
	from
	{
		transform: scale(${amount});
		opacity: 0;
	}
	to
	{
		transform: scale(1);
		opacity: 1;
	}
`;

const zoomOut = (amount: number) => keyframes
`
	from
	{
		transform: scale(1);
		opacity: 1;
	}
	to
	{
		transform: scale(${amount});
		opacity: 0;
	}
`;

export default function ZoomAnimation ({amount = 0.5, ...rest}: ZoomAnimationProps)
{
	const zoomInKeyframes = useMemo (
		() => zoomIn (amount),
		[amount]
	);
	
	const zoomOutKeyframes = useMemo (
		() => zoomOut (amount),
		[amount]
	);

	if (amount < 0 || amount > 1)
		throw new Error ("ZoomAnimation requires an amount value between 0 and 1");

	return (
		<Animated
			{...rest}
			animation = {zoomInKeyframes}
			exitAnimation = {zoomOutKeyframes}
		/>
	);
}