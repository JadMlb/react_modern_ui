import GenericAnimationProps from "./AnimationProps";

export default interface BounceAnimationProps extends GenericAnimationProps
{
	/**
	 * Defines the bounce direction
	 * @default "up"
	 */
	direction?: "up" | "down";
	/**
	 * Defines the bounce height in pixels
	 * @default 10
	 */
	height?: number;
	/**
	 * Plays the animation infinitly
	 */
	infinite?: boolean;
}