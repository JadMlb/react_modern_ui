import DrawerProps from "./DrawerProps";

export default interface DrawerWithDefaultHeaderProps extends DrawerProps
{
	title?: React.ReactNode;
	noCloseButton?: boolean;
}