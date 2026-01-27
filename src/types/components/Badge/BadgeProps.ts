import { EdgePosition } from "../../Position";
import WrappedElementStylingProps from "../../styles/WrappedElementStylingProps";
import AriaProps from "../AriaProps";
import { Props } from "../Props";

export interface BadgeConfigProps extends AriaProps
{
	/**
	 * The value to show inside of the badge
	 */
	value?: number | string | null;
	/**
	 * Forces the badge to render no matter the value inside.
	 * The default behaviour does not render the badge component when undefined or null values, empty strings or 0 are passed.
	 */
	force?: boolean;
	/**
	 * The max size of the badge. This value is ignored if the `force` flag is set.
	 * - If `value` is a `number`, it will be capped at `max`.
	 * - If `value` is a `string`, only the first `max` characters would be rendered. An ellipsis is added at the end.
	 */
	max?: number;
	/**
	 * Position of the badge
	 */
	position?: Partial<EdgePosition>;
	/**
	 * The element this badge is linked to
	 */
	children: React.ReactElement;
}

export type BadgeStylingProps = WrappedElementStylingProps<BadgeConfigProps>;
export type BadgeProps = Props<BadgeConfigProps, BadgeStylingProps>; 

export type OverridableBadgeProps = Pick<BadgeConfigProps, "force" | "position">;