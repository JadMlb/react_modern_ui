import { keyframes } from "@emotion/react";
import BounceAnimationProps from "../../types/components/Animation/BounceAnimationProps";
import Animated from "./animated";
import { useMemo } from "react";

const bounce = (direction: "up" | "down", height: number) => keyframes
`
	0%
	{
		transform: translateY(0);
	}
	50%
	{
		transform: translateY(${direction === "up" ? "-" : ""}${height}px);
	}
	100%
	{
		transform: translateY(0);
	}
`;

export default function BounceAnimation ({direction = "up", height = 10, ...rest}: BounceAnimationProps)
{
	const bounceKeyframes = useMemo (
		() => bounce (direction, height),
		[direction, height]
	);
	
	const bounceExitKeyframes = useMemo (
		() => bounce (direction, height + 0.5),
		[direction, height]
	);

	return (
		<Animated
			{...rest}
			animation = {bounceKeyframes}
			exitAnimation = {bounceExitKeyframes}
		/>
	);
}