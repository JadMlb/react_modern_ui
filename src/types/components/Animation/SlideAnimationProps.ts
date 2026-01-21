import GenericAnimationProps from "./AnimationProps";

export default interface SlideAnimationProps extends GenericAnimationProps
{
	from?: "left" | "right" | "top" | "bottom";
}