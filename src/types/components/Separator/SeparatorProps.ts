import { Style } from "../../styles";
import WrappedElementStylingProps from "../../styles/WrappedElementStylingProps";
import { Props } from "../Props";

export default interface SeparatorConfigProps
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