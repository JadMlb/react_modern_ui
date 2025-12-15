import { Style } from "../../styles";
import WrappedElementStylingProps from "../../styles/WrappedElementStylingProps";

export default interface SeparatorProps extends WrappedElementStylingProps
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

export type OverridableSeparatorProps = never;