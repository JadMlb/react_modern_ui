import { Style } from "../../../styles";
import { GenericProps } from "../GenericProps";

export default interface SeparatorProps extends GenericProps
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