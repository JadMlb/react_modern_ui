import { Style } from "../../styles";

export default interface GenericAnimationProps
{
	/**
	 * Controls whether the component is mounted and should play the entering animation. The component unmounts when this value is `false` and plays an exit animation before unmounting.
	 */
	visible?: boolean;
	children?: React.ReactNode;
	/**
	 * The duration of the animation according to css duration values
	 * @default "1s"
	 */
	duration?: string;
	/**
	 * The style applied to the component
	 */
	style?: Style;
	/**
	 * Renders the component as this html element
	 * @default "div"
	 */
	as?: keyof HTMLElementTagNameMap;
}