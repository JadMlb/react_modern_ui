import DrawerProps, { OverridableDrawerProps } from "./DrawerProps";

export default interface DrawerWithDefaultHeaderProps extends DrawerProps
{
	title?: React.ReactNode;
	noCloseButton?: boolean;
}

export type OverridableDrawerWithDefaultHeaderProps = OverridableDrawerProps & Pick<DrawerWithDefaultHeaderProps, "noCloseButton">;