import { Style } from "../../styles";
import WrappedElementStylingProps from "../../styles/WrappedElementStylingProps";
import AriaProps from "../AriaProps";
import { Props } from "../Props";

export default interface SeparatorConfigProps extends AriaProps
{
	/**
	 * The title of the following section
	 */
	title?: React.ReactNode;
	/**
	 * Sets the style of the parent wrapping the title and the separator
	 */
	parentStyle?: Style;
}

export type SeparatorStylingProps = WrappedElementStylingProps<SeparatorConfigProps>;
export type SeparatorProps = Props<SeparatorConfigProps, SeparatorStylingProps>;

export type OverridableSeparatorProps = never;