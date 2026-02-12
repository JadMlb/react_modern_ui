import ButtonDemo from "./button-demo";
import ButtonDisabledDemo from "./button-disabled-demo";
import ButtonRoleTypeDemo from "./button-role-type";
import CheckboxTristateDemo from "./checkbox-tristate-demo";
import ComboboxArrowDemo from "./combobox-arrow-demo";
import ComboboxDefaultArrowColourDemo from "./combobox-default-arrow-colour-demo";
import ComboboxMenuDemo from "./combobox-menu-demo";
import ComboboxOptionsArrayDemo from "./combobox-options-array-demo";
import ComboboxOptionsCategoriesDemo from "./combobox-options-categories-demo";
import ComboboxRenderOptionDemo from "./combobox-render-option-demo";
import ComboboxValuesDemo from "./combobox-values-demo";
import InputDatetimeDemo from "./input-date-demo";
import InputHintErrorDemo from "./input-hint-error-demo";
import InputNumberDemo from "./input-number-demo";
import InputTextMultiDemo from "./input-text-multi-demo";
import InputTextSingleDemo from "./input-text-single-demo";

const DEMOS = {
	"button-demo": ButtonDemo,
	"button-role-type-demo": ButtonRoleTypeDemo,
	"button-disabled-demo": ButtonDisabledDemo,
	"checkbox-tristate-demo": CheckboxTristateDemo,
	"combobox-options-array-demo": ComboboxOptionsArrayDemo,
	"combobox-options-categories-demo": ComboboxOptionsCategoriesDemo,
	"combobox-values-demo": ComboboxValuesDemo,
	"combobox-default-arrow-colour-demo": ComboboxDefaultArrowColourDemo,
	"combobox-arrow-demo": ComboboxArrowDemo,
	"combobox-render-option-demo": ComboboxRenderOptionDemo,
	"combobox-menu-demo": ComboboxMenuDemo,
	"input-hint-error-demo": InputHintErrorDemo,
	"input-text-single-demo": InputTextSingleDemo,
	"input-text-multi-demo": InputTextMultiDemo,
	"input-number-demo": InputNumberDemo,
	"input-date-demo": InputDatetimeDemo,
};

export default DEMOS;

export type AvailableDemos = keyof typeof DEMOS;