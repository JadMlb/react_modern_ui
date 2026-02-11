import ButtonDemo from "./button-demo";
import ButtonDisabledDemo from "./button-disabled-demo";
import ButtonRoleTypeDemo from "./button-role-type";
import CheckboxTristateDemo from "./checkbox-tristate-demo";

const DEMOS = {
	"button-demo": ButtonDemo,
	"button-role-type-demo": ButtonRoleTypeDemo,
	"button-disabled-demo": ButtonDisabledDemo,
	"checkbox-tristate-demo": CheckboxTristateDemo,
};

export default DEMOS;

export type AvailableDemos = keyof typeof DEMOS;