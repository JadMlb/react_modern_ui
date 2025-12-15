import DialogProps from "./DialogProps";

export default interface DrawerProps extends DialogProps
{
	position?: "right" | "left" | "bottom";
	withHeader?: boolean;
}

export type OverridableDrawerProps = Pick<DrawerProps, "position" | "withHeader">;