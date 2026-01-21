import { keyframes } from "@emotion/react";
import GenericAnimationProps from "../../types/components/Animation/AnimationProps";
import Animated from "./animated";

const fadeIn = keyframes
`
	from
	{
		opacity: 0;
	}
	to
	{
		opacity: 1;
	}
`;

const fadeOut = keyframes
`
	from
	{
		opacity: 1;
	}
	to
	{
		opacity: 0;
	}
`;

export default function FadeAnimation (props: GenericAnimationProps)
{
	return (
		<Animated
			{...props}
			animation = {fadeIn}
			exitAnimation = {fadeOut}
		/>
	);
}