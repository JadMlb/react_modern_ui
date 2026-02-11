import ButtonDemo from "./button-demo";
import ButtonDisabledDemo from "./button-disabled-demo";
import ButtonRoleTypeDemo from "./button-role-type";

const DEMOS = {
	"button-demo": ButtonDemo,
	"button-role-type-demo": ButtonRoleTypeDemo,
	"button-disabled-demo": ButtonDisabledDemo,
};

export default DEMOS;

export type AvailableDemos = keyof typeof DEMOS;