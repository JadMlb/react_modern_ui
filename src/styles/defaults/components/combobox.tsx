import { ComboboxStylingProps, Overridable, OverridableComboboxProps } from "../../../types";
import Arrow from "./combobox_arrow";

const DEFAULT_ARROW_COMPONENT = {
	open: <Arrow up/>,
	closed: <Arrow/>
};

const DEFAULT_COMBOBOX_PROPS: Overridable<OverridableComboboxProps, ComboboxStylingProps> = {
	props: {
		arrowComponent: DEFAULT_ARROW_COMPONENT
	}
};

export default DEFAULT_COMBOBOX_PROPS;