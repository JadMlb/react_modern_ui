import DrawerProps from "../../../types/components/Popups/DrawerProps";
import DrawerWithDefaultHeaderProps from "../../../types/components/Popups/DrawerWithDefaultHeaderProps";
import DrawerWithHeader from "./with_header";
import DrawerNoHeader from "./base";

function isWithHeader (props: DrawerProps | DrawerWithDefaultHeaderProps): props is DrawerWithDefaultHeaderProps
{
	return !!props.withHeader;
}

export default function Drawer (props: DrawerProps | DrawerWithDefaultHeaderProps)
{
	if (isWithHeader (props))
		return <DrawerWithHeader {...props}/>;
	return <DrawerNoHeader {...props}/>;
}