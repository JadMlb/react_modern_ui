import GenericAnimationProps from "./AnimationProps";

export default interface ZoomAnimationProps extends GenericAnimationProps
{
	/**
	 * Defines the zoom ratio, a number between 0 and 1
	 * @default 0.5
	 */
	amount?: number;
}